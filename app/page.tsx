'use client';
import { useState } from 'react';

export default function Home() {
  const [q, setQ] = useState('');
  const [ans, setAns] = useState('');

  const ask = async () => {
    if (!q) return;
    try {
      const res = await fetch(`https://tripsense-plan.onrender.com/plan/ai?query=${encodeURIComponent(q)}`);
      const data = await res.json();
      setAns(data.story || 'No answer—try again!');
    } catch (error) {
      setAns('Error connecting—check backend.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>AI Jaipur Guide</h1>
      <input
        style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
        placeholder="Ask: Why is Hawa Mahal called the Palace of Winds?"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button onClick={ask} style={{ background: '#0070f3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Ask AI
      </button>
      {ans && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '5px', whiteSpace: 'pre-wrap' }}>
          <strong>AI Says:</strong><br /><br />
          {ans}
        </div>
      )}
    </div>
  );
}
