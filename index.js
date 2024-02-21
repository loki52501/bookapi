const express = require('express');
const cors = require('cors');
const cookieParser=require('cookie-parser');
const {getBook,getBookById,createBook,deleteBook,updateBook}=require('./routes/addbook');
const {  LoginApi } = require('./routes/auth_routes');
const { AuthenticateToken } = require('./auth/auth');
const { CreateUser, getStudent, CreateStudent, getStudentById } = require('./routes/adduser');
const { CreateAdmin, getAdmin, getAdminById } = require('./routes/addadmin');
const { Logout } = require('./routes/logout');
const { Uploads } = require('./controller/signupc');
const multer=require('multer')
const app=express()
const port = 8080

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser());
app.use(cors({ credentials:true,origin: 'http://localhost:3000' }));

app.get('/',(req,res)=>{
    res.send(  {
        message:"hello there"
      }
    )
})
// Set up multer to handle file uploads
const upload = multer({ dest: 'uploads/' });
app.post('/login',LoginApi)
app.post('/register',CreateStudent)
app.get('/book',AuthenticateToken,getBook)
app.get('/book/:id',AuthenticateToken,getBookById)
app.put('/book/:id',AuthenticateToken,updateBook)
app.post('/book',AuthenticateToken,createBook)
app.delete('/book/:id',AuthenticateToken,deleteBook)
app.post('/register/admin',CreateAdmin);
app.get('/admin',getAdmin);
app.get('/admin/:id',getAdminById);
app.get('/logout',AuthenticateToken,Logout);
app.get('/student/:id',AuthenticateToken,getStudentById);
app.post('/uploads',upload.single('file'),Uploads);

app.listen(port,()=>{
    console.log("hello welcome to my port;")
});