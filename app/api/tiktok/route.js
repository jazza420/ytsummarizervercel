export const maxDuration = 35; 



import { NextResponse } from 'next/server';
import { headers } from 'next/headers'
import { auth, signIn, signOut } from "@/auth";
import clientPromise from '../../../lib/mongodb';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code'); // Extract authorization code from query parameters
  console.log("code")  
  console.log(code);
  // Retrieve the code verifier from cookies

//   const headersList = headers()
// //   const sig2 = headersList.get('stripe-signature')

//   const cookies = headersList.get('cookie') || '';
// //   console.log(cookies)
//   const codeVerifier = cookies
//     .split(';')
//     .find(cookie => cookie.trim().startsWith('code_verifier='))
//     ?.split('=')[1];
//   const codeChallenge = cookies
//     .split(';')
//     .find(cookie => cookie.trim().startsWith('code_challenge='))
//     ?.split('=')[1];

//   console.log(codeVerifier);
//   console.log(codeVerifier);


//   if (!code || !codeVerifier) {
//     return NextResponse.json({ error: 'Missing code or code_verifier' }, { status: 400 });
//   }

  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const client = await clientPromise;
  const db = client.db('Cluster0');
  const usersCollection = db.collection('users');




  const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI;

  try {
    // Exchange authorization code for access token using fetch
    const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_key: clientKey,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        //code_verifier: codeVerifier,
        // code_challenge: codeChallenge,
        //state: "random_state_sstring"
      }),
    });

    // console.log(await response.json())

    if (!response.ok) {
      throw new Error(`Failed to exchange code for token: ${response.statusText}`);
    }

    const data = await response.json();

    console.log(data);
    console.log(JSON.stringify(data));

    const accessToken = data.access_token;
    console.log('Access Token:', accessToken);
    const refreshToken = data.refresh_token;
    console.log('Refresh Token:', refreshToken);

    const updateResult = await usersCollection.updateOne(
        { email: session.user.email },
        { 
            $set: { 
                tiktok_access_token: accessToken,
                tiktok_refresh_token: refreshToken // Add or update another field
            }
        },
        // { upsert: true }
    );


    
    // if (updateResult.modifiedCount === 0 && updateResult.upsertedCount === 0) {
    //     return new Response(JSON.stringify({ message: 'Update failed' }), {
    //         status: 500,
    //     });
    // }

    console.log("success")




    // const response3 = await fetch('https://open.tiktokapis.com/v2/post/publish/creator_info/query/', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${accessToken}`,
    //       'Content-Type': 'application/json; charset=UTF-8'
    //     }
    // })

    // if (!response3.ok) {
    //   throw new Error(`Failed to post video: ${response3.statusText} ${JSON.stringify(response3)}`);
    // }
  
    // const data3 = await response3.json();
    // console.log(data3);
    // console.log(JSON.stringify(data3));

    console.log("success2")



    // Store access token securely (e.g., in a secure session or database)
    return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL+'/dashboard'); // Replace with your own success page

  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return NextResponse.json(
      { error: 'An error occurred while exchanging the authorization code for an access token.' },
      { status: 500 }
    );
  }
}