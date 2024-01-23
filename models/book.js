const { DataTypes } =require('sequelize');
const sequelize =require('../config/db');

 const Book = sequelize.define('book', {
    bookid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    booktitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookauthor: {
      type: DataTypes.STRING,
    },
    bookgenre: {
      type: DataTypes.STRING,
    },
 
    booksubject: {
      type: DataTypes.STRING,
    },
    bookpublisher: {
      type: DataTypes.STRING,
    },
    bookimg:{
        type:DataTypes.STRING,
    },
    bookurl:{
        type:DataTypes.STRING
    },
    booktype:{
        type:DataTypes.STRING
    },
    bookdescription:{
      type:DataTypes.STRING
  },
  bookpublisheddate:{
    type:DataTypes.DATE,
  }
  });

  module.exports=Book;