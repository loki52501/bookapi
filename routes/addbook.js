const Book=require('../models/book')

const getBook= async (req, res) => {
    const book = await Book.findAll();
    res.json(book);
  };

 const getBookById=async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
  
    res.json(book);
  };
  
 const createBook= async (req, res) => {
    const book = await Book.create(req.body);
    res.json(book);
  };
  
 const updateBook= async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
  
    await book.update(req.body);
  
    res.json(book);
  };
  
  const deleteBook= async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
  
    await book.destroy();
  
    res.json({ message: 'Book deleted successfully' });
  };
module.exports={getBook,getBookById,createBook,updateBook,deleteBook};
