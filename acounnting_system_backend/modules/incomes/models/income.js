const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Income = sequelize.define(
    "Income",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },

      amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
      },

      source: {
        type: DataTypes.STRING,
        allowNull: true
      },

      customerId: {
        type: DataTypes.UUID,
        allowNull: true
      },

      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true
      },

      attachment: {
        type: DataTypes.STRING,
        allowNull: true
        // store file path or URL (e.g. uploads/incomes/xxx.jpg)
      },

      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: "incomes",
      timestamps: true
    }
  );

  return Income;
};
