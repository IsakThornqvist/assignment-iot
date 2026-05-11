import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const databaseUrl = process.env.MONGODB_URL


async function connectDB () {

    try {
    await mongoose.connect(databaseUrl)
    console.log("Successful connection to database")
        
    } catch (error) {
        console.error("Database connection error:", error)
        process.exit(1)
    }

    }
    

    export default connectDB
