
export const maxDuration = 60; 

import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';
import clientPromise from '../../../lib/mongodb';



const responseheaders = {
    'Access-Control-Allow-Origin': 'https://www.youtube.com',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //'Access-Control-Allow-Credentials': 'true'
  }

export async function POST(request) {
    const { captions, title } = await request.json();

    const headersList = headers();
    const authHeader = headersList.get('Authorization');
    console.log("token: "+authHeader)
    const token = authHeader.split(' ')[1];

    console.log("transcript: "+captions.substr(0, 100)+"...")

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
            headers: responseheaders
          });
        }

        console.log("user: "+JSON.stringify(user))
    

    
        let creditAmount = 1;
        let creditPayment = null;
       
        if (user.freeCredits!=null && user.freeCredits >= creditAmount) {
          creditPayment = { freeCredits: -1*creditAmount };
        } 
        /*else if (user.credits > 0) {
          creditPayment = { credits: -1 };
        }*/
        else if (user.proPlan?.credits >= creditAmount && (!user.creatorPlan || user.proPlan.stripeCurrentPeriodEnd <= user.creatorPlan.stripeCurrentPeriodEnd)) {
          creditPayment = { 'proPlan.credits': -1*creditAmount };
        }
        else if (user.creatorPlan?.credits >= creditAmount) {
          creditPayment = { 'creatorPlan.credits': -1*creditAmount };
        } 
        else if (user.proPlan?.credits >= creditAmount) {
          creditPayment = { 'proPlan.credits': -1*creditAmount };
        }
        else {
          return new Response(JSON.stringify({ message: 'Insufficient credits' }), {
            status: 403,
            headers: responseheaders
          });
        }
        console.log(creditPayment)
    
    
        const id = crypto.randomUUID();
    
        const updateResult = await usersCollection.updateOne(
            { email: userauth.email },
            {
                $inc: creditPayment
            },
            //{ upsert: true }
        );
    
          //console.log(updateResult)
          // return new Response(JSON.stringify({ message: 'balls' }), {
          //   status: 200,
          // });
        if (updateResult.modifiedCount === 0 && updateResult.upsertedCount === 0) {
            return new Response(JSON.stringify({ message: 'Update failed' }), {
                status: 500,
                headers: responseheaders
            });
        }
    

        const summary = await getSummaryFromOpenAI(title, captions);
        if (!summary) {
            return new Response(JSON.stringify({ message: 'Error getting summary' }), {
                status: 500,
                headers: responseheaders
            });
        }

        // const googleAuth = new GoogleAuth({
        //     credentials
        // });

        // const client = await googleAuth.getIdTokenClient('https://test-inline-250624456836.us-central1.run.app');
        // const response = await client.request({ url: 'https://test-inline-250624456836.us-central1.run.app', method: 'POST', data: {captions:} });


        //if(user) {
        //'Hello '+user.email+" "+
        return new Response(JSON.stringify({ message: summary}), {
            status: 200,
            headers: responseheaders
        });
        //}
    } catch(err) {
        console.log("error: "+JSON.stringify(err))
        return new Response(JSON.stringify({ message: 'Unauthorized' }), {
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



// Function to send a request to ChatGPT
async function getSummaryFromOpenAI(videoTitle, transcriptText) {

    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    };

    const body = JSON.stringify({
        model: "gpt-4o-mini",  // You can change this to other available models
        messages: [
            { role: "system", content: "You summarize YouTube video transcripts."},
            { role: "user", content: `The title of the video is: \"${videoTitle}\". Please summarize the following transcript and use emojis:\n${transcriptText}`} 
        ],
        // max_tokens: 550,
        // temperature: 0.7
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('An error occurred:', error.message);
        return null;
    }
}
