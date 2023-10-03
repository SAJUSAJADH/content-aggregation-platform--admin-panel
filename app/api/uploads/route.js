
import { NextResponse } from 'next/server'
import Post from '../../../models/postSchema'
const Connect = require('../../../dbConfig/connect')

Connect()

export async function GET(req, res){
    try{
        const posts = await Post.find()
        const response = NextResponse.json(posts)
        return response
        }catch(e){
            const response = NextResponse.json({
                message: `internal server error - ${e}`
            })
            return response
        }
}