import express from 'express'
import { SensorController } from '../controllers/sensorController.js'

export const router = express.Router()

const controller = new SensorController()

router.get('/', (req, res, next) => controller.getReadings(req, res, next))


