const { DataTypes } =require('sequelize');
const sequelize =require('../config/db.js');

 const Admin = sequelize.define('admin', {
  adminid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  adminname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminemail: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  adminpassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports=Admin;