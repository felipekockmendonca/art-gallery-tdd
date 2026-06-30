import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

class Tag extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            nome: { type: DataTypes.STRING, allowNull: false, unique: true }
        }, {
            sequelize,
            modelName: 'Tag',
            tableName: 'tags',
            timestamps: false
        });
        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Obra, {
            through: 'OBRA_TAGS',
            foreignKey: 'tag_id',
            otherKey: 'obra_id',
            as: 'obras',
            timestamps: false
        });
    }
}

module.exports = Tag;