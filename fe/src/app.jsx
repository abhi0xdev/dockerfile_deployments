import React from 'react';
import Menu from './components/Menu';
import OrderForm from './components/OrderForm';
import UserInfo from './components/UserInfo';

const appStyle = {
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #2c3e50, #4b79a1)',
  color: '#f9f9f9',
  padding: '32px'
};

const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
  marginTop: '24px'
};

const cardStyle = {
  backgroundColor: 'rgba(0,0,0,0.25)',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
  backdropFilter: 'blur(10px)'
};

export default function App() {
  return (
    <div style={appStyle}>
      <h1 style={{ margin: 0, fontSize: '32px' }}>☕ Coffee Shop Dashboard</h1>
      <p style={{ marginTop: '8px', opacity: 0.85 }}>
        React frontend talking to 3 separate Node.js microservices.
      </p>

      <div style={cardGridStyle}>
        <div style={cardStyle}>
          <h2>Menu Service (GET /menu)</h2>
          <Menu />
        </div>

        <div style={cardStyle}>
          <h2>Order Service (POST /order)</h2>
          <OrderForm />
        </div>

        <div style={cardStyle}>
          <h2>User Service (GET /user)</h2>
          <UserInfo />
        </div>
      </div>
    </div>
  );
}