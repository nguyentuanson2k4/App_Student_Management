import express from 'express';
import {
  createSubject,
  getAllSubjects,
  getSubjectByCode,
  updateSubject,
  deleteSubject,
} from '../controllers/subjectController.js';

const router = express.Router();

router.get('/', getAllSubjects);
router.post('/', createSubject);
router.get('/:code', getSubjectByCode);
router.put('/:code', updateSubject);
router.delete('/:code', deleteSubject);

export default router;
