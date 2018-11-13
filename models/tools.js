module.exports = function(sequelize, DataTypes) {
  var Tools = sequelize.define("Tools", {
    name: {
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
    },
    checkedOut: {
      type: DataTypes.BOOLEAN
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