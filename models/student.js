const { DataTypes } =require('sequelize');
const sequelize =require('../config/db.js');

const Student = sequelize.define('student', {
  studentid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentemail: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  studentpassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports=Student;