import express from "express"
const router=express.Router()
import {getBooks,addBook,updateBook,deleteBook} from "../Controller/BookController.js"

router.get('/',getBooks)
router.post('',addBook ); 


router.put('/:id', updateBook);

router.delete('/:id',deleteBook );

export default router;