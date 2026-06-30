import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as artworkService from '../artwork.service.js';

const mockArtworkModel = {
    create: vi.fn(),
    findAll: vi.fn(),
    findByPk: vi.fn(),
    update: vi.fn(),
    destroy: vi.fn()
};

describe('Artwork Service - Unit Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Teste 1: Criação com sucesso
    it('Deve criar uma obra de arte com sucesso', async () => {
        const data = {
            usuario_id: 'user-1',
            categoria_id: 'cat-1',
            titulo: 'Mona Lisa',
            descricao: 'Obra clássica',
            arquivo_url: 'http://link.com/img.jpg',
            arquivo_tipo: 'image/jpeg',
            arquivo_tamanho_kb: 500
        };
        mockArtworkModel.create.mockResolvedValue({ id: 'obra-1', ...data });

        const result = await artworkService.createArtwork(data, mockArtworkModel);
        expect(result.titulo).toBe('Mona Lisa');
        expect(mockArtworkModel.create).toHaveBeenCalled();
    });

    // Teste 2: Erro título vazio
    it('Deve lançar erro se o título estiver vazio', async () => {
        const data = { titulo: '' };
        await expect(artworkService.createArtwork(data, mockArtworkModel))
            .rejects.toThrow('O título é obrigatório.');
    });

    // Teste 3: Erro usuário não informado
    it('Deve lançar erro se o usuario_id não for informado', async () => {
        const data = { titulo: 'Valid Title' };
        await expect(artworkService.createArtwork(data, mockArtworkModel))
            .rejects.toThrow('O ID do usuário é obrigatório.');
    });

    // Teste 4: Listar todas as obras
    it('Deve listar todas as obras', async () => {
        mockArtworkModel.findAll.mockResolvedValue([{ id: '1', titulo: 'Obra 1' }]);
        const result = await artworkService.listArtworks(mockArtworkModel);
        expect(result.length).toBe(1);
        expect(mockArtworkModel.findAll).toHaveBeenCalled();
    });

    // Teste 5: Buscar por ID com sucesso
    it('Deve buscar uma obra por ID', async () => {
        mockArtworkModel.findByPk.mockResolvedValue({ id: '1', titulo: 'Obra 1' });
        const result = await artworkService.getArtworkById('1', mockArtworkModel);
        expect(result.titulo).toBe('Obra 1');
    });

    // Teste 6: Erro ao buscar ID inexistente
    it('Deve lançar erro ao buscar obra inexistente', async () => {
        mockArtworkModel.findByPk.mockResolvedValue(null);
        await expect(artworkService.getArtworkById('999', mockArtworkModel))
            .rejects.toThrow('Obra não encontrada.');
    });

    // Teste 7: Atualizar obra com sucesso
    it('Deve atualizar uma obra com sucesso', async () => {
        const obra = { id: '1', update: vi.fn() };
        mockArtworkModel.findByPk.mockResolvedValue(obra);
        obra.update.mockResolvedValue({ ...obra, titulo: 'Novo Titulo' });

        const result = await artworkService.updateArtwork('1', { titulo: 'Novo Titulo' }, mockArtworkModel);
        expect(result.titulo).toBe('Novo Titulo');
    });

    // Teste 8: Deletar obra com sucesso
    it('Deve deletar uma obra com sucesso', async () => {
        const obra = { id: '1', destroy: vi.fn() };
        mockArtworkModel.findByPk.mockResolvedValue(obra);
        obra.destroy.mockResolvedValue(true);

        const result = await artworkService.deleteArtwork('1', mockArtworkModel);
        expect(result).toBe(true);
        expect(obra.destroy).toHaveBeenCalled();
    });

    // Teste 9: Erro ao atualizar obra inexistente
    it('Deve lançar erro ao atualizar obra inexistente', async () => {
        mockArtworkModel.findByPk.mockResolvedValue(null);
        await expect(artworkService.updateArtwork('999', {}, mockArtworkModel))
            .rejects.toThrow('Obra não encontrada.');
    });

    // Teste 10: Erro ao deletar obra inexistente
    it('Deve lançar erro ao deletar obra inexistente', async () => {
        mockArtworkModel.findByPk.mockResolvedValue(null);
        await expect(artworkService.deleteArtwork('999', mockArtworkModel))
            .rejects.toThrow('Obra não encontrada.');
    });
});
