import { describe, it, expect, beforeEach } from 'vitest';
import * as userService from '../user.service.js';
describe('User Service - Cadastro', () => {

    let mockUserModel;
    beforeEach(() => {
        // Mock do modelo Sequelize (vamos usar depois)
        mockUserModel = {
            findOne: vi.fn(),
            create: vi.fn()
        };
    });

    // Teste 1: Senhas Diferentes
    it('Red - Deve retornar erro se as senhas não coincidirem', async () => {
        const data = {
            username: 'felipe',
            email: 'felipe@test.com',
            password: '12345678',
            confirmPassword: '87654321', // ← diferentes
            fullName: 'Felipe Teste'
        };
        // Esperamos que lance um erro específico
        await expect(userService.register(data, mockUserModel))
            .rejects
            .toThrow('As senhas não coincidem.');
    });

    // Teste 2: Senha muito curta
    it('Red - Deve retornar erro se a senha tiver menos de 8 caracteres', async () => {
        const data = {
            username: 'felipe',
            email: 'felipe@test.com',
            password: '123',
            confirmPassword: '123'
        };
        await expect(userService.register(data, mockUserModel))
            .rejects
            .toThrow('A senha deve ter no mínimo 8 caracteres.');
    });

    // Aqui abaixo será feito os testes unitários para validação do e-mail!

    // Teste 3: E-mail ou usuário já existem (RN-01)
    it('Red - Deve retornar erro se o username ou e-mail já estiverem cadastrados', async () => {
        const data =  {
            username: 'felipe',
            email: 'felipe@test.com',
            password: '12345678',
            confirmPassword: '12345678'
        };
        mockUserModel.findOne.mockResolvedValueOnce({ id: 1 });
        await expect(userService.register(data, mockUserModel))
            .rejects
            .toThrow('Este e-mail ou usuário já está cadastrado.');
    });

    // Teste 4: E-mail inexitente (RN-01)

    it('Green - Deve retornar que o e-mail ou username não existem', async() => {
        const data = {
            username: 'rogerio',
            email: 'rogerio@test.com',
            password: '12345678',
            confirmPassword: '12345678'
        };
        await expect(userService.register(data, mockUserModel))
            .resolves
            .toThrow('Este e-mail é válido para criar uma conta.');
    });
});