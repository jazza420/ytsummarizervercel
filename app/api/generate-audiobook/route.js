import { GoogleAuth } from 'google-auth-library';
import clientPromise from '../../../lib/mongodb';
import { auth, signIn, signOut } from "@/auth";


const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64, 'base64').toString()
);


export async function POST(request) {


    console.log("start time "+new Date());

    const { topic, voice, length } = await request.json();

    // const topic = "Homo Erectus";
    // const voice = "bm_lewis";

    const session = await auth();

    if (!session) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
        });
    }


    const mongoClient = await clientPromise;
    const db = mongoClient.db('Cluster1');
    const usersCollection = db.collection('users');
  
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
  
    const user = await usersCollection.findOne(
      { email: session.user.email },
      {
        projection: {
          books: {
            $filter: {
              input: "$books",
              as: "books",
              cond: { $gte: ["$$books.createdAt", threeMinutesAgo] },
            },
          },
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

  
    console.log("user: "+JSON.stringify(user))




    if(user.proPlan?.subscriptionStatus !== 'active' && length > 20) {
        return new Response(JSON.stringify({ message: 'Your plan does not support audiobooks longer than 10 minutes.' }), {
            status: 403,
        });
    }




    let creditAmount = 1+Math.floor(length/12);
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
      });
    }

    console.log(creditPayment)






    const id = crypto.randomUUID();

    const updateResult = await usersCollection.updateOne(
        { email: session.user.email },
        {
          $inc: creditPayment,
          $push: {
              books: {
                title: topic,
                chapters: [],
                voice: voice,
                length: length,
                //description: description,
                status: "generating",
                createdAt: new Date(),
                id: id,
              },
            },
        },
        { upsert: true }
      );

      //console.log(updateResult)
      // return new Response(JSON.stringify({ message: 'balls' }), {
      //   status: 200,
      // });
    if (updateResult.modifiedCount === 0 && updateResult.upsertedCount === 0) {
        return new Response(JSON.stringify({ message: 'Update failed' }), {
            status: 500,
        });
    }


    const googleAuth = new GoogleAuth({
        credentials
    });

    const client = await googleAuth.getIdTokenClient('https://test-inline-250624456836.us-central1.run.app');
    const response = await client.request({ url: 'https://test-inline-250624456836.us-central1.run.app', method: 'POST', data: {user: session.user.email, id: id, topic:topic, voice: voice, length: length} });

    // return new Response(JSON.stringify(response.data), {
    //     status: 200,
    // });
    return new Response(JSON.stringify({ message: 'Your Audiobook has started generating.', id: id }), {
      status: 200,
    });

}