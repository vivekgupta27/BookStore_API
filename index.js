import express from "express"
import bookRoutes from "./Routes/BookRoutes.js";









const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/books", bookRoutes);





app.listen(5000,()=>{
    console.log("Server Started at 5000")
})