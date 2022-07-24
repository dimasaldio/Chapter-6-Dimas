
const { response } = require('express');
const { Sequelize } = require('sequelize');
const userData = require('../models/model');

// login sebagai admin pakai username=admin dan pass=admin
const userLogin = async (req, res) => {
    const { username, password } = req.body
    if ( !username || !password ) {
        res.redirect('/');
    } else {
        try {
            let findUser = await userData.findOne({ username: username })
            if ( username === 'admin' && password === 'admin' ) {
                res.redirect('/adminData')
            } else{
                if ( !findUser || findUser.length < 0 ) {
                    res.json({ 
                        message: "password atau username salah"})
                } else {
                    if ( findUser.password === password ) {
                        res.redirect('/userData')
                    } else {
                        res.json({ 
                            message: "password atau username salah"})
                    }
                }
            }
        } catch (error) {
            console.log(error)
            res.json(error.message)
        }
    }
}

const register = async (req, res) => {
    const { username, password, email } = req.body
    if ( !username || !password || !email || username==='admin' || password==='admin' ) {
        res.redirect('/form-register');
    } else {
        try {
            let findUser = await userData.findOne({ username: username, email : email })
            if ( findUser ) {
                res.json({message: "Gunakan username atau email yang lain!"})
            } else {
                let createUser = new userData ({
                    username: req.body.username, 
                    email: req.body.email, 
                    password: req.body.password, 
                    firstName: req.body.firstName, 
                    lastName: req.body.lastName, 
                    gender: req.body.gender, 
                    age: req.body.age, 
                    
                })

                createUser
                .save(createUser)
                .then(data=>{
                    res.redirect('/');
                })
                .catch(err =>{
                    res.status(500).send({
                        message:err.message || 'Some error occured'
                    });
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    }
}

module.exports = {
    register, userLogin
}


