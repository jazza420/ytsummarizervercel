export const maxDuration = 35; 
import clientPromise from '../../../lib/mongodb';
import { auth, signIn, signOut } from "@/auth";
import { error } from 'console';
import { NextResponse } from 'next/server';

export async function POST(req) {

  const { video_link, title, privacy_level, disable_comment, brand_content_toggle, brand_organic_toggle} = await req.json();
  const session = await auth();

  console.log(JSON.stringify({ video_link, title, privacy_level, disable_comment, brand_content_toggle, brand_organic_toggle }))

  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const client = await clientPromise;
  const db = client.db('Cluster0');
  const usersCollection = db.collection('users');

  //const user = await usersCollection.findOne({ email: session.user.email });
  const user = await usersCollection.findOne(
    { email: session.user.email },
    {
      projection: {
        videos: {
          $filter: {
            input: "$videos",
            as: "video",
            cond: { $eq: ["$$video.video_link", video_link] }, // Match video by link
          },
        },
        tiktok_access_token: 1
      },
    },

  );
  
  // Extract the video if it exists, or return null
  
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
    });
  }

  let video = user?.videos?.[0] || null;
  if(video?.tiktok_publish_id) {
    return new Response(JSON.stringify({ error: 'This TikTok has already been published!' }), {
      status: 404,
    });
  }

  try {

    if(user.tiktok_access_token) {
        const response2 = await fetch('https://open.tiktokapis.com/v2/post/publish/video/init/', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${user.tiktok_access_token}`,
            'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
            post_info: {
                title: title,
                privacy_level: privacy_level,
                disable_duet: true,
                disable_comment: false,
                disable_stitch: true,
                video_cover_timestamp_ms: 1000,
                brand_content_toggle: brand_content_toggle,
                brand_organic_toggle: brand_organic_toggle,
                is_aigc: true
            },
            source_info: {
                source: 'PULL_FROM_URL',
                video_url: video_link
            }
            })
        })

        if (!response2.ok) {
            throw new Error(`Failed to post video: ${response2.statusText} ${JSON.stringify(response2)}`);
        }
    
        const data2 = await response2.json();
        console.log(data2);
        console.log(JSON.stringify(data2));

        
        if (data2.error.code != "ok") {
          throw new Error(`Failed to post video because tiktok did not return ok: ${response2.statusText} ${JSON.stringify(response2)}`);
        }

        const result = await usersCollection.updateOne(
          { email: session.user.email, "videos.video_link": video_link }, // Match user and video by link
          {
            $set: { "videos.$.tiktok_publish_id": data2.data.publish_id }, // Update the title of the matched video
          }
        );

        // Check if the update was successful
        if (result.matchedCount > 0) {
          console.log("tiktok_publish_id updated successfully.");
        } else {
          console.log("No matching video found.");
        }


        for(let j =0; j < 5; j++) {
          const response3 = await fetch('https://open.tiktokapis.com/v2/post/publish/status/fetch/', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${user.tiktok_access_token}`,
                'Content-Type': 'application/json; charset=UTF-8'
              },
              body:JSON.stringify({
                "publish_id": data2.data.publish_id
              })
          })

          if (!response3.ok) {
            throw new Error(`Failed to query tiktok post: ${response3.statusText} ${JSON.stringify(response3)}`);
          }
      
          const data3 = await response3.json();
          console.log(data3);
          console.log(JSON.stringify(data3));


          if(data3.data.status == 'PUBLISH_COMPLETE') {
            return new Response(JSON.stringify({message: 'video upload success'}), {
              status: 200,
            });
          }
          else if(data3.data.status == 'FAILED') {
            return new Response(JSON.stringify({error: 'video upload failed: status return FAILED'}), {
              status: 400,
            });
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));

          //console.log("upload success");
        }
        

        
    }
    else {
      return new Response(JSON.stringify({error: 'video upload failed: not logged into tiktok'}), {
          status: 400,
      });
    }

  } catch (error) {
      console.error('Error uploading video:', error);
      return NextResponse.json(
      { error: 'An error occurred while trying to upload this video.' },
      { status: 500 }
      );
  }
}