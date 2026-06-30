import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../../app.js';
import Obra from '../artwork.Model.js';

// Mock do modelo para evitar conexão real com banco de dados nos testes de integração
vi.mock('../artwork.Model.js', () => {
    return {
        default: {
            create: vi.fn(),
            findAll: vi.fn(),
            findByPk: vi.fn(),
            update: vi.fn(),
            destroy: vi.fn()
        }
    };
});

describe('Artwork Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Teste 1: POST /artworks - Sucesso
    it('POST /artworks - Deve retornar 201 e criar obra', async () => {
        const payload = { titulo: 'Mona Lisa', usuario_id: '123' };
        Obra.create.mockResolvedValue({ id: '1', ...payload });

        const res = await request(app).post('/artworks').send(payload);
        expect(res.status).toBe(201);
        expect(res.body.titulo).toBe('Mona Lisa');
    });

    // Teste 2: POST /artworks - Erro validação
    it('POST /artworks - Deve retornar 400 se faltar título', async () => {
        const res = await request(app).post('/artworks').send({ usuario_id: '123' });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O título é obrigatório.');
    });

    // Teste 3: GET /artworks - Sucesso
    it('GET /artworks - Deve retornar 200 e lista de obras', async () => {
        Obra.findAll.mockResolvedValue([{ id: '1', titulo: 'Obra 1' }]);
        const res = await request(app).get('/artworks');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Teste 4: GET /artworks/:id - Sucesso
    it('GET /artworks/:id - Deve retornar 200 e a obra', async () => {
        Obra.findByPk.mockResolvedValue({ id: '1', titulo: 'Obra 1' });
        const res = await request(app).get('/artworks/1');
        expect(res.status).toBe(200);
        expect(res.body.titulo).toBe('Obra 1');
    });

    // Teste 5: GET /artworks/:id - 404
    it('GET /artworks/:id - Deve retornar 404 se não existir', async () => {
        Obra.findByPk.mockResolvedValue(null);
        const res = await request(app).get('/artworks/999');
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Obra não encontrada.');
    });

    // Teste 6: PUT /artworks/:id - Sucesso
    it('PUT /artworks/:id - Deve retornar 200 e atualizar obra', async () => {
        const mockObra = { id: '1', update: vi.fn().mockResolvedValue({ id: '1', titulo: 'Novo' }) };
        Obra.findByPk.mockResolvedValue(mockObra);
        
        const res = await request(app).put('/artworks/1').send({ titulo: 'Novo' });
        expect(res.status).toBe(200);
        expect(res.body.titulo).toBe('Novo');
    });

    // Teste 7: PUT /artworks/:id - 404
    it('PUT /artworks/:id - Deve retornar 404 se não existir', async () => {
        Obra.findByPk.mockResolvedValue(null);
        const res = await request(app).put('/artworks/999').send({ titulo: 'Novo' });
        expect(res.status).toBe(404);
    });

    // Teste 8: DELETE /artworks/:id - Sucesso
    it('DELETE /artworks/:id - Deve retornar 204 ao excluir', async () => {
        const mockObra = { id: '1', destroy: vi.fn().mockResolvedValue(true) };
        Obra.findByPk.mockResolvedValue(mockObra);
        
        const res = await request(app).delete('/artworks/1');
        expect(res.status).toBe(204);
    });

    // Teste 9: DELETE /artworks/:id - 404
    it('DELETE /artworks/:id - Deve retornar 404 se não existir', async () => {
        Obra.findByPk.mockResolvedValue(null);
        const res = await request(app).delete('/artworks/999');
        expect(res.status).toBe(404);
    });

    // Teste 10: Rota inexistente - 404
    it('GET /artworks-invalid - Deve retornar 404 para rota inválida', async () => {
        const res = await request(app).get('/artworks-invalid');
        expect(res.status).toBe(404);
    });
});
