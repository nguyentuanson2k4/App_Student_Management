import authRoutes from './auth.js';
import studentRoutes from './student.js';
import subjectRoutes from './subject.js';
import scoreRoutes from './score.js';

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/students', studentRoutes);
    app.use('/api/v1/subjects', subjectRoutes);
    app.use('/api/v1/scores', scoreRoutes);
    return app.use('/', (req, res) => {
        res.json({ message: 'API' });
    })
}

export default initRoutes;