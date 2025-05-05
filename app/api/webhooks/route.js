import clientPromise from '../../../lib/mongodb';
import { headers } from 'next/headers';
import axios from 'axios';
import AWS from 'aws-sdk';


export const maxDuration = 30; 

export async function POST(req) {
  const headersList = headers();
  console.log("headers: "+Array.from(headersList.entries()))

  // Parse the URL and extract query parameters
  const url = new URL(req.url); // Extract URL from the request object
  const queryParams = Object.fromEntries(url.searchParams.entries()); // Convert query parameters to an object
  console.log("Query Parameters: ", queryParams);

  const prediction = await req.json();
  console.log(prediction)

  const client = await clientPromise;
  const db = client.db('Cluster1');
  const usersCollection = db.collection('users');

  const book = await usersCollection.findOne(
    { "books.audioJobId": prediction.id }, // Query to match the specific book by id
    { projection: { "books.$": 1 } } // Correct projection syntax
  );

  if(book?.books && book.books[0].audiolink) {
    console.log("already set link")
    return new Response(JSON.stringify({ message: 'already set link' }), {
      status: 200,
    });
  }

  // console.log("found: "+JSON.stringify(book))

  let audioURL = prediction.output

  // if(audioURL) {
  //   try {
  //     // Configure AWS S3
  //     const s3 = new AWS.S3({
  //       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //       region: process.env.AWS_REGION,
  //     });

  //     // Download the file from the URL
  //     const response = await axios.get(prediction.output, { responseType: 'arraybuffer' });
  //     const fileBuffer = Buffer.from(response.data, 'binary');
  //     const fileName = `uploads/${new Date().getTime()}.wav`;

  //     // Upload the file to S3
  //     const uploadParams = {
  //       Bucket: process.env.AWS_S3_BUCKET,
  //       Key: fileName,
  //       Body: fileBuffer,
  //       ContentType: 'audio/x-wav',
  //     };

  //     const uploadResult = await s3.upload(uploadParams).promise();

  //     audioURL = uploadResult.Location

  //     //return new Response(null, { status: 400 });
  //     //res.status(200).json({ message: 'File uploaded successfully', url: uploadResult.Location });
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     return new Response(JSON.stringify({ error: 'Failed to upload file' }), {
  //       status: 500,
  //     });
  //   }
  // }



  if(audioURL) {
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
            // console.log("Lambda Response:", JSON.parse(response.Payload));
            console.log("Lambda Response:", JSON.parse(response.StatusCode));
        } catch (error) {
            console.error("Error invoking Lambda:", error);
        }
    }

    // Example Usage
    let r = await invokeLambda(audioURL);

    // return new Response(JSON.stringify({result:r}), {
    //   status: 200,
    // });
  }



  const update_result = await usersCollection.updateOne(
    { 
        "books.audioJobId": prediction.id
    },
    { $set: { "books.$.audiolink": audioURL, "books.$.audioStatus": prediction.status}} 
  )

  console.log("set database")

  return new Response(null, { status: 200 });
}