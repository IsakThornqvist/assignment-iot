import express from 'express'
import connectDB from './db.js'
import connectMqttBroker from './mqttClient.js'


const app = express()
app.use(express.json())