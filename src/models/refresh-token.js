import { Model, DataTypes } from 'sequelize';
import user from './user';

export default (sequelize) => {
  class RefreshToken extends Model {
    static associate(models) {
      RefreshToken.belongsTo(models.User, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  RefreshToken.init(
    {
      token: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'RefreshToken',
    }
  );

  return RefreshToken;
};
