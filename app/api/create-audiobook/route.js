
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

    const { topic, character, text, format, gameplay } = await request.json();

    const session = await auth();

    if (!session) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
        });
    }


    const client = await clientPromise;
    const db = client.db('Cluster1');
    const usersCollection = db.collection('users');
  
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
  
    const user = await usersCollection.findOne(
      { email: session.user.email },
      {
        projection: {
          audios: {
            $filter: {
              input: "$audios",
              as: "audios",
              cond: { $gte: ["$$audios.createdAt", threeMinutesAgo] },
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
    let creditPayment = null;
   
    if (user.freeCredits!=null && user.freeCredits > 0) {
      creditPayment = { freeCredits: -1 };
    } 
    /*else if (user.credits > 0) {
      creditPayment = { credits: -1 };
    }*/
    else if (user.proPlan?.credits > 0 && (!user.creatorPlan || user.proPlan.stripeCurrentPeriodEnd <= user.creatorPlan.stripeCurrentPeriodEnd)) {
      creditPayment = { 'proPlan.credits': -1 };
    }
    else if (user.creatorPlan?.credits > 0) {
      creditPayment = { 'creatorPlan.credits': -1 };
    } 
    else if (user.proPlan?.credits > 0) {
      creditPayment = { 'proPlan.credits': -1 };
    }
    else {
      return new Response(JSON.stringify({ message: 'Insufficient credits' }), {
        status: 403,
      });
    }
  
    console.log(creditPayment)
  
  
  
  
    // const recentVideosCount = user.videos ? user.videos.length : 0;
  
    // if (recentVideosCount >= 1+(user.proPlan?.subscriptionStatus == "active" ? 4 : 0)) {
    //   console.log('You are generating too many videos at once!');
    //   return new Response(JSON.stringify({ message: 'You are generating too many videos at once!'}), {
    //     status: 403,
    //   });
    // }
  
    //console.log("got user info "+new Date());
  
    let prompt = create_prompt(topic);
    let script = text != null ? text : await chatGPTRequest(prompt);
  
    console.log(script)
    console.log(character)

    //script = null;
  
    if(!script) {
      return new Response(JSON.stringify({ message: 'Sorry but something went wrong. Try again later.' }), {
        status: 400,
      });
    }


    // let jobid = await replicatePrediction("dfdf537ba482b029e0a761699e6f55e9162cfd159270bfe0e44857caa5f275a6", {
    //     text: script,
    //     speed: 0.95,
    //     voice: "am_adam"
    // }, "https://8530-101-188-2-124.ngrok-free.app/api/webhooks?user="+user._id)

    let jobid = await replicatePrediction("d1f604109d058f66debfd3730940aa8747374a5dfa350e8c721021b8b1c77140", {
        text: script,
        voice: character,//["rogan", "neil", "goggins", "elon", "trump", "kanye", "dr_phil", "mr_beast", "shapiro"][Math.floor(Math.random() * 9)],
        format: format,
        gameplay: gameplay
    }, "https://d2a5-101-188-2-124.ngrok-free.app/api/webhooks")

    //let jobid = 5


    console.log("finished job request"+new Date());


    if(jobid) {
      const updateResult = await usersCollection.updateOne(
        { email: session.user.email },
        {
          $inc: creditPayment,
          $push: {
              audios: {
                title: topic, // Replace with actual product details
                script: script,
                character:  character,
                //description: description,
                id: jobid,
                link: null,
                createdAt: new Date(),
              },
            },
        },
        { upsert: true }
      );

      //console.log(updateResult)
  
      if (updateResult.modifiedCount === 0 && updateResult.upsertedCount === 0) {
        return new Response(JSON.stringify({ message: 'Update failed' }), {
          status: 500,
        });
      }
  
      console.log("finished everything "+new Date());
      return new Response(JSON.stringify({ message: 'Your job has started, it should be ready in a couple minutes!', video: jobid }), {
        status: 200,
      });
  
      
    }
    
  
    return new Response(JSON.stringify({ message: 'Video Generation Failed.' }), {
      status: 500,
    });


    

}






async function replicatePrediction(version, input, webhook) {
  //const replicateUrl = `https://api.replicate.com/v1/predictions`;
  const replicateUrl = `https://api.replicate.com/v1/deployments/jazza420/f5df/predictions`;
  const headers = {
    'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`, // Set this in your .env.local file
    'Content-Type': 'application/json',
  };

  try {
    // Step 1: Create the prediction request
    const predictionResponse = await fetch(replicateUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({  input: input, webhook: webhook, webhook_events_filter: ["completed"] }),
    });
    //version: version,
    //webhook_events_filter: ["completed"]

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





// Function to send a request to ChatGPT
async function chatGPTRequest(prompt) {


    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    };

    const body = JSON.stringify({
        model: "gpt-4o-mini",  // You can change this to other available models
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
        ]
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






function create_prompt(topic) {

    const main_prompt = 
    `A small paragraph on: ${topic}
    `
    return main_prompt
}