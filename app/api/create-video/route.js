
export const maxDuration = 35; 


//import { getServerSession } from 'next-auth';
import clientPromise from '../../../lib/mongodb';
import { getSession } from "next-auth/react";
//import { authOptions } from '../auth/[...nextauth]/route';
//import { getServerSession }  from "next-auth"
import { auth, signIn, signOut } from "@/auth";






function create_prompt(topic, length) {
  // Be aware that the AI image generator can only see one prompt at a time so you must provide all context in every prompt. Attempt to maintain character consistency over every image. #The AI image generator's context is limited to only a single prompt so a lot of details must be reiterated over and over again.
const main_prompt = 
`Come up with an engaging script for an interesting, unique, captivating, non-generic, relatively unknown and true tiktok related to the following topic: ${topic}.\nThe topic shouldn't be too vague. Include prompts that will be sent to an AI image generator that use a realistic and very cinematic style. Make sure to provide all the CONTEXT needed for each of the images and be extremely descriptive with the images and make sure to stress the desired style extremely hard. Any numbers mentioned should be written as words. The video should go for around ${length} seconds long and no more than that.
Use the EXACT format, DO NOT deviate from this format under any circumstances:

Topic: <topic>

Image: <detailed prompt>
Narrator: <intro>

Image: <detailed prompt>
Narrator: <sentence>

Image: <detailed prompt>
Narrator: <sentence>

...

Image: <detailed prompt>
Narrator: <very short outro>
`
return main_prompt
}





function create_prompt2(topic, length) {

const main_prompt = 
`Come up with an engaging script for an interesting, unique, captivating, non-generic, relatively unknown and true tiktok related to the following topic: ${topic}.\nThe topic shouldn't be too vague. Any numbers mentioned should be comma seperated. The video should go for around ${length} seconds long and no more than that.
Use the EXACT format, DO NOT deviate from this format under any circumstances:

Topic: <topic>

Narrator: <intro>

Narrator: <sentence>

Narrator: <sentence>

...

Narrator: <very short outro>
`
return main_prompt
}






function create_prompt3(script, line) {

const script2 = script.substring(script.indexOf("Topic:"));

const main_prompt = 
`${script2}

Based on the above script create a detailed prompt for an AI image Generator for the line: ${line}
Make sure to include all context in the prompt. The Image style should be realistic and very cinematic. The prompt should be a small paragraph and not overly complex. Avoid prompts for images that contain text.
Respond with the detailed image description and NOTHING ELSE.

`

console.log(line)
return main_prompt
}






async function getSuggestedDescription(script) {
  let prompt = "Script for a tiktok video: \n"+script+"\n\nBased on the above script for a tiktok video suggest a good description including hashtags for the video. Keep it short. Only respond with the suggested description and nothing else.\n\nSuggested Description:"
  return await chatGPTRequest(prompt);
}







export async function POST(request) {
  //const session = await getServerSession(authOptions);

  console.log("start time "+new Date());

  const { topic, voice, length, music } = await request.json();
  console.log(topic);
  console.log(voice);
  console.log(music);

  // return new Response(JSON.stringify({ message: 'Unauthorized' }), {
  //   status: 401,
  // });
  // if (voice >=10) {
  //   return new Response(JSON.stringify({ message: 'Invalid voice chosen' }), {
  //     status: 404,
  //   });
  // }



  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const client = await clientPromise;
  const db = client.db('Cluster0');
  const usersCollection = db.collection('users');

  const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);

  const user = await usersCollection.findOne(
    { email: session.user.email },
    {
      projection: {
        videos: {
          $filter: {
            input: "$videos",
            as: "video",
            cond: { $gte: ["$$video.createdAt", threeMinutesAgo] },
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




  const recentVideosCount = user.videos ? user.videos.length : 0;

  if (recentVideosCount >= 1+(user.proPlan?.subscriptionStatus == "active" ? 4 : 0)) {
    console.log('You are generating too many videos at once!');
    return new Response(JSON.stringify({ message: 'You are generating too many videos at once!'}), {
      status: 403,
    });
  }

  console.log("got user info "+new Date());

  let prompt = create_prompt2(topic, length);
  let script = await chatGPTRequest(prompt);



  if(!script) {
    return new Response(JSON.stringify({ message: 'Sorry but something went wrong. Try again later.' }), {
      status: 400,
    });
  }

  if(!script.toLowerCase().includes("narrator:")) {
    return new Response(JSON.stringify({ message: 'Sorry but I was unable to generate a video about that.' }), {
      status: 400,
    });
  }


  //var newscript = ""

  var lines = script.replace(/\*\*/g, '').split("\n");
  // // console.log(lines)
  // for (let item2 of lines) {
  //   // console.log(item2.replace(/"/g, "") + "\r\n")

  //   if(item2.toLowerCase().startsWith("narrator:"))
  //     newscript += "Image: "+await chatGPTRequest(create_prompt3(script, item2.replace(/"/g, "").replace(/Narrator: /g, "")))+"\n"; 

  //   newscript+=item2+"\n"
  // }

  // console.log(newscript);
  // return new Response(JSON.stringify({ message: 'stopped' }), {
  //   status: 400,
  // });
  let [description, newscript] = await Promise.all([
    getSuggestedDescription(script),
    Promise.all(lines.map(async (line) => {
      if (line.toLowerCase().startsWith("narrator:")) {
        // Replace and process the narrator lines asynchronously
        let imagePrompt = create_prompt3(script, line.replace(/"/g, "").replace(/Narrator: /g, ""));
        let imageResponse = await chatGPTRequest(imagePrompt);
        return `Image: ${imageResponse}\n${line}\n`; // Include image and line
      }
      return line + "\n"; // Return the line if no narrator part
    }))
  ]
  );
  
  // After processing all lines, log the final script
  newscript = newscript.join(""); // Join all lines back into a single string
  console.log(newscript);

  //let description = await getSuggestedDescription(script);

  // let [script, description] = await Promise.all([
  //   chatGPTRequest(prompt),
  //   getSuggestedDescription(script)
  // ]);

  //console.log(script);

  console.log("finished chatgpt requests "+new Date());


  

  let video = await generateVideo(newscript, session.user.email, voice, music);
  console.log("finished create video job "+new Date());

  if(video) {
    const updateResult = await usersCollection.updateOne(
      { email: session.user.email },
      {
        $inc: creditPayment,
        $push: {
            videos: {
              title: topic, // Replace with actual product details
              script: newscript,
              description: description,
              id: video,
              video_link: null,
              createdAt: new Date(),
              voice: voice,
              length: length,
              music: music,
              thumbnail: null
            },
          },
      },
      { upsert: true }
    );

    if (updateResult.modifiedCount === 0 && updateResult.upsertedCount === 0) {
      return new Response(JSON.stringify({ message: 'Update failed' }), {
        status: 500,
      });
    }

    console.log("finished everything "+new Date());
    return new Response(JSON.stringify({ message: 'Your video has started rendering, it should be ready in a couple minutes!', video: video }), {
      status: 200,
    });

    
  }
  

  return new Response(JSON.stringify({ message: 'Video Generation Failed.' }), {
    status: 500,
  });
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











async function generateVideo(script, user, voice, music) {

  const your_api_key = process.env.RUNPOD_API_KEY; // Ensure you set this environment variable in Vercel
  //const endpoint_id = "sdxl";
  const endpoint_id = "3eu0lek2nvefce";

  // The URL should be updated with your endpoint_id
  const url = `https://api.runpod.ai/v2/${endpoint_id}/run`;

  // Headers
  const headers = {
    "accept": "application/json",
    "authorization": your_api_key,
    "content-type": "application/json",
  };

  //Data payload
  const data = {
      "input": {
          "script": script,
          "user": user,
          "voice": voice,
          "image_generator": "flux",
          "music": music
      }
  }

  try {
    // Make the POST request
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();
    console.log(JSON.stringify(jsonResponse));

    if (response.ok) {
      return jsonResponse.id;
    } else {
      console.log(JSON.stringify({ error: 'Error generating video', details: jsonResponse }));
      return null;
    }
  } catch (error) {
    console.error(JSON.stringify({ error: 'Internal server error', details: error.message }), error);
    return null;
  }
}