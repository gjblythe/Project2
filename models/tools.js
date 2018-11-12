module.exports = function(sequelize, DataTypes) {
  var Tools = sequelize.define("Tools", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Tools.associate = function(models) {
    Tools.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Tools;
};