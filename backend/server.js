/**
 * Express server entry point.
 *
 * Initialises the database connection, MQTT client,
 * and HTTP server with all middleware and routes.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import express from 'express'
import connectDB from './db.js'
import connectMqttBroker from './mqttClient.js'
import cors from 'cors'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { router } from './routes/router.js'

const directoryFullName = dirname(fileURLToPath(import.meta.url))

try {
    await connectDB()

    connectMqttBroker()

    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use(express.static(join(directoryFullName, 'public')))

    /** Mount all API routes under /api */
    app.use('/api', router)

    /** Global error handling middleware */
    app.use((err, req, res, next) => {
        console.error(err)
        res.status(err.status || 500).json({ error: err.message })
    })

    const server = app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running at http://localhost:${server.address().port}`)
    })

} catch (err) {
    console.error(err)
    process.exitCode = 1
}