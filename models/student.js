const { DataTypes } =require('sequelize');
const sequelize =require('../config/db.js');
const Login_History = require('./logging.js');

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
Student.addHook('afterCreate', (student, options) => {
  // Create a new entry in Login_History table
  Login_History.create({
    studentid: student.studentid
  });
});
Student.hasMany(Login_History, { foreignKey: 'studentid' });
Login_History.belongsTo(Student, { foreignKey: 'studentid' });


module.exports=Student;