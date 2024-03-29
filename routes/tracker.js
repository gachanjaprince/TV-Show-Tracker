const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const trackerController = require('../controllers/tracker')
const { ensureAuth } = require('../middleware/auth')

router.get('/', trackerController.getIndex)
router.get('/search', trackerController.getResult)
router.get('/search/:id', trackerController.getShow)
router.get('/myfavourites', ensureAuth, trackerController.getLiked)
router.put('/toggleLike/:id', ensureAuth, trackerController.toggleLike)

module.exports = router