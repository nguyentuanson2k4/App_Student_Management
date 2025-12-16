import db from '../models/index.js';

const { Subject } = db;

const createSubject = async (req, res) => {
  try {
    const payload = req.body;
    const subject = await Subject.create(payload);
    return res.status(201).json(subject);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    return res.json(subjects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const getSubjectByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const subject = await Subject.findOne({ where: { subject_code: code } });
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    return res.json(subject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const { code } = req.params;
    const payload = req.body;
    const [updatedRows] = await Subject.update(payload, { where: { subject_code: code } });
    if (updatedRows === 0) return res.status(404).json({ error: 'Subject not found' });
    const updated = await Subject.findOne({ where: { subject_code: code } });
    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { code } = req.params;
    const deletedRows = await Subject.destroy({ where: { subject_code: code } });
    if (deletedRows === 0) return res.status(404).json({ error: 'Subject not found' });
    return res.json({ message: 'Deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export {
  createSubject,
  getAllSubjects,
  getSubjectByCode,
  updateSubject,
  deleteSubject,
};
