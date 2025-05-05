


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord"
//import TikTokProvider from "next-auth/providers/tiktok"
//import OAuthUserConfig from "next-auth/providers/oauth"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import TikTokProvider from 'next-auth/providers/tiktok';


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  
} = NextAuth({
  providers: [GoogleProvider({
          // profile(profile) {
          //   return {
          //     id: profile.sub,
          //     name: profile.name,
          //     email: profile.email,
          //     image: profile.picture,
          //   };
          // },
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          
          // authorization: {
          //   params: {
          //     prompt: "consent",
          //     access_type: "offline",
          //   s  response_type: "code"
          //   }
          // }
        }, ),
      // DiscordProvider(),
      // TikTokProvider()
      // TikTokProvider({
      //   clientId: process.env.TIKTOK_CLIENT_ID,
      //   clientSecret: process.env.TIKTOK_CLIENT_SECRET,
        
      //   // authorization: {
      //   //   url: "https://open-api.tiktok.com/platform/oauth/connect",
      //   //   params: { scope: "user.info.basic" }, // Update scopes as needed
      //   // },
      //   // token: "https://open-api.tiktok.com/platform/oauth/token",
      //   // userinfo: "https://open-api.tiktok.com/platform/oauth/userinfo",
      // })
      // TikTokProvider({
      //   clientId: process.env.TIKTOK_CLIENT_ID,
      //   clientSecret: process.env.TIKTOK_CLIENT_SECRET,
      //   authorization: {
      //     url: "https://www.tiktok.com/v2/auth/authorize",
      //     params: {
      //       client_key: process.env.TIKTOK_CLIENT_ID,
      //       redirect_uri: process.env.TIKTOK_REDIRECT_URI,
      //       scope: "user.info.profile",
      //       response_type: "code",
      //       // redirect_uri: process.env.TIKTOK_REDIRECT_URI
      //     },
      //   },
      //   // token: null,
      //   token: {
      //     url: "https://open.tiktokapis.com/v2/oauth/token/",
      //     async request({ params, provider }) {
      //       console.log("hello there")
      //       console.log(JSON.stringify(params))
      //       const res = await fetch(provider.token?.url, {
      //         method: "POST",
      //         headers: {
      //           "Cache-Control": "no-cache",
      //           "Content-Type": "application/x-www-form-urlencoded",
      //         },
      //         body: new URLSearchParams({
      //           client_key: process.env.TIKTOK_CLIENT_ID,
      //           client_secret:  process.env.TIKTOK_CLIENT_SECRET,
      //           code: params.code,
      //           grant_type: "authorization_code",
      //           redirect_uri: provider.callbackUrl,
      //         }),
      //       }).then((res) => res.json())
    
      //       const tokens = {
      //         access_token: res.access_token,
      //         expires_at: res.expires_in,
      //         refresh_token: res.refresh_token,
      //         scope: res.scope,
      //         id_token: res.open_id,
      //         token_type: res.token_type,
      //         session_state: res.open_id,
      //       }
      //       return {
      //         tokens,
      //       }
      //     },
      //     async conform(response, response2) {
      //         console.log("hello there 2")
      //         console.log(JSON.stringify(response2))
      //         const res = await fetch(response.url, {
      //           method: 'POST',
      //           headers: {
      //             'Cache-Control': 'no-cache',
      //             'Content-Type': 'application/x-www-form-urlencoded',
      //           },
      //           body: new URLSearchParams({
      //             client_key: process.env.AUTH_TIKTOK_KEY,
      //             client_secret: process.env.AUTH_TIKTOK_SECRET,
      //             code: tkCode,
      //             grant_type: 'authorization_code',
      //             redirect_uri: process.env.AUTH_URL + tkCallback ,
      //           }),
      //         });
      //         return res;
      //     },
      //   },
        
      //   userinfo: {
      //     url: "https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name,username",
      //     async request({ tokens, provider }) {
      //       return await fetch(provider.userinfo?.url, {
      //         headers: { Authorization: `Bearer ${tokens.access_token}` },
      //       }).then(async (res) => await res.json())
      //     },
      //   },
      //   profile(profile) {
      //     return {
      //       id: profile.data.user.open_id,
      //       name: profile.data.user.display_name,
      //       image: profile.data.user.avatar_url,
      //       email: profile.data.user.email || profile.data.user.username || null,
      //     }
      //   },
      //   issuer: "authjs.dev",
      //   // token: {
      //   //   url: "https://open.tiktokapis.com/v2/oauth/token/",
      //   //   async request({ params, provider }) {
      //   //     const res = await fetch(provider.token?.url, {
      //   //       method: "POST",
      //   //       headers: {
      //   //         "Cache-Control": "no-cache",
      //   //         "Content-Type": "application/x-www-form-urlencoded",
      //   //       },
      //   //       body: new URLSearchParams({
      //   //         client_key: provider.clientId,
      //   //         client_secret: provider.clientSecret,
      //   //         code: params.code,
      //   //         grant_type: "authorization_code",
      //   //         redirect_uri: provider.callbackUrl,
      //   //       }),
      //   //     }).then((res) => res.json())
    
      //   //     const tokens = {
      //   //       access_token: res.access_token,
      //   //       expires_at: res.expires_in,
      //   //       refresh_token: res.refresh_token,
      //   //       scope: res.scope,
      //   //       id_token: res.open_id,
      //   //       token_type: res.token_type,
      //   //       session_state: res.open_id,
      //   //     }
      //   //     return {
      //   //       tokens,
      //   //     }
      //   //   },
      //   // },
      // })
      
      ],
  
  //secret: process.env.NEXTAUTH_SECRET,
  // adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn(user, account, profile) {
      console.log('User:', JSON.stringify(user, null, 2));
      console.log('Account:', JSON.stringify(account, null, 2));
      console.log('Profile:', JSON.stringify(profile, null, 2));

      const email = user.user.email || profile.email || account.email;
      console.log('Email:', email);

      //console.log(account.userId);
      //console.log(profile.id);
      //console.log(profile.name);
      //console.log(profile.email);


      //const { email } = user;
      const client = await clientPromise;
      const db = client.db("Cluster1");
      const usersCollection = db.collection("users");

      const existingUser = await usersCollection.findOne({ email });

      if (!existingUser) {
        await usersCollection.insertOne({
          email,
          credits: 0,
          freeCredits: 8,
          nextFreeCredits: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
          createdAt: new Date(),
        });
      }

      return true;
    },
  },
});
