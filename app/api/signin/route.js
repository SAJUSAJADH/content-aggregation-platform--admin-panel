require('dotenv').config()
const mongoose = require('mongoose')
const Connect = require('../../../dbConfig/connect')
const Admin = require("../../../models/adminSchema")
const {NextResponse} = require("next/server");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET


Connect()

export async function POST(req,res){
    try{
        const {Email, Password} = await req.json()
        const adminExist = await Admin.findOne({username: Email})
        if(adminExist){
            const passOk =  bcrypt.compareSync(Password, adminExist.password)
            if(passOk){
                const token = jwt.sign({
                    id: adminExist._id,
                    username: adminExist.username,
                    password: adminExist.password,
                },secret, {expiresIn: "1d"})  

                const response = NextResponse.json(adminExist)

                response.cookies.set("token", token, {
                    httpOnly: true
                })
                return response;
            }else{
                return NextResponse.json({message: "inavlid password"})
            }
        }else{
            return NextResponse.json({message: "user not found"});
        }
        
    }catch(e){
        
        return NextResponse.json({message: `error occured-${e}`})
    }
}

