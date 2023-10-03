const mongoose = require('mongoose');
require('dotenv').config();

async function Connect(){
    const db = process.env.MONGO_URL
    try{
        await mongoose.connect(db).then(()=>{
        console.log("connected")
        })
    }catch(e){
        console.log(e)
    }
}


module.exports = Connect
