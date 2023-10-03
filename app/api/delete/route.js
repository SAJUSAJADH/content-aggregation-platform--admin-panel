import { NextResponse } from 'next/server'
import Post from '../../../models/postSchema'
const Connect = require('../../../dbConfig/connect')

Connect()

export async function POST(req,res){
    try{
        const {id} = await req.json()
        const findData = await Post.findOne({_id: id})
        if(findData){
            const deletedData = await Post.deleteOne({_id: id})
            if(deletedData){
                const response = NextResponse.json({
                    message: "deletion successfull"
                })
                return response
            }else{
                const response = NextResponse.json({
                    message: `can't delete record try again`
                })
                return response
            }
        }else{
            const response = NextResponse.json({
                message: `Data not found with id - ${id}`
            })
            return response
        }
    }catch(e){
        const response = NextResponse.json({
            message: `internal server error - ${e}`
        })

        return response
    }
}