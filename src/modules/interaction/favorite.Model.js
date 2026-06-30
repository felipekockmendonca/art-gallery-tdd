import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

class Favorito extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            usuario_id: { type: DataTypes.UUID, allowNull: false },
            obra_id: { type: DataTypes.UUID, allowNull: false }
        }, {
            sequelize,
            modelName: 'Favorito',
            tableName: 'favoritos',
            createdAt: 'criado_em',
            updatedAt: false
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'usuario_id', as: 'usuario' });
        this.belongsTo(models.Obra, { foreignKey: 'obra_id', as: 'obra' });
    }
}

module.exports = Favorito;