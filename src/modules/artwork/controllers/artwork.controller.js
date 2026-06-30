import * as artworkService from '../artwork.service.js';
import Obra from '../artwork.Model.js';

export const create = async (req, res) => {
    try {
        const obra = await artworkService.createArtwork(req.body, Obra);
        res.status(201).json(obra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const list = async (req, res) => {
    try {
        const obras = await artworkService.listArtworks(Obra);
        res.status(200).json(obras);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const obra = await artworkService.getArtworkById(req.params.id, Obra);
        res.status(200).json(obra);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const obra = await artworkService.updateArtwork(req.params.id, req.body, Obra);
        res.status(200).json(obra);
    } catch (error) {
        const status = error.message === 'Obra não encontrada.' ? 404 : 400;
        res.status(status).json({ error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        await artworkService.deleteArtwork(req.params.id, Obra);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
