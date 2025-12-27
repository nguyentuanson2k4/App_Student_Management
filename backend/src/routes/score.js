import express from 'express';
import {
  createScore,
  getAllScores,
  getScoreById,
  updateScore,
  deleteScore,
  getScoresByStudentCode,
} from '../controllers/scoreController.js';

import { protectedRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllScores);
router.get('/:id', getScoreById);
router.get('/student/:student_code', getScoresByStudentCode);
router.post('/',protectedRoute, createScore);
router.put('/:id',protectedRoute, updateScore);
router.delete('/:id',protectedRoute, deleteScore);


export default router;
