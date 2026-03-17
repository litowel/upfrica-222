import fetch from 'node-fetch';

async function testIdnormAuth() {
  const clientId = (process.env.IDNORM_CLIENT_ID || '').replace(/['"]/g, '').trim();
  const clientSecret = (process.env.IDNORM_CLIENT_SECRET || '').replace(/['"]/g, '').trim();
  
  console.log(`Testing Idnorm Auth...`);
  console.log(`Client ID length: ${clientId.length}`);
  console.log(`Client Secret length: ${clientSecret.length}`);

  if (!clientId || !clientSecret) {
    console.error("Missing credentials!");
    return;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  try {
    const response = await fetch('https://api.idnorm.com/v1/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
    
    const text = await response.text();
    console.log(`Response Body: ${text}`);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testIdnormAuth();
