module.exports = function(sequelize, DataTypes) {
  var Tools = sequelize.define("Tools", {
    userName: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    tool: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      len: [1]
    },
    qty: {
      type: DataTypes.INTEGER,
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