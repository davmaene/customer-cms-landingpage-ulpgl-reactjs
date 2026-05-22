require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const { seedDatabase } = require('./utils/seed');

const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/contents');
const miscRoutes = require('./routes/misc');
const cloudinaryRoutes = require('./routes/cloudinary');
const scheduleRoutes = require('./routes/schedules');

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/api', (req, res) => res.json({ status: 'ok', service: 'ulpgl-api' }));
app.get('/api/health', (req, res) => res.json({ status: 'healthy' }));

app.use('/api/auth', authRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/cloudinary', cloudinaryRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api', miscRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Erreur serveur' });
});

const PORT = process.env.PORT || 8001;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('[ SEED ] Database connected');
    await sequelize.sync({ alter: true });
    await seedDatabase();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port :`, PORT);
    });
  } catch (e) {
    console.error('[ SEED ] Startup error:', e);
    process.exit(1);
  }
}

start();
