    


    
import clientPromise from '../../../lib/mongodb';
import { auth, signIn, signOut } from "@/auth";

import { NextResponse } from 'next/server';

const query_creator_info = async (token) => {
    return await fetch('https://open.tiktokapis.com/v2/post/publish/creator_info/query/', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8'
        }
    })
}



export async function GET(req) {

  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const client = await clientPromise;
  const db = client.db('Cluster0');
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({ email: session.user.email });

  
  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), {
      status: 404,
    });
  }

  const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;

  try {

    if(user.tiktok_access_token) {

        const response3 = await query_creator_info(user.tiktok_access_token)


        //refresh token
        if (!response3.ok) {
          //throw new Error(`Failed to query creator info: ${response3.statusText} ${JSON.stringify(response3)}`);
          const response4 = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cache-Control': 'no-cache'
            },
            body: new URLSearchParams({
              client_key: clientKey,
              client_secret: clientSecret,
              grant_type: 'refresh_token',
              refresh_token: user.tiktok_refresh_token

            }),
          });
          if (!response4.ok) {
            throw new Error(`Failed to refresh token: ${response4.statusText} `);
          }
          const data4 = await response4.json();
          console.log(JSON.stringify(data4))
          if (data4.access_token) {
            const updateResult = await usersCollection.updateOne(
                { email: session.user.email },
                { 
                    $set: { 
                        tiktok_access_token: data4.access_token,
                        tiktok_refresh_token: data4.refresh_token
                    }
                },
                // { upsert: true }
            );

            const response5 = await query_creator_info(data4.access_token);
            if (!response5.ok) {
                throw new Error(`Failed to query after refreshing: ${response5.statusText} `);
            }
            const data5 = await response5.json();
            console.log(JSON.stringify(data5));
            return new Response(JSON.stringify(data5), {
                status: 200,
            });
          }
          else {
            throw new Error(`Failed to refresh token: ${response4.statusText} ${JSON.stringify(data4)}`);
          }

        }
    
        const data3 = await response3.json();
        console.log(data3);
        console.log(JSON.stringify(data3));

        return new Response(JSON.stringify(data3), {
            status: 200,
        });
    }

    return new Response(JSON.stringify({error: 'creator query failed'}), {
        status: 400,
    });

  } catch (error) {
      console.error('Error querying creator:', error);
      return NextResponse.json(
      { error: 'creator query failed' },
      { status: 500 }
      );
  }
}