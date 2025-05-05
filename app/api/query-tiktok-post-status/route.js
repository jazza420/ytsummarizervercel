    


    
import clientPromise from '../../../lib/mongodb';
import { auth, signIn, signOut } from "@/auth";
import { NextResponse } from 'next/server';


export async function POST(req) {

  const { publish_id } = await req.json();

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

  try {

    if(user.tiktok_access_token) {

        const response3 = await fetch('https://open.tiktokapis.com/v2/post/publish/status/fetch/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${user.tiktok_access_token}`,
              'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
              "publish_id": publish_id
            })
        })

        if (!response3.ok) {
          throw new Error(`Failed to query tiktok post: ${response3.statusText} ${JSON.stringify(response3)}`);
        }
    
        const data3 = await response3.json();
        console.log(data3);
        console.log(JSON.stringify(data3));


        return new Response(JSON.stringify(data3), {
            status: 200,
        });
    }

    return new Response(JSON.stringify({error: 'tiktok post query failed'}), {
        status: 400,
    });

  } catch (error) {
      console.error('Error querying creator:', error);
      return NextResponse.json(
      { error: 'tiktok post query failed' },
      { status: 500 }
      );
  }
}