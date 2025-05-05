


// Generate a random code verifier
function generateCodeVerifier(length = 30) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return base64UrlEncode(array);
  }
  
  // Base64 URL encode a byte array
  function base64UrlEncode(array) {
    return btoa(String.fromCharCode.apply(null, array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  
  // Generate the code challenge from code verifier
  async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return base64UrlEncode(new Uint8Array(digest));
  }
  
  

export async function redirectToTikTokAuth() {
    const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY;
    const redirectUri = process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI;
    //const state = 'random_state_sstring'; // Replace with a unique state string for CSRF protection
    const codeVerifier = generateCodeVerifier(); // Generate a code verifier
    document.cookie = `code_verifier=${codeVerifier}; path=/; secure; SameSite=Lax;`; // Store code verifier in a secure cookie
  
    //const codeChallenge = await generateCodeChallenge(codeVerifier); // Generate a code challenge
    
    // document.cookie = `code_challenge=${codeChallenge}; path=/; secure; SameSite=Lax;`;
    // TikTok OAuth 2.0 Authorization URL
    const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=user.info.basic,video.publish&state=${codeVerifier}`;
    //&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256
  
    // Redirect user to TikTok for authorization
    window.location.href = authUrl;
  };