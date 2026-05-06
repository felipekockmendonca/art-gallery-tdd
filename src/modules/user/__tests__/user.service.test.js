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
    it('Red - deve retornar erro se as senhas não coincidirem', async () => {
        const data = {
            username: 'paulo',
            email: 'paulo@test.com',
            password: '12345678',
            confirmPassword: '87654321', // ← diferentes
            fullName: 'Paulo Teste'
        };
        // Esperamos que lance um erro específico
        await expect(userService.register(data, mockUserModel))
            .rejects
            .toThrow('As senhas não coincidem.');
    });
});

// Teste 2: senha muito curta
it('Red - deve retornar erro se a senha tiver menos de 8 caracteres', async () => {
    const data = {
        username: 'paulo',
        email: 'paulo@test.com',
        password: '123',
        confirmPassword: '123'
    };
    await expect(userService.register(data, mockUserModel))
        .rejects
        .toThrow('A senha deve ter no mínimo 8 caracteres.');
});
