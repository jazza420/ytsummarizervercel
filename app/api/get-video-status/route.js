


export async function POST(request) {
    const { url } = await request.json();
    try {
        const response = await fetch(url, { method: 'HEAD' });

        if (response.status === 200) {
            const contentType = response.headers.get('Content-Type');
            console.log(contentType)
            if (contentType === 'video/mp4' || contentType=='binary/octet-stream') {
                console.log('Valid MP4 file.');
                return new Response(JSON.stringify({ status: 'complete' }), {
                    headers: { 'Content-Type': 'application/json' },
                    status: 200,
                  });
            } else {
                console.log('File is not an MP4.');
            }
        } else if (response.status === 403) {
            console.log('Access denied.');
        } else {
            console.log(`Error: Received status code ${response.status}`);
        }
        return new Response(JSON.stringify({ status: 'not found' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
          });
    } catch (error) {
        console.error('Error fetching the URL:', error);
        return new Response(JSON.stringify({ error: error.message, status: 'not found'}), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
          });
    }

    
}