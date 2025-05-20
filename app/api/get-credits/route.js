
export const maxDuration = 60; 

import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';
import clientPromise from '../../../lib/mongodb';



const responseheaders = {
    'Access-Control-Allow-Origin': 'https://www.youtube.com',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //'Access-Control-Allow-Credentials': 'true'
  }

export async function GET(request) {

    const headersList = headers();
    const authHeader = headersList.get('Authorization');
    console.log("token: "+authHeader)
    const token = authHeader.split(' ')[1];

    try {
        const userauth = jwt.verify(token, process.env.AUTH_SECRET);

        const mongoClient = await clientPromise;
        const db = mongoClient.db('Cluster1');
        const usersCollection = db.collection('users');
      

        const user = await usersCollection.findOne(
          { email: userauth.email },
          {
            projection: {
              credits: 1,
              freeCredits: 1,
              proPlan: 1,
              creatorPlan: 1
            },
          }
        );
    
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), {
              status: 404,
            });
        }
    
        if(new Date()>new Date(user.nextFreeCredits)) {
            console.log("free credits due");
            await usersCollection.updateOne(
                { email:  userauth.email },
                { $set: {freeCredits: 5, nextFreeCredits:new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)} },
                //{ upsert: true }
            );
        }
    
        return new Response(JSON.stringify(user), {
            status: 200,
            headers: responseheaders
        });
    } catch(err) {
        console.log("error: "+JSON.stringify(err))
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: responseheaders
        });
    }

  }

export function OPTIONS() {
return new Response(null, {
    status: 200,
    headers: responseheaders,
});
}


