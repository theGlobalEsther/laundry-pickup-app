import mongoose from "mongoose";
const database = async() => {
    try{
        const con = await mongoose.connect(process.env.MONGODB_URL)
        console.log("MONGODB connected successfully")
    }catch(err){
        console.error(err)
        process.exit(1)

    }
}

export default database;