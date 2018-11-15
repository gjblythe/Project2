module.exports = function(sequelize, DataTypes) {
  var Tools = sequelize.define("Tools", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.DECIMAL,
      allowNull: false,
      len: [1]
    },
    qty: {
      type: DataTypes.INTEGER,
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