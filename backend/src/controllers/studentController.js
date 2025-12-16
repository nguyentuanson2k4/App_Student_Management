import db from '../models/index.js';

const { Student, Score, Subject } = db;

const createStudent = async (req, res) => {
  try {
    const payload = req.body;
    const student = await Student.create(payload);
    return res.status(201).json(student);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    return res.json(students);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const getStudentByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const student = await Student.findOne({
      where: { student_code: code },
      include: [
        {
          model: Score,
          as: 'scores',
          include: [
            { model: Subject, as: 'subject' }
          ]
        }
      ]
    });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    return res.json(student);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { code } = req.params;
    const payload = req.body;
    const [updatedRows] = await Student.update(payload, { where: { student_code: code } });
    if (updatedRows === 0) return res.status(404).json({ error: 'Student not found' });
    const updated = await Student.findOne({ where: { student_code: code } });
    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { code } = req.params;
    const deletedRows = await Student.destroy({ where: { student_code: code } });
    if (deletedRows === 0) return res.status(404).json({ error: 'Student not found' });
    return res.json({ message: 'Deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export {
  createStudent,
  getAllStudents,
  getStudentByCode,
  updateStudent,
  deleteStudent,
};
