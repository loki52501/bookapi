const express = require('express');
const cors = require('cors');

const {getBook,createBook,getBookById,updateBookById,deleteBookById}=require('./routes/addbook');
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
app.put('/book/:id',updateBookById)
app.post('/book',createBook)
app.delete('/book/:id',deleteBookById)

app.listen(port,()=>{
    console.log("hello welcome to my port;")
});