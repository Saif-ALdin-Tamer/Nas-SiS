const express = require ('express') ;
const router = express.Router() ;

const { 
    markAttendance, 
    getClassAttendance, 
    getStudentAttendanceReport 
} = require('../controllers/attendanceController.js');

router.use(authMiddleware.protect);

router.post('/mark', markAttendance);
router.get('/class/:classId', getClassAttendance);
router.get('/student/:studentId', getStudentAttendanceReport);


module.exports = router;