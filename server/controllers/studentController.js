const Student = require('../models/Student');
const Transaction=require('../models/Transaction')

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new student
exports.addStudent = async (req, res) => {
  const { name, fatherName, mobile, email, isActive } = req.body;

  if(!name|| !fatherName || !mobile || !email || !isActive)
  {
    return res.status(200).json({ message: 'All Fields Required' });
  }

  try {
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(200).json({ message: 'Student Email already exists' });
    }

    const student = new Student({name, fatherName, mobile, email, isActive });
    const newStudent = await student.save();

    res.status(201).json({ message: 'Student Added Sucessfully' ,student : newStudent});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Delete all transactions associated with the student
    await Transaction.deleteMany({ studentId: req.params.id });

    res.json({ message: 'Student and related transactions deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
