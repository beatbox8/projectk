const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authUser.middleware')
const router = express.Router();

router.get('/',authMiddleware.protectRoute,studentController.getAllStudents);
router.post('/',authMiddleware.protectRoute, studentController.addStudent);
router.get('/:id',authMiddleware.protectRoute, studentController.getStudentById);
router.put('/:id',authMiddleware.protectRoute, studentController.updateStudent);
router.delete('/:id',authMiddleware.protectRoute, studentController.deleteStudent);

module.exports = router;
