import express from 'express';
import {
  createScore,
  getAllScores,
  getScoreById,
  updateScore,
  deleteScore,
  getScoresByStudentCode,
} from '../controllers/scoreController.js';

const router = express.Router();

router.get('/', getAllScores);
router.post('/', createScore);
router.get('/:id', getScoreById);
router.put('/:id', updateScore);
router.delete('/:id', deleteScore);
router.get('/student/:student_code', getScoresByStudentCode);


export default router;
