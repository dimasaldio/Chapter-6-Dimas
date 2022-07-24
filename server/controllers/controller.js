const userData = require('../models/model')

const userIndex = (req, res) =>{
    userData.find()
    .then(response =>{
        res.json({
            response
        })
    })
    .catch (error =>{
        res.json({
            message : 'Terjadi kesalahan'
        })
    })
}

// menampilkan data user
const userShow = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;

        userData.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message:'user not found'
                })
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: 'error retrieving user'
            })
        })
    }else{
        userData.find()
    .then(user =>{
        res.json(user)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || 'Some error occured'
        })
    })
    }
}

// create

const userAdd = (req,res)=>{
    let userBaru = new userData({
        username : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        gender : req.body.gender,
        age : req.body.age
    })
    userBaru.save()
    .then(response =>{
        res.json({
            message: 'Penambahan data sukses'
        })
    })
    .catch(error =>{
        res.json({
            message : 'Terjadi kesalahan'
        })
    })
}



// update data user
const userUpdate = (req,res) =>{
    let userdataID = req.params.userdataID

    let updateUser = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        gender : req.body.gender,
        age : req.body.age
    }

    userData.findByIdAndUpdate(userdataID, {$set: updateUser})
    .then(() =>{
        res.json ({
            message : 'Sukses update!'
        })
    })
    .catch(error =>{
        res.json ({
            message : 'Terjadi kesalahan'
        })
    })
}

// delete data user

const userDelete = (req,res) =>{
    const id = req.params.id;

    userData.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({
                message: 'Terjadi kesalahan!'
            })
        }else{
            res.send({
             message:'Sukses menghapus!'   
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message:'Tidak bisa menghapus'   
        })
    })
}

module.exports = {
    userIndex , userShow, userAdd, userUpdate, userDelete
}