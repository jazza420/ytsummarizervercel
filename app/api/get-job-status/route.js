
export async function POST(request) {
    const { job_id } = await request.json();
    const your_api_key = process.env.RUNPOD_API_KEY;
    const endpoint_id = "3eu0lek2nvefce";
  
    const url = `https://api.runpod.ai/v2/${endpoint_id}/status/${job_id}`;
    
    const headers = {
      "accept": "application/json",
      "authorization": your_api_key,
      "content-type": "application/json"
    };
  
    try {
      const statusResponse = await fetch(url, {
        method: 'POST',
        headers: headers,
      });
  
      const statusData = await statusResponse.json();
      //console.log(statusData);
  
      if (!statusResponse.ok) {
        throw new Error(`Error checking job status: ${statusData.message}`);
      }
  
      if (statusData.error) {
        return new Response(JSON.stringify({ error: statusData.error }), {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        });
      }
      else if (statusData.output) {
        return new Response(JSON.stringify(statusData), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        });
      } else {
        return new Response(JSON.stringify({ status: 'processing' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  }