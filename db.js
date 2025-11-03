// db.js
const Low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = Low(adapter)

// defaults
db.defaults({ users: [], albums: [], photos: [] }).write()

module.exports = db
