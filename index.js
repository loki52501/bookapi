const express = require('express');
const cors = require('cors');

const {getBook,getBookById,createBook,deleteBook,updateBook}=require('./routes/addbook');
const {  LoginApi } = require('./routes/auth_routes');
const { AuthenticateToken } = require('./auth/auth');
const app=express()
const port = 8080

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cors({origin:'*'}));

app.get('/',(req,res)=>{
    res.send(  {
        message:"hello there"
      }
    )
})
app.post('/login',LoginApi)
app.get('/book',AuthenticateToken,getBook)
app.get('/book/:id',AuthenticateToken,getBookById)
app.put('/book/:id',AuthenticateToken,updateBook)
app.post('/book',AuthenticateToken,createBook)
app.delete('/book/:id',AuthenticateToken,deleteBook)

app.listen(port,()=>{
    console.log("hello welcome to my port;")
});