module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      text: DataTypes.STRING,
  
      description: DataTypes.TEXT
    });
    User.associate = function(models) {
      User.hasMany(models.Post, {
        onDelete: "cascade"
      });
    };
    return User;
  };