import React, { useState } from 'react';

const inputStyle = {
  padding: '6px 8px',
  borderRadius: '6px',
  border: 'none',
  marginBottom: '8px',
  width: '100%'
};

const textareaStyle = {
  ...inputStyle,
  minHeight: '60px',
  resize: 'vertical'
};

export default function OrderForm() {
  const [userId, setUserId] = useState('101');
  const [itemsText, setItemsText] = useState('1x2, 3x1');
  const [notes, setNotes] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const parseItems = () => {
    // format: "1x2, 3x1" => [{menuItemId:1, quantity:2}, ...]
    return itemsText
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((pair) => {
        const [idStr, qtyStr] = pair.toLowerCase().split('x');
        return {
          menuItemId: Number(idStr),
          quantity: Number(qtyStr || 1)
        };
      })
      .filter((it) => !Number.isNaN(it.menuItemId) && !Number.isNaN(it.quantity));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const items = parseItems();
      const res = await fetch('http://localhost:5002/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: Number(userId),
          items,
          notes
        })
      });

      const data = await res.json();
      setResponse({ status: res.status, body: data });
    } catch (err) {
      setResponse({ status: 0, body: { error: 'Request failed' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <div>User ID</div>
          <input
            style={inputStyle}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="101"
          />
        </label>

        <label>
          <div>Items (e.g. 1x2, 3x1)</div>
          <input
            style={inputStyle}
            value={itemsText}
            onChange={(e) => setItemsText(e.target.value)}
            placeholder="menuItemId x quantity"
          />
        </label>

        <label>
          <div>Notes</div>
          <textarea
            style={textareaStyle}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Extra hot, no sugar..."
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '8px 12px', borderRadius: 6, marginTop: 4 }}
        >
          {loading ? 'Placing...' : 'Place Order'}
        </button>
      </form>

      {response && (
        <pre
          style={{
            marginTop: 12,
            padding: 10,
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderRadius: 8,
            fontSize: 12,
            overflowX: 'auto'
          }}
        >
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}