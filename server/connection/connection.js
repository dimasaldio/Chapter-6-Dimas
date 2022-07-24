const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const con = await mongoose.connect(
            'mongodb://admin1:12345@ac-ku5w5zt-shard-00-00.pviv9lj.mongodb.net:27017,ac-ku5w5zt-shard-00-01.pviv9lj.mongodb.net:27017,ac-ku5w5zt-shard-00-02.pviv9lj.mongodb.net:27017/?ssl=true&replicaSet=atlas-acmpq9-shard-0&authSource=admin&retryWrites=true&w=majority',
            {   useNewUrlParser: true, 
                useUnifiedTopology: true }
        )
        console.log('MongoDB connected:' + con.connection.host);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;