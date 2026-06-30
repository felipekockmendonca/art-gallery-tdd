import { DataTypes, Model } from 'sequelize';

class Obra extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            usuario_id: { type: DataTypes.UUID, allowNull: false },
            categoria_id: { type: DataTypes.UUID, allowNull: false },
            titulo: { type: DataTypes.STRING, allowNull: false },
            descricao: { type: DataTypes.TEXT, allowNull: true },
            arquivo_url: { type: DataTypes.STRING, allowNull: false },
            arquivo_tipo: { type: DataTypes.STRING, allowNull: false },
            arquivo_tamanho_kb: { type: DataTypes.INTEGER, allowNull: false },
            status: { type: DataTypes.ENUM('pendente', 'aprovada', 'rejeitada'), defaultValue: 'pendente' },
            visualizacoes: { type: DataTypes.INTEGER, defaultValue: 0 }
        }, {
            sequelize,
            modelName: 'Obra',
            tableName: 'obras',
            createdAt: 'criado_em',
            updatedAt: 'atualizado_em'
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'usuario_id', as: 'artista' });
        this.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
        this.hasMany(models.Favorito, { foreignKey: 'obra_id', as: 'favoritadas_por' });
        this.hasMany(models.Comentario, { foreignKey: 'obra_id', as: 'comentarios' });
        this.hasMany(models.Aprovacao, { foreignKey: 'obra_id', as: 'historico_aprovacoes' });

        // Relacionamento N:M com Tags
        this.belongsToMany(models.Tag, {
            through: 'OBRA_TAGS',
            foreignKey: 'obra_id',
            otherKey: 'tag_id',
            as: 'tags',
            timestamps: false
        });
    }
}

export default Obra;