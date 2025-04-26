const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authUser.middleware')
const router = express.Router();

router.get('/',studentController.getAllStudents);
router.post('/', studentController.addStudent);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;