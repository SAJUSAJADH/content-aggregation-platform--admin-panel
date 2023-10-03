const mongoose = require('mongoose')
const Connect = require('../../../dbConfig/connect')
import { NextResponse } from "next/server";
import Post from "../../../models/postSchema"

Connect()

export async function POST(req, res){
 try{
    const {
        title,
        category,
        date,
        content,
        summary,
        srcURL
    } = await req.json();

    const post = new Post({
        title: title,
        category: category,
        date: date,
        content: content,
        summary: summary,
        source: srcURL
    })

    await post.save()

    const response = NextResponse.json({
        message: `successfully created post - ${post}`,
    })
     return response
    }catch(e){
        const response = NextResponse.json({
            message: `internal server error - ${e}`
        })
        return response
    }
}