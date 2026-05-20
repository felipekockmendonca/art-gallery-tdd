// src/modules/user/user.service.js
export const register = async (data, UserModel) => {
    const { username, email, password, confirmPassword, fullName } = data;
    // Validação 1: Senhas não coincidem 
    if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem.');
    }

    // Validação mínima de tamanho de senha 
    if (password.length < 8) {
        throw new Error('A senha deve ter no mínimo 8 caracteres.');
    }

    // Aqui será feito as validações dos testes de e-mails
    
    // Validação de e-mail ou usuário já existente
    const existingUser = await UserModel.findOne({
        where: { [require('sequelize').Op.or]: [{ username }, { email }]}
    });
    if (existingUser) {
        throw new Error('Este e-mail ou usuário já está cadastrado.');
    }
    
    // TODO: mais validações virão depois
    return { message: 'Usuário criado com sucesso (ainda sem salvar no banco)' };
};