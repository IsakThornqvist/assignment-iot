/**
 * Database connection.
 *
 * Establishes a connection to MongoDB Atlas using Mongoose.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const databaseUrl = process.env.MONGODB_URI

/**
 * Connects to MongoDB Atlas.
 * Exits the process if the connection fails.
 */
async function connectDB() {
    try {
        await mongoose.connect(databaseUrl)
        console.log("Successful connection to database")
    } catch (error) {
        console.error("Database connection error:", error)
        process.exit(1)
    }
}

export default connectDB