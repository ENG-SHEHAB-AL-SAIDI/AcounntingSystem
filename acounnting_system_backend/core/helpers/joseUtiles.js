'use strict';

const { EncryptJWT, jwtDecrypt } = require('jose');

const secretKey = Buffer.from(process.env.JWE_SECRET, 'base64');

async function issueToken(payload, expiresIn = '2h') {
  return new EncryptJWT(payload)
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .encrypt(secretKey);
}

async function verifyToken(token) {
  const { payload } = await jwtDecrypt(token, secretKey);
  return payload;
}

module.exports = {
  issueToken,
  verifyToken
};
