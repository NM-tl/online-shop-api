const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const EventEmitter = require('events');
const { sendResponse } = require('../utils/responseHandler');

const productEventEmitter = new EventEmitter();
const productsFilePath = path.join(__dirname, '../models/products.store.json');

const readProducts = () => {
    if (!fs.existsSync(productsFilePath)) {
        return [];
    }
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

const writeProducts = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

exports.getAllProducts = (req, res) => {
    const products = readProducts();
    sendResponse(res, 200, products);
};

exports.getProductById = (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === req.params.productId);
    if (!product) {
        return sendResponse(res, 404, 'Product not found');
    }
    sendResponse(res, 200, product);
};

exports.createProduct = (req, res) => {
    const { name, description, price } = req.body;
    const products = readProducts();
    const newProduct = {
        id: uuidv4(),
        name,
        description,
        price,
        images: [],
        videos: [],
        previews: [],
    };

    products.push(newProduct);
    writeProducts(products);
    sendResponse(res, 201, 'Product created successfully', newProduct);
};

exports.uploadImage = (req, res) => {
    const productId = req.params.productId;
    const file = req.file;
    console.log('Uploaded File:', file);

    if (!file) {
        return sendResponse(res, 400, 'No file uploaded');
    }

    const products = readProducts();
    const product = products.find(p => p.id === productId);

    if (!product) {
        return sendResponse(res, 404, 'Product not found');
    }

    const imagePath = path.join(__dirname, '../uploads/images', file.filename);
    const previewPath = path.join(__dirname, '../uploads/images/previews', `preview-${file.filename}`);

    product.images.push(file.filename);
    
    productEventEmitter.emit('fileUploadStart', file.filename);

    console.log('Image Path:', imagePath);
    console.log('Preview Path:', previewPath);

    sharp(imagePath)
    .resize(150)
    .toFile(previewPath)
    .then(() => {
        product.previews.push(`preview-${file.filename}`);
        writeProducts(products);
        productEventEmitter.emit('fileUploadEnd', file.filename);
        sendResponse(res, 201, 'Image uploaded successfully', { fileName: file.filename });
    })
    .catch(err => {
        console.error('Error processing image with Sharp:', err);
        productEventEmitter.emit('fileUploadFailed', err.message);
        sendResponse(res, 500, 'Failed to upload image');
    });

};

exports.uploadVideo = (req, res) => {
    const productId = req.params.productId;
    const file = req.file;

    if (!file) {
        return sendResponse(res, 400, 'No file uploaded');
    }

    const products = readProducts();
    const product = products.find(p => p.id === productId);

    if (!product) {
        return sendResponse(res, 404, 'Product not found');
    }

    product.videos.push(file.filename);
    writeProducts(products);
    productEventEmitter.emit('fileUploadEnd', file.filename);
    sendResponse(res, 201, 'Video uploaded successfully', { fileName: file.filename });
};

exports.getImage = (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../uploads/images', fileName);

    res.sendFile(filePath, err => {
        if (err) {
            sendResponse(res, 404, 'Image not found');
        }
    });
};

exports.getVideo = (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../uploads/videos', fileName);

    res.sendFile(filePath, err => {
        if (err) {
            sendResponse(res, 404, 'Video not found');
        }
    });
};

exports.productEventEmitter = productEventEmitter;
