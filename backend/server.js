const dotenv = require('dotenv');
 const express = require('express');
const connectDB = require('./config/db');
const path = require('path');


dotenv.config();

connectDB();

const app = express();

const productRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});