import mongoose from "mongoose";


mongoose.connect("mongodb://localhost:27017/Book-Store",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})


const BookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true

    },
    price:{
        type:Number,
        required:true
    },
    publishedDate:{
        type:Date,
        required:true
    }
})

const Book=mongoose.model("Book",BookSchema)

export default Book;