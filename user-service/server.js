const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

// Sample user data
const sampleUser = {
  id: 101,
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  loyaltyPoints: 120,
  favoriteDrinks: ['Latte', 'Cappuccino'],
  memberSince: '2022-05-10'
};

app.get('/user', (req, res) => {
  res.json({
    status: 'success',
    data: sampleUser
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'User Service - Coffee Shop',
    endpoint: '/user'
  });
});

app.listen(PORT, () => {
  console.log(`User service listening on port ${PORT}`);
});