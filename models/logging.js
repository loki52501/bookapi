const { DataTypes } =require('sequelize');
const sequelize =require('../config/db.js');

 const Login_History = sequelize.define('Login_History', {
  LoginID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  StudentID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  LoginDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  LoginTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});
module.exports=Login_History;