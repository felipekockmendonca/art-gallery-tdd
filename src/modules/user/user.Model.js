import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

class User extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            nome: { type: DataTypes.STRING, allowNull: false },
            sobrenome: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            senha_hash: { type: DataTypes.STRING, allowNull: false },
            perfil: { type: DataTypes.ENUM('visitante', 'artista', 'admin'), defaultValue: 'visitante' },
            status: { type: DataTypes.ENUM('ativo', 'suspenso'), defaultValue: 'ativo' }
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            createdAt: 'criado_em',
            updatedAt: 'atualizado_em'
        });
        return this;
    }

    static associate(models) {
        this.hasMany(models.Obra, { foreignKey: 'usuario_id', as: 'obras' });
        this.hasMany(models.Favorito, { foreignKey: 'usuario_id', as: 'favoritos' });
        this.hasMany(models.Comentario, { foreignKey: 'usuario_id', as: 'comentarios' });
        this.hasMany(models.Aprovacao, { foreignKey: 'admin_id', as: 'aprovacoes_feitas' });
    }
}

module.exports = User;