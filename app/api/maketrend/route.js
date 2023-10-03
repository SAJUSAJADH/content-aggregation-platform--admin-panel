const mongoose = require('mongoose')
import { NextResponse } from 'next/server'
import Connect from '../../../dbConfig/connect'
import Trend from '../../../models/trendSchema'

Connect()

export async function POST(req, res){
    const {id, trend1, trend2, trend3, trend4, trend5, trend6} = await req.json()
    try{
        const filter = {_id: id}
        const update = {
            trend1: trend1,
            trend2: trend2,
            trend3: trend3,
            trend4: trend4,
            trend5: trend5,
            trend6: trend6,
        }
        const trend = await Trend.findOneAndUpdate(filter, update, {
            new: true
        })
        const response = NextResponse.json(trend)
        return response
    }catch(e){
        const response = NextResponse.json({
            message: `can't update because of - ${e}`
        })
        return response
    }
}