// routes/albums.js
const express = require('express')
const router = express.Router()
const { nanoid } = require('nanoid')
const db = require('../db')

// create album (photographer)
router.post('/', (req, res) => {
  const { title, description, visibility = 'private', photographerName } = req.body
  if (!title) return res.status(400).json({ error: 'title required' })
  const album = {
    albumId: nanoid(10),
    title,
    description: description || '',
    visibility,
    accessCode: visibility === 'private' ? nanoid(8).toUpperCase() : null,
    photographerName: photographerName || 'Anonymous',
    createdAt: new Date().toISOString()
  }
  db.get('albums').push(album).write()
  res.status(201).json(album)
})

// access album by code or id
router.get('/access', (req, res) => {
  const { code, id } = req.query
  let album
  if (code) {
    album = db.get('albums').find(a => a.accessCode === code).value()
  } else if (id) {
    album = db.get('albums').find(a => a.albumId === id).value()
  } else {
    return res.status(400).json({ error: 'code or id required' })
  }
  if (!album) return res.status(404).json({ error: 'album not found' })
  const photos = db.get('photos').filter(p => p.albumId === album.albumId).value()
  res.json({ album, photos })
})

// list public galleries
router.get('/public', (req, res) => {
  const publicAlbums = db.get('albums').filter(a => a.visibility === 'public').value()
  res.json(publicAlbums)
})

module.exports = router
