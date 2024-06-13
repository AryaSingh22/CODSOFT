import mongoose from "mongoose";
import Colors from "colors";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDb database ${mongoose.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`MongoDB error ${error}`.bgRed.white)
    }
}

export default connectDB;