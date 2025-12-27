import db from '../models/index.js';

const { Score, Student, Subject } = db;

const createScore = async (req, res) => {
  try {
    const payload = req.body;
    const score = await Score.create(payload);
    return res.status(201).json(score);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const getAllScores = async (req, res) => {
  try {
    const scores = await Score.findAll({
      include: [
        { model: Student, as: 'student' },
        { model: Subject, as: 'subject' }
      ]
    });
    return res.json(scores);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const getScoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const score = await Score.findByPk(id, {
      include: [
        { model: Student, as: 'student' },
        { model: Subject, as: 'subject' }
      ]
    });
    if (!score) return res.status(404).json({ error: 'Score not found' });
    return res.json(score);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateScore = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updatedRows] = await Score.update(payload, { where: { id } });
    if (updatedRows === 0) return res.status(404).json({ error: 'Score not found' });
    const updated = await Score.findByPk(id);
    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const deleteScore = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Score.destroy({ where: { id } });
    if (deletedRows === 0) return res.status(404).json({ error: 'Score not found' });
    return res.json({ message: 'Deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const getScoresByStudentCode = async (req, res) => {
    try {
        const { student_code } = req.params;

        const scores = await Score.findAll({
            where: { student_code },
            include: [
                { model: Subject, as: 'subject' }
            ]
        });

        res.json(scores);
    } catch (err) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};


export {
  createScore,
  getAllScores,
  getScoreById,
  updateScore,
  deleteScore,
  getScoresByStudentCode,
};
