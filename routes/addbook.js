const client=require("../db")
const createBook=async(req,res)=>{
console.log((req.body))
    try{
        const {book}=req.body;
        //const {keyst}=Object.keys(book);
        console.log(book);
        if(!book.main_title || !book.author ){
            throw Error("Send book in request body");
        }
         client.query("insert into book_s (main_title, author, pub_year, sub, pub, lan, descr, img, url) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",[book['main_title'],book.author,book.pub_year,book.sub,book.pub,book.lan,book.descr,book.img,book.url],
        (err,data)=>{
            res.status(201).json({
            error:null,
            message:"created new book",
        })});
    }
    catch(error){
        res.status(500).json({
            error:error.message,
            message:"Failed to create new book",
            Description:req.body.main_title
        })
    }
}

const getBook=(req,res)=>{
    try{
        client.query("select * from book_s",
        (err,data)=>{
            if (err) throw err;
            res.status(200).json({
            error:null,
            books:data.rows,
        })});
    }
    catch(error){
        res.status(500).json({
            error:error.message,
            message:"Failed to create new book"
        })
    }
}

const getBookById=(req,res)=>{
    try{
        const {id}=req.params;
        client.query("select * from book_s where pdfid=$1",[id],
        (err,data)=>{
            if (err) throw err;
            res.status(200).json({
            error:null,
            book:data.row[0]
        })});
    }
    catch(error){
        res.status(500).json({
            error:error.message,
            message:"Failed to create new book"
        })
    }
}

const updateBookById=(req,res)=>{
    try{
       const {id}=req.params;
       const {bname}=req.body;
       console.log(bname)
       console.log(id)
       client.query('update book_s set main_title=$1, author=$2, pub_year=$3, sub=$4, pub=$5, lan=$6, descr=$7, img=$8, url=$9 where pdfid=$10',[book['main_title'],book.author,book.pub_year,book.sub,book.pub,book.lan,book.descr,book.img,book.url,id],
       (err,data)=>{
        if (err) throw err;
        res.status(201).json({
            err:null,
            message:"successfully updated the book name",
        });

       })   
    }

    catch(err)
    {
        res.status(500).json({
            err:err.message,
         message:"failed to update"
        })
    }
}

const deleteBookById=(req,res)=>{
    try{
        const {id}=req.params
        client.query('delete from book_s where pdfid=$1',[id],(err,data)=>{
            if(err) throw err;
            res.status(201).json({
                err:null,
                message:"successfully deleted the book"
            });
        });
    }
    catch(err)
    {
        res.status(500).json({
            err:err,
            message:"failed to delete the book"
        })
    }
}


module.exports={getBook,createBook,getBookById,updateBookById,deleteBookById};
