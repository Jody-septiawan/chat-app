const express = require('express')

const router = express.Router()

// Controllers
const { login, registrasi, checkAuth } = require('../controllers/auth')
const { sendMessage, getMessages, getMessageById } = require('../controllers/chat')
const { getUsers,getUser } = require('../controllers/user')

// const { users, 
//         user, 
//         addUser, 
//         updateUser, 
//         deleteUser } = require('../controllers/user')

// Middlewares
const { auth } = require('../middlewares/auth')

// Auth
router.post('/register', registrasi)
router.post('/login', login)
router.get("/check-auth",auth, checkAuth)

// User
router.get('/users', getUsers)
router.get('/user/:id', getUser)
// router.post('/user', addUser)
// router.patch('/user/:id', updateUser)
// router.delete('/user/:id', deleteUser)

// Chat
router.post('/send-message/:id', auth, sendMessage)
router.get('/message/:id', auth, getMessageById)
router.get('/messages', auth, getMessages)


module.exports = router