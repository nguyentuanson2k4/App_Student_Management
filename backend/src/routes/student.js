import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentByCode,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.post('/', createStudent);
router.get('/:code', getStudentByCode);
router.put('/:code', updateStudent);
router.delete('/:code', deleteStudent);

export default router;
