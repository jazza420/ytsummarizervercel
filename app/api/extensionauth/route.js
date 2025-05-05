
import { auth, signIn, signOut } from "@/auth";
import jwt from 'jsonwebtoken';


// const headers = {
//   'Access-Control-Allow-Origin': 'https://www.youtube.com',
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//   'Access-Control-Allow-Credentials': 'true'
// }



export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const querytoken = searchParams.get('token');
    const queryredirect = searchParams.get('redirect')||'https://youtube.com';


    const session = await auth();

    
    if (!session) {
        return new Response(null, {
          status: 302,
          headers: {
            // url  queryredirect
              Location: '/api/auth/signin?callbackUrl=%2Fapi%2Fextensionauth'+encodeURIComponent('?redirect='+queryredirect)
          }
        });
        // return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        //     status: 401,
        //     headers: headers,
        // });
    }

    if(!querytoken) {

      const token = jwt.sign( {email: session.user.email} , process.env.AUTH_SECRET, {
        // expiresIn: '7d',
      });

      //const user = jwt.verify(token, process.env.AUTH_SECRET);

      return new Response(null, {
          status: 302,
          headers: {
              Location: '/api/extensionauth?token='+token+'&redirect='+queryredirect, // or wherever you want to send them
          },
      });
    } else {
      // return new Response(null, {
      //   status: 302,
      //   headers: {
      //       Location: queryredirect, // or wherever you want to send them
      //   },
      // });
      return new Response("<html><head><script>setTimeout(()=>{window.location.href='"+queryredirect+"'}, 1000)</script></head><body><p>Authenticating</p></body></html>", {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            },
      });
    }
  }
  
//   // Also handle OPTIONS method for preflight
//   export function OPTIONS() {
//     return new Response(null, {
//       status: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       },
//     });
//   }


    // return new Response(JSON.stringify({ message: 'CORS is effectively disabled! ' })+token, {
    //   status: 200,
    //   headers: headers,
    //   redirect: 'https://www.youtube.com',
    // });