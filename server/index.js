const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // للحماية والأمان
require('dotenv').config();

const generateRoutes = require('./routes/generate');
const pointsRoutes = require('./routes/points');
const historyRoutes = require('./routes/history');

const app = express();

// Middlewares احترافية
app.use(helmet()); 
app.use(cors());
app.use(express.json());

// ربط المسارات (Routes)
app.use('/api/generate', generateRoutes);
app.use('/api/points', pointsRoutes);
app.use('/api/history', historyRoutes);

// معالجة الأخطاء الشاملة
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'حدث خطأ ما في السيرفر!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 NexaVision Server running on port ${PORT}`);
});