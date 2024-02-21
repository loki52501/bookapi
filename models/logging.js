const { DataTypes } =require('sequelize');
const sequelize =require('../config/db.js');
const Student = require('./student.js');

 const Login_History = sequelize.define('login_history', {
  loginid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  logintime: {
    type: DataTypes.TIME,
    allowNull: true,
  },

 
});
Login_History.addHook('beforeCreate', (loginHistory, options) => {
    // Set the LoginTime to the current time
    loginHistory.logintime = new Date().toLocaleTimeString('en-US', { hour12: false });
  },);

module.exports=Login_History;