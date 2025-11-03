// routes/upload.js
const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')
const { nanoid } = require('nanoid')
const db = require('../db')
require('dotenv').config()

const region = process.env.AWS_REGION
const bucket = process.env.S3_BUCKET
const s3 = new AWS.S3({ region })

// presigned URL for upload (PUT)
router.post('/presign', async (req, res) => {
  const { filename, albumId, contentType } = req.body
  if (!filename || !albumId) return res.status(400).json({ error: 'filename and albumId required' })
  const key = `albums/${albumId}/${nanoid(8)}_${filename}`
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: Number(process.env.S3_UPLOAD_EXPIRES || 3600),
    ContentType: contentType || 'application/octet-stream',
    ACL: 'private'
  }
  try {
    const url = await s3.getSignedUrlPromise('putObject', params)
    // add photo metadata placeholder; will be updated after successful upload if desired
    const photo = {
      photoId: nanoid(10),
      albumId,
      key,
      url: `https://${bucket}.s3.${region}.amazonaws.com/${key}`,
      uploadedAt: new Date().toISOString()
    }
    db.get('photos').push(photo).write()
    res.json({ uploadUrl: url, photo })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'presign failed' })
  }
})

module.exports = router
