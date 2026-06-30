import { describe, it, expect, beforeEach, vi } from 'vitest';
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

    // Teste 3: Formato de e-mail inválido
    it('Red - Deve retornar erro se o formato do e-mail for inválido', async () => {
        const data = {
            username: 'felipe',
            email: 'email-invalido', // Sem @ e domínio
            password: '12345678',
            confirmPassword: '12345678'
        };
        await expect(userService.register(data, mockUserModel))
            .rejects
            .toThrow('Formato de e-mail inválido.');
    });

    // Teste 4: E-mail ou usuário já existem (RN-01)
    it('Red - Deve retornar erro se o username ou e-mail já estiverem cadastrados', async () => {
        const data = {
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

    // Teste 5: Sucesso (Green)
    it('Green - Deve criar o usuário com sucesso quando os dados são válidos e não existem no banco', async () => {
        const data = {
            username: 'rogerio',
            email: 'rogerio@test.com',
            password: '12345678',
            confirmPassword: '12345678'
        };
        mockUserModel.findOne.mockResolvedValueOnce(null);
        await expect(userService.register(data, mockUserModel))
            .resolves
            .toEqual({ message: 'Usuário criado com sucesso (ainda sem salvar no banco)' });
    });

    it('Red - Deve rejeitar cadastro com e-mail duplicado em maiúsculas (case-insensitive)', async () => {
        const data = {
            username: 'felipe2',
            email: 'FELIPE@TEST.COM',
            password: '12345678',
            confirmPassword: '12345678'
        };
        mockUserModel.findOne.mockResolvedValueOnce({ id: 1 });
        await expect(userService.register(data, mockUserModel))
            .rejects
            .toThrow('Este e-mail ou usuário já está cadastrado');
    });

    it('Red - Deve rejeitar senha composta apenas de espaços em branco', async () => {
        const data = {
            username: 'felipe',
            email: 'felipe@test.com',
            password: '        ',
            confirmPassword: '        ',
        };
        await expect(userService.register(data, mockUserModel))
            .rejects
            .toThrow('A senha não pode ser composta apenas de espaços');
    });

    it('Red - Deve rejeitar cadastrado com perfil inválido fora do enum permitido', async () => {
        const data = {
            username: 'felipe',
            email: 'felipe@test.com',
            password: '12345678',
            confirmPassword: '12345678',
            perfil: 'dasda'
        };

        await expect(userService.register(data, mockUserModel))
            .rejects
            .toThrow('Perfil inválido. Use: visitante, artista ou admin');
    });

    it('Green - Deve retornar sucesso mesmo quando o e-mail não está cadastrado', async () => {
        mockUserModel.findOne.mockResolvedValueOnce(null);

        await expect(
            userService.solicitarRecuperacaoSenha(
                'inexistent@test.com',
                mockUserModel
            )
        )
            .resolves
            .toEqual({ message: 'Se o e-mail existir, você receberá um link.' });
    });

    it('Red - Deve rejeitar redefinição de senha com token expirado', async () => {
        const tokenExpirado = 'token-expirado-simulado';
        const novaSenha = 'novaSenha123';

        // Simula token não encontrado no banco = expirado/inválido
        mockUserModel.findOne.mockResolvedValueOnce(null);

        await expect(
            userService.redefinirSenha(tokenExpirado, novaSenha, mockUserModel)
        ).rejects.toThrow('Token expirado. Solicite um novo link.');
    });
});