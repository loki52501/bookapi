const express = require('express');
const cors = require('cors');

const {getBook,getBookById,createBook,deleteBook,updateBook}=require('./routes/addbook');
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

app.get('/book',getBook)
app.get('/book/:id',getBookById)
app.put('/book/:id',updateBook)
app.post('/book',createBook)
app.delete('/book/:id',deleteBook)

app.listen(port,()=>{
    console.log("hello welcome to my port;")
});