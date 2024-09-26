const express = require('express');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const productController = require('./controllers/productController');
const cartRoutes = require('./routes/cartRoutes');
const logger = require('./utils/logger');

const app = express();
app.use(express.json());

productController.productEventEmitter.on('fileUploadStart', (fileName) => {
  logger(`File upload has started: ${fileName}`);
});

productController.productEventEmitter.on('fileUploadEnd', (fileName) => {
  logger(`File has been uploaded: ${fileName}`);
});

productController.productEventEmitter.on('fileUploadFailed', (errorMessage) => {
  logger(`Error occurred, file upload failed: ${errorMessage}`);
});

app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
