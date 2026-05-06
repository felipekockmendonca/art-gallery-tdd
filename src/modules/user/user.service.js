// src/modules/user/user.service.js
export const register = async (data, UserModel) => {
    const { username, email, password, confirmPassword, fullName } = data;
    // Validação 1: senhas coincidem
    if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem.');
    }

    // Validação mínima de tamanho de senha (RN-001)
    if (password.length < 8) {
        throw new Error('A senha deve ter no mínimo 8 caracteres.');
    }
    
    // TODO: mais validações virão depois
    return { message: 'Usuário criado com sucesso (ainda sem salvar no banco)' };
};