
export const maxDuration = 35; 


//import { getServerSession } from 'next-auth';
import clientPromise from '../../../lib/mongodb';
import { getSession } from "next-auth/react";
//import { authOptions } from '../auth/[...nextauth]/route';
//import { getServerSession }  from "next-auth"
import { auth, signIn, signOut } from "@/auth";




export async function POST(request) {
    //const session = await getServerSession(authOptions);
  
    console.log("start time "+new Date());

    const { book_id, voice } = await request.json();

    const session = await auth();

    if (!session) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
        });
    }


    const client = await clientPromise;
    const db = client.db('Cluster1');
    const usersCollection = db.collection('users');
  
    const user = await usersCollection.findOne(
        { "email": session.user.email, "books.id": book_id }, 
        { 
            projection: {
                "books.$": 1, // Returns only the first matching book in the array
                credits: 1,
                freeCredits: 1,
                proPlan: 1,
                creatorPlan: 1
            }
        }
    );



    if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), {
            status: 404,
        });
    }


    console.log(JSON.stringify(user))



    let creditAmount = 3*user.books[0].chapters.length;
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


    // if(user.books[0].audioStatus) {
    //     return new Response(JSON.stringify({ message: 'Audio is already generating' }), {
    //         status: 401,
    //     });
    // }
    // return new Response(JSON.stringify({ message: 'lol' }), {
    //     status: 401,
    // });


    let fullText = user.books[0].title+".\n\n"
    user.books[0].chapters.forEach((item, index) => {
      if(user.books[0].chapters.length > 1)
        fullText+=item.title+".\n\n"
      fullText+=item.text+"\n\n"
    });

    let jobid = null;

    if(voice == "david") {
      jobid = await replicatePrediction("9db5a0f04c7aa8bfdd8b9bdf27e9b8fe74986fcf2e4e6343a2c17ac6506f2676", {
        text: fullText,
        modelName: "davidstyletts",
        style: "david4.wav",
      }, process.env.REPLICATE_WEBHOOK+"/api/webhooks?user="+user._id)
    }
    else if (voice == "walter") {
      jobid = await replicatePrediction("9db5a0f04c7aa8bfdd8b9bdf27e9b8fe74986fcf2e4e6343a2c17ac6506f2676", {
        text: fullText,
        modelName: "walter",
        style: "walter.wav",
      }, process.env.REPLICATE_WEBHOOK+"/api/webhooks?user="+user._id)      
    }
    else {
      jobid = await replicatePrediction("f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13", {
        text: fullText,
        speed: 1,
        voice: voice
      }, process.env.REPLICATE_WEBHOOK+"/api/webhooks?user="+user._id)
    }




    console.log("finished job request"+new Date());


    if(jobid) {
      const updateResult = await usersCollection.updateOne(
        { "email": session.user.email, "books.id": book_id},
        { "$set": { "books.$.audioStatus": "generating", "books.$.audioJobId": jobid, "books.$.voice":voice,  "books.$.audioCreated": new Date(), "books.$.audiolink": null}, $inc: creditPayment},
      );

      //console.log(updateResult)
  
      if (updateResult.modifiedCount === 0 && updateResult.upsertedCount === 0) {
        return new Response(JSON.stringify({ message: 'Update failed' }), {
          status: 500,
        });
      }
  
      console.log("finished everything "+new Date());
      return new Response(JSON.stringify({ message: 'Your audio has started generating!', video: jobid }), {
        status: 200,
      });
    }
    
    return new Response(JSON.stringify({ message: 'Video Generation Failed.' }), {
      status: 500,
    });
    
}



async function replicatePrediction(version, input, webhook) {
  const replicateUrl = `https://api.replicate.com/v1/predictions`;
  //const replicateUrl = `https://api.replicate.com/v1/deployments/jazza420/f5df/predictions`;
  const headers = {
    'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`, // Set this in your .env.local file
    'Content-Type': 'application/json',
  };

  try {
    // Step 1: Create the prediction request
    const predictionResponse = await fetch(replicateUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({  version: version, input: input, webhook: webhook, webhook_events_filter: ["completed"] }),
    });
    // version: version,
    // webhook_events_filter: ["completed"]

    if (!predictionResponse.ok) {
      const errorData = await predictionResponse.json();
      throw new Error(errorData.detail || 'Error creating prediction');
    }

    const prediction = await predictionResponse.json();
    console.log(prediction.id)
    return prediction.id+""
  } catch (error) {
    console.error(error)
    return null;
  }
}



