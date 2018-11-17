module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: DataTypes.STRING,
    tools: DataTypes.TEXT,
    createdAt: DataTypes.DATE
  });
  // LOOK INTO THIS WITH JUSTIN
  User.associate = function(models) {
    User.hasMany(models.Tools, {
      onDelete: "cascade"
    });
  };
  return User;
};
