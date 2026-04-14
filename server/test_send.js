const fetch = require('node-fetch');

async function test() {
  const payload = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'Hello, this is a test message from Antigravity!',
    website: '' // Empty honeypot
  };

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response Body:', data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
