// src/modules/user/user.service.js
import sequelizePkg from 'sequelize';
const { Op } = sequelizePkg;

export const register = async (data, UserModel) => {
    const { username, email, password, confirmPassword, fullName, perfil } = data;

    // Validação 1: Senhas não coincidem 
    if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem.');
    }

    // Validação 2: Senha vazia ou só espaços
    if (!data.password || data.password.trim().length === 0) {
        throw new Error('A senha não pode ser composta apenas de espaços');
    }

    // Validação 3: Tamanho mínimo de senha 
    if (password.length < 8) {
        throw new Error('A senha deve ter no mínimo 8 caracteres.');
    }

    // Validação 4: Perfil (com fallback para 'visitante')
    const perfisValidos = ['visitante', 'artista', 'admin'];
    const perfilNormalizado = (perfil || 'visitante').toLowerCase().trim();

    if (!perfisValidos.includes(perfilNormalizado)) {
        throw new Error('Perfil inválido. Use: visitante, artista ou admin');
    }
    
    // Validação 5: Formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Formato de e-mail inválido.');
    }

    // Validação 6: E-mail ou usuário já existente   
    const existingUser = await UserModel.findOne({
        where: {
            $or: [
                { email: data.email },
                { username: data.username }
            ]
        }
    });
    if (existingUser) {
        throw new Error('Este e-mail ou usuário já está cadastrado.');
    }

    return { message: 'Usuário criado com sucesso (ainda sem salvar no banco)' };
};

export const solicitarRecuperacaoSenha = async (email, userModel) => {
    const user = await userModel.findOne({ where: { email } });
    
    return { message: 'Se o e-mail existir, você receberá um link.' };
};

export const redefinirSenha = async (token, novaSenha, userModel) => {
    const user = await userModel.findOne({ where: { resetToken: token } });

    if (!user || new Date() > new Date(user.resetTokenExpires)) {
        throw new Error('Token expirado. Solicite um novo link.');
    }

}