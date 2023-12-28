const { DataTypes } =require('sequelize');
const sequelize =require('../config/db.js');

const Book_Picks = sequelize.define('Book_Picks', {
  PickID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  StudentID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  BookID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  PickDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  PickType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Book_Picks;