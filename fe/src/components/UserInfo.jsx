import React, { useEffect, useState } from 'react';

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = import.meta.env.VITE_USER_API;
      const data = await fetch(res).then(res => res.json());
      setUser(data.data || null);
    } catch (err) {
      setError('Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <button onClick={fetchUser} disabled={loading} style={{ padding: '6px 10px', borderRadius: 6 }}>
        {loading ? 'Loading...' : 'Refresh User'}
      </button>

      {error && <p style={{ color: '#ffb3b3', marginTop: 8 }}>{error}</p>}

      {user && (
        <div style={{ marginTop: 12 }}>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Loyalty Points:</strong> {user.loyaltyPoints}
          </p>
          <p>
            <strong>Favorites:</strong> {user.favoriteDrinks.join(', ')}
          </p>
          <p>
            <strong>Member Since:</strong> {user.memberSince}
          </p>
        </div>
      )}
    </div>
  );
}