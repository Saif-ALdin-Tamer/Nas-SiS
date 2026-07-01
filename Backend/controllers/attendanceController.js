const Attendance = require('../models/Attendance.js');
const attendace = require ('../models/Attendance.js') ;
const ApiError = require ('../utils/apiError.js') ;

const markAttendance = async (req, res, next) => {
    try {
        const {classId, record, date } = req.body ;
        const createdBy = req.user._id || req.body.createdBy ;
        if (! record || ! date || 
            classId || record.length === 0 ) {
                return res.status(404).json({
                    success: false ,
                    message: 'please fill all of the fields'
                })
        }
        const startsDay = new Date(date) ;
        startsDay.setHours(0 ,0 ,0 ,0) ;
        const endOfDay =new Date(date) ;
        endOfDay.setHours(23, 59, 999) ;
        
        let attendance = await Attendance.findOne({
            classId,
            date: { $gte: startOfDay, $lte: endOfDay }
        }) ;
        if (attendace) {
            attendace.record = record ;
            attendace.createdBy = createdBy ;
            await attendace.save() ;
        } else {
            attendace = await Attendance.create({
                classId ,
                date ,
                record ,
                createdBy 
            }) ;
        }
        return res.status(200).json({
            success: true, 
            message: 'Attendance is recorded successfully',
            data: attendace
        }) ;
    } catch (errro) {
        next( error ) ;
    }
} ;


const getClassAttendance = async (req, res, next ) => {
    try {
        const { classId } =req.params ;
        const {date } = req.query ;
        let query = { classId } ;
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            query.date = { $gte: startOfDay, $lte: endOfDay };
        }

        const attendaceRecord = await Attendance.find(query )
        .populate('records.studentId', 'name email') 
        .populate('classId', 'name section');
        return res.status(200).json({
            success: true,
            data:attendaceRecord
        }) ;
    } catch ( error ) {
        next( error ) ;
    }
} ;

const getStudentAttendanceReport = async (req, res, next) => {
    try {
    const { studentId } = req.params;
    const attendanceRecords = await Attendance.find({
        'records.studentId': studentId
    }).populate('classId', 'name section');
    const report = attendanceRecords.map( record => {
        const studentRecord = record.records.find( r =>
            r.studentId.toString() === studentId);
        return {
        date: record.date,
        class: record.classId,
        status: studentRecord ? studentRecord.status : 'unknown',
        remarks: studentRecord ? studentRecord.remarks : ''
        };
    });
    return res.status(200).json({
        success: true,
        totalDays: report.length,
        data: report
    });
    } catch ( error ) {
    next( error );
    }
};

module.exports = {
    markAttendance,
    getClassAttendance,
    getStudentAttendanceReport
};