// app/page.js

'use client';
import React from 'react';
import {redirectToTikTokAuth} from './redirect'





export default function TikTok() {
  return (
    <div>
      <h1>Authenticate with TikTok</h1>
      <button onClick={redirectToTikTokAuth}>Login with TikTok</button>
    </div>
  );
};
