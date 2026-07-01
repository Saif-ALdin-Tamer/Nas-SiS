const mongoose = require('mongooose') ;
const { type } = require('node:os');

const noticeSchema = new mongoose.Schema (
    {
        id: {
            type: Number ,
            required: true ,
            unique: true 
        } ,
        titile: {
            type:String ,
            trim: true ,
            required: true 
        } ,
        message: {
            type: String ,
            required: true ,
            trim: true
        } ,
        postedBy: {
            type: mongoose.Schema.ObjectId, ref: 'User' ,
            required: true
        } ,
        audience: {
            type: String ,
            required: true ,
            enum: ['all','students','teachers','parents','staff'] ,
            default: all 
        } ,
        publishDate: {
            type: Date ,
            required: true ,
            default: Date.now
        } ,
        expiryDate: {
            type: Date ,
            required: true ,
            default: Date.now
        }
    } , {timestamps: true }
) ;