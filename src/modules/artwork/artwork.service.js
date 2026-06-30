export const createArtwork = async (data, ArtworkModel) => {
    if (!data.titulo || data.titulo.trim() === '') {
        throw new Error('O título é obrigatório.');
    }
    if (!data.usuario_id) {
        throw new Error('O ID do usuário é obrigatório.');
    }
    return await ArtworkModel.create(data);
};

export const listArtworks = async (ArtworkModel) => {
    return await ArtworkModel.findAll();
};

export const getArtworkById = async (id, ArtworkModel) => {
    const artwork = await ArtworkModel.findByPk(id);
    if (!artwork) {
        throw new Error('Obra não encontrada.');
    }
    return artwork;
};

export const updateArtwork = async (id, data, ArtworkModel) => {
    const artwork = await ArtworkModel.findByPk(id);
    if (!artwork) {
        throw new Error('Obra não encontrada.');
    }
    return await artwork.update(data);
};

export const deleteArtwork = async (id, ArtworkModel) => {
    const artwork = await ArtworkModel.findByPk(id);
    if (!artwork) {
        throw new Error('Obra não encontrada.');
    }
    await artwork.destroy();
    return true;
};
