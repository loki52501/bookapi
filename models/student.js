const { DataTypes } =require('sequelize');
const sequelize =require('../config/db.js');

const Student = sequelize.define('Student', {
  StudentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  StudentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  StudentEmail: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  StudentPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports=Student;