import fetch from "node-fetch";
import { Readable } from "stream";
import FormData from "form-data";
import AWS from 'aws-sdk';
const openaiApiKey = process.env.OPENAI_API_KEY;







function create_prompt(title) {
const main_prompt = `Create a json template for a full length novel with a lengthy summary of each chapter (a few paragraphs) and contains the most important details, this will be used to create the full chapter. There should be at least 12 chapters. The topic of the book will be: ${title}.
The JSON should be in this exact format: {"title":"<title>", "chapters": [{"chapter_title": "<chapter_title>", "summary":"<a lengthy summary of the chapter.>"}]}
Only respond with the RAW JSON.
`
return main_prompt
}









export async function GET(req) {
  
//   const novel_info = JSON.parse((await chatGPTRequest(create_prompt("The Cambrian Explosion"))).replace(/```json/g, "").replace(/```/g, ""))

//   const novel_info_string = JSON.stringify(novel_info)

  

// //   return new Response(JSON.stringify(novel_info), {
// //     status: 200,
// //   });
//   // Create batch requests dynamically
// //   const batchData = [
// //     {
// //       custom_id: "request-1",
// //       method: "POST",
// //       url: "/v1/chat/completions",
// //       body: {
// //         model: "gpt-4o",
// //         messages: [{ role: "user", content: "Hello, how are you?" }],
// //       },
// //     }
// //   ];

//   const batchData = novel_info["chapters"].map((v, i, a) => {
//     return {
//         custom_id: ""+i,
//         method: "POST",
//         url: "/v1/chat/completions",
        
//         body: {
//             model: "gpt-4o-mini",
//             //max_completion_tokens: 2000,
//             messages: [{ role: "user", content: `${novel_info_string}\n\nHere is a JSON template for a full length novel with lengthy summaries for each chapter. Based off the summary now provide the full length chapter for the chapter titled "${v['chapter_title']}". It should be AT LEAST 5000 words minimum. Only respond with the chapter and it should be 5000 words minimum.` }],
//         },
//     }
//   })

// //   return new Response(JSON.stringify(batchData), {
// //     status: 200,
// //   });

//   // Convert JSON array to a JSONL format in-memory
//   const jsonlString = batchData.map(JSON.stringify).join("\n");

//   // Convert string to a readable stream
//   const stream = new Readable();
//   stream.push(jsonlString);
//   stream.push(null);

//   // Create a FormData object and append the stream
//   const formData = new FormData();
//   formData.append("purpose", "batch");
//   formData.append("file", stream, { filename: "batch.jsonl", contentType: "application/json" });

//   // Upload file to OpenAI
//   const response = await fetch("https://api.openai.com/v1/files", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${openaiApiKey}`,
//     },
//     body: formData,
//   });

//   const result = await response.json();
//   console.log("File uploaded:", result);
//   //return result.id; // Returns file ID for batch processing



//   const response2 = await fetch('https://api.openai.com/v1/batches', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${openaiApiKey}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       endpoint: '/v1/chat/completions',
//       input_file_id: result.id,
//       completion_window: '24h'
//     })
//   });

//   const createdBatchData = await response2.json();
//   console.log("batch result: ",createdBatchData)
//   const batchId = createdBatchData.id;

//   return new Response(JSON.stringify({result:batchId}), {
//     status: 200,
//   });

  // const batchId = 'batch_67a737c948748190b352b9c07028b59d'

  // //const batchId = 'batch_67a7362945508190a05fba4e68c1e2d1'

  // const response3 = await fetch(`https://api.openai.com/v1/batches/${batchId}`, {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': `Bearer ${openaiApiKey}`
  //   }
  // });
  
  // const statusData = await response3.json();
  // console.log("batch status: ", statusData)
  // const status = statusData.status; 

  // if(status === 'completed') {
  //   const outputFileId = statusData.output_file_id;
  //   const errorFileId = statusData.error_file_id;

  //   const outputResponse = await fetch(`https://api.openai.com/v1/files/${outputFileId}/content`, {
  //   method: 'GET',
  //   headers: {
  //       'Authorization': `Bearer ${openaiApiKey}`
  //   }
  //   });

  //   const outputContent = await outputResponse.text();
  //   // Process the output content as needed

  //   return new Response(outputContent, {
  //       status: 200,
  //   });
  // }


  // return new Response(JSON.stringify({result:status}), {
  //   status: 200,
  // });



  // Configure AWS SDK with credentials
  const lambda = new AWS.Lambda({
      region: "us-east-1", // Change to your Lambda region
      accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Replace with your access key
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY // Replace with your secret key
  });

  async function invokeLambda(wavUrl) {
      const params = {
          FunctionName: "copyaudiotobucket", // Replace with your Lambda function name
          InvocationType: "Event", // Can be "Event" for async execution
          Payload: JSON.stringify({ wav_url: wavUrl })
      };

      try {
          const response = await lambda.invoke(params).promise();
          console.log("Lambda Response:", response.StatusCode);
      } catch (error) {
          console.error("Error invoking Lambda:", error);
      }
  }

  // Example Usage
  let r = await invokeLambda("https://videos24238746.s3.amazonaws.com/uploads/1740907037945.wav");

  return new Response(JSON.stringify({result:r}), {
    status: 200,
  });

}






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

