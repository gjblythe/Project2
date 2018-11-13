module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User",
    {
      text: DataTypes.STRING,
      description: DataTypes.TEXT
    });
  // LOOK INTO THIS WITH JUSTIN
  User.associate = function(models) {
    User.hasMany(models.Tools, {
      onDelete: "cascade"
    });
  };
  return User;
};