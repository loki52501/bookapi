const { DataTypes } =require('sequelize');
const sequelize =require('../config/db.js');

 const Admin = sequelize.define('Admin', {
  AdminID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  AdminName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  AdminEmail: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  AdminPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports=Admin;