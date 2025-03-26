/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
require('dotenv').config();
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');
// eslint-disable-next-line no-undef
const { AccessToken } = require('livekit-server-sdk');

const app = express();
app.use(cors({ origin: 'https://nhom6chieuthu4.vercel.app' }));
app.use(express.json());

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '971745314011-t9ndk0d6ur2gap1e3oc2kk434uhj9dmd.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Xác thực Google
app.post('/auth/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userInfo = {
      userId: payload['sub'],
      email: payload['email'],
      name: payload['name'],
    };
    res.status(200).json(userInfo);
  } catch (error) {
    console.error('Verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Sinh token cho LiveKit
app.post('/generate-token', (req, res) => {
  const { roomName, participantName } = req.body;

  const apiKey = process.env.LIVEKIT_API_KEY || 'APIBjBTpuXzura4'; 
  const apiSecret = process.env.LIVEKIT_API_SECRET || 'uvmexza3fhqieXMiG17F2TmyiJyQWpAt6IZK79aamOQB';

  const token = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
  });

  token.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  res.json({ token: token.toJwt() });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
