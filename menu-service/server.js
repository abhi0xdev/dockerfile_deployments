const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Sample menu data
const menuItems = [
  { id: 1, name: 'Espresso', size: 'Single', price: 2.5 },
  { id: 2, name: 'Americano', size: 'Medium', price: 3.0 },
  { id: 3, name: 'Latte', size: 'Large', price: 4.0 },
  { id: 4, name: 'Cappuccino', size: 'Medium', price: 3.8 },
  { id: 5, name: 'Mocha', size: 'Large', price: 4.5 }
];

app.get('/menu', (req, res) => {
  res.json({
    status: 'success',
    data: menuItems
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Menu Service - Coffee Shop',
    endpoint: '/menu'
  });
});

app.listen(PORT, () => {
  console.log(`Menu service listening on port ${PORT}`);
});