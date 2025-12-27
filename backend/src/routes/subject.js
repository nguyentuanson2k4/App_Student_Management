import express from 'express';
import {
  createSubject,
  getAllSubjects,
  getSubjectByCode,
  updateSubject,
  deleteSubject,
} from '../controllers/subjectController.js';

import { protectedRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllSubjects);
router.get('/:code', getSubjectByCode);
router.post('/',protectedRoute, createSubject);
router.put('/:code',protectedRoute, updateSubject);
router.delete('/:code',protectedRoute, deleteSubject);

export default router;
