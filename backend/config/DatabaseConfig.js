import mongoose from "mongoose";

const connectDatabase = async() =>{
    try{
        const connection = await mongoose.connect(process.env.DB_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("database alredy connect")
    }catch(err){
        console.log(`Error: ${err.message}`)
        process.exit(1)
    }
}

export default connectDatabase