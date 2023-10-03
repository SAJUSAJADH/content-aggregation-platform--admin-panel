import Trend from '../../../models/trendSchema'
import Connect from '../../../dbConfig/connect'
import { NextResponse } from 'next/server'
const mongoose = require('mongoose')

Connect()

export async function GET(){
    try{
        const trends = await Trend.find()
        if(trends){
            const response = NextResponse.json(trends)
            return response
        }else{
            const response = NextResponse.json({
                message: `DB unavailable or no data in db.`
            })
            return response
        }
    }catch(e){
        const response = NextResponse.json({
            message:`cannot get at this time - ${e}`
        })
        return response
    }
}