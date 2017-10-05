import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type:DataTypes.STRING,
      allowNull: False
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Rating, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  User.hook('beforeCreate', (user) => {
    console.log(user.password, 'signup');
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });

  User.prototype.comparePassword = (password, user) => {
    console.log(user.password, 'login');
    return bcrypt.compareSync(password, user.password);
  };
  return User;
}
