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
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Rating, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
    });
  };
  return User;
}
