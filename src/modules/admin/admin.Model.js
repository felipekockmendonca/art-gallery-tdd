import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

class Aprovacao extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            obra_id: { type: DataTypes.UUID, allowNull: false },
            admin_id: { type: DataTypes.UUID, allowNull: false },
            decisao: { type: DataTypes.ENUM('aprovada', 'rejeitada'), allowNull: false },
            motivo: { type: DataTypes.TEXT, allowNull: true }
        }, {
            sequelize,
            modelName: 'Aprovacao',
            tableName: 'aprovacoes',
            createdAt: 'decidido_em',
            updatedAt: false
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Obra, { foreignKey: 'obra_id', as: 'obra' });
        this.belongsTo(models.User, { foreignKey: 'admin_id', as: 'moderador' });
    }
}

module.exports = Aprovacao;