// server.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const albums = require('./routes/albums')
const upload = require('./routes/upload')
const db = require('./db')

const app = express()
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

app.use('/api/albums', albums)
app.use('/api/upload', upload)

// simple health
app.get('/api/health', (req,res) => res.json({ ok: true }))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Pixora backend running on ${PORT}`))
