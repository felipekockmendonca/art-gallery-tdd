import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

class Comentario extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            usuario_id: { type: DataTypes.UUID, allowNull: false },
            obra_id: { type: DataTypes.UUID, allowNull: false },
            conteudo: { type: DataTypes.TEXT, allowNull: false }
        }, {
            sequelize,
            modelName: 'Comentario',
            tableName: 'comentarios',
            createdAt: 'criado_em',
            updatedAt: 'atualizado_em'
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'usuario_id', as: 'autor' });
        this.belongsTo(models.Obra, { foreignKey: 'obra_id', as: 'obra' });
    }
}

module.exports = Comentario;