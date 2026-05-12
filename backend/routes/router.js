import express from 'express'
import { router as sensorRouter } from './sensorRouter.js'
import { router as ledRouter } from './ledRouter.js'

export const router = express.Router()

router.use('/readings', sensorRouter)
router.use('/command/led', ledRouter)