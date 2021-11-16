import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import environment from '../config/environment';
export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      // create the associations between the other tables
      User.RefreshToken = User.hasOne(models.RefreshToken);
      User.Roles = User.hasMany(models.Role);
    }

    static async hashPassword(password) {
        if(password){
            return bcrypt.hash(password, environment.saltRounds);
        }
    }

    static async createNewUser({
      email,
      password,
      roles,
      username,
      firstName,
      lastName,
      refreshToken,
    }) {
      const rolesToSave =
        roles && Array.isArray(roles) ? roles.map((role) => ({ role })) : [];
      // if one of these insertions fail, we need them all to fail (rollback)
      // if they all succeed, then we commit the entry
      return sequelize.transaction(() => {
        return User.create(
          {
            email,
            password,
            username,
            firstName,
            lastName,
            // this is coming from the token table
            RefreshToken: { token: refreshToken },
            Roles: rolesToSave,
          },
          { include: [User.RefreshToken, User.Roles] }
        );
      });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Not a valid email address',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          len: {
            args: [2, 50],
            msg: 'Username must contain between 2 and 50 characters',
          },
        },
      },
      firstName: {
        type: DataTypes.STRING(50),
        validate: {
          len: {
            args: [3, 50],
            msg: 'First name must contain between 3 and 50 characters',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        validate: {
          len: {
            args: [3, 50],
            msg: 'Last name must contain between 3 and 50 characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      // excluding password will prevent it to be returned from a query
      defaultScope: { attributes: { exclude: ['password'] } },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] },
        },
      },
    }
  );

  User.prototype.comparePasswords = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.beforeSave(async (user, options) => {
    const hashedPassword = await User.hashPassword(user.password);
    user.password = hashedPassword;
  });

  User.afterCreate((user, options) => {
    delete user.dataValues.password;
  });

  return User;
};
