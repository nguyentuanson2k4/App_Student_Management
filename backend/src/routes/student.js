import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentByCode,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';

import { protectedRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/:code', getStudentByCode);
router.post('/', protectedRoute, createStudent);
router.put('/:code', protectedRoute, updateStudent);
router.delete('/:code', protectedRoute, deleteStudent);

export default router;
