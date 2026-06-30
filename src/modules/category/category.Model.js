import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

class Categoria extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            nome: { type: DataTypes.STRING, allowNull: false, unique: true },
            descricao: { type: DataTypes.STRING, allowNull: true }
        }, {
            sequelize,
            modelName: 'Categoria',
            tableName: 'categorias',
            createdAt: 'criado_em',
            updatedAt: false
        });
        return this;
    }

    static associate(models) {
        this.hasMany(models.Obra, { foreignKey: 'categoria_id', as: 'obras' });
    }
}

module.exports = Categoria;