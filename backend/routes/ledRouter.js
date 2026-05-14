import express from 'express'
import { LedController } from '../controllers/ledController.js'

export const router = express.Router()

const controller = new LedController()

router.post('/', (req, res, next) => controller.sendLedCommand(req, res, next))


