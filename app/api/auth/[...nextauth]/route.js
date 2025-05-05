
// import NextAuth from "next-auth";
// //import Providers from "next-auth/providers";
// import GoogleProvider from "next-auth/providers/google";

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // Add more providers here
//   ],
//   callbacks: {
//     async jwt(token, user) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session(session, token) {
//       session.user.id = token.id;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });


// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };

export { GET, POST } from "@/auth.js";