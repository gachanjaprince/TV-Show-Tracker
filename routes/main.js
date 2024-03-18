const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)
router.get('/search', homeController.getResult)
router.get('/search/:id', homeController.getShow)
router.get('/myfavourites', ensureAuth, homeController.getLiked)
router.put('/likePost/:id', ensureAuth, homeController.likePost)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router