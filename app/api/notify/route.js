import Connect from '../../../dbConfig/connect'
import Notification from '../../../models/notificationSchema'
import { NextResponse } from 'next/server'
const mongoose = require('mongoose')

Connect()

export async function POST(req, res){
    const {id, notification1, notification2, notification3} = await req.json() 
    try{
        const filter = {_id: id}
        const update = {
            notification1: notification1,
            notification2: notification2,
            notification3: notification3
        }

        const notifications = await Notification.findOneAndUpdate(filter, update, {
            new: true
        })

        const response = NextResponse.json(notifications)
        return response
    }catch(e){
        const response = NextResponse.json({
            message:`cannot get at this time - ${e}`
        })
    }
}