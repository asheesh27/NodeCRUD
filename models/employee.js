const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('db', 'root', 'palnar123', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    allowPublicKeyRetrieval: true,
  },
  logging:console.log,
});

const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    single : {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'employees',
    timestamps: false
  });

module.exports = Employee;
