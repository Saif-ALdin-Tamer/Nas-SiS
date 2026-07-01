const mongoose = require('mongoose') ;
const strict = require('node:assert/strict');
const { timestamps } = require('node:console');

const examSchema =  new mongoose.Schema (
    {
        id: {
            type: Number ,
            required: true ,
            unique: true ,
        } ,
        name: {
            type: String ,
            required: true ,
            trim: true 
        } ,
        classId: {
            type: mongoose.Schema.ObjectId, ref: 'User' 
        } ,
        startDate: {
            type: Date ,
            required: true 
        } ,
        endDate: {
            type: Date ,
            required : true 
        } ,
        subject: [
            {
                subjectName: {
                    type: String ,
                    required: true ,
                    trim: true 
                } ,
                maxMark: {
                    type: Number ,
                    required: true 
                } ,
            }
        ] ,
        result: [
            {
                studentId: {
                    type: mongoose.Schema.type.ObjectId, ref: 'studentProfile'  ,
                    required: true
                } ,
                marksObtained: {
                    type: Number ,
                    unique: true ,
                    required: true ,
                } ,
                grade: {
                    type: Number ,
                    required: true
                } 
            } 
        ] 
    } , {timestamps: true}
) ;