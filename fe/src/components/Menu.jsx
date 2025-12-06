import React, { useEffect, useState } from 'react';

const listStyle = {
  listStyle: 'none',
  padding: 0,
  marginTop: '12px'
};

const itemStyle = {
  padding: '8px 10px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255,255,255,0.06)',
  marginBottom: '6px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = import.meta.env.VITE_MENU_API;
      const data = await fetch(res).then(res => res.json());
      setMenu(data.data || []);
    } catch (err) {
      setError('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div>
      <button onClick={fetchMenu} disabled={loading} style={{ padding: '6px 10px', borderRadius: 6 }}>
        {loading ? 'Loading...' : 'Refresh Menu'}
      </button>
      {error && <p style={{ color: '#ffb3b3', marginTop: 8 }}>{error}</p>}
      <ul style={listStyle}>
        {menu.map((item) => (
          <li key={item.id} style={itemStyle}>
            <span>
              {item.name} ({item.size})
            </span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}