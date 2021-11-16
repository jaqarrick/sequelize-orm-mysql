import { Model, DataTypes } from 'sequelize';
import user from './user';

export default (sequelize) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsTo(models.User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Role.init(
    {
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );

  return Role;
};
