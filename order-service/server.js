const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());

// Simple in-memory store for demo purposes
let orders = [];
let currentOrderId = 1;

app.post('/order', (req, res) => {
  const { userId, items, notes } = req.body;

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid order payload. Expected userId and non-empty items array.'
    });
  }

  const newOrder = {
    id: currentOrderId++,
    userId,
    items,
    notes: notes || '',
    status: 'received',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);

  res.status(201).json({
    status: 'success',
    message: 'Order received successfully.',
    order: newOrder
  });
});

// Extra endpoint to view all orders for testing
app.get('/orders', (req, res) => {
  res.json({
    status: 'success',
    data: orders
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Order Service - Coffee Shop',
    endpoint: '/order'
  });
});

app.listen(PORT, () => {
  console.log(`Order service listening on port ${PORT}`);
});