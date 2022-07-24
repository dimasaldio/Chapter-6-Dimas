const express = require('express')
const router = express.Router()
const userController = require('../controllers/controller')
const AuthController = require('../controllers/AuthController')
const axios = require('axios')

// login register
router.get('/', (req, res) => {
    res.render('formLogin')
})
router.get('/form-register', (req, res) => {
    res.render('formRegister')
})



router.post('/', AuthController.userLogin)
router.post('/users', AuthController.register)




// CRUD

router.get('/userData', (req, res) => {
    axios.get('http://localhost:3000/users')
    .then(function(response){
        res.render('profileUser',{
            users:response.data
        });
    })
    .catch(err=>{
        res.json(err);
    })
})

router.get('/adminData', (req, res) => {
    axios.get('http://localhost:3000/users')
    .then(function(response){
        res.render('userAdmin',{
            users:response.data
        });
    })
    .catch(err=>{
        res.json(err);
    })
})
router.get('/gameScore', (req, res) => {
    axios.get('http://localhost:3000/users')
    .then(function(response){
        res.render('gameScore',{
            users:response.data
        });
    })
    .catch(err=>{
        res.json(err);
    })
})
router.get('/update-user', (req, res) => {
    axios.get('http://localhost:3000/users',{params : {
        id : req.query.id
    }})
    .then(function(userdata){
        res.render('update_user', {user : userdata.data})
    })
    .catch(err=>{
        res.send(err);
    })
})

// router.get('/profileUser', userController.userIndex);
router.get('/users', userController.userShow);
// router.post('/add', userController.userAdd);
router.put('/users/:id', userController.userUpdate);
router.delete('/users/:id', userController.userDelete);

module.exports = router;