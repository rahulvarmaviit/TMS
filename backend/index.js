const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const hrRoutes = require('./routes/hr');
const employeeRoutes = require('./routes/employee');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/employee', employeeRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ' + err));

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});