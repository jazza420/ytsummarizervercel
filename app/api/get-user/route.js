//import { getServerSession } from 'next-auth';
import clientPromise from '../../../lib/mongodb';
//import { getSession } from "next-auth/react";
//import { authOptions } from '../auth/[...nextauth]/route';
//import { getServerSession }  from "next-auth"
import { auth, signIn, signOut } from "@/auth";

export async function GET(req) {
  //const session = await getServerSession(authOptions);
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const client = await clientPromise;
  const db = client.db('Cluster1');
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({ email: session.user.email });
  

  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), {
      status: 404,
    });
  }

  if(new Date()>new Date(user.nextFreeCredits)) {
    console.log("free credits due");
    await usersCollection.updateOne(
      { email: session.user.email },
      { $set: {freeCredits: 5, nextFreeCredits:new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)} },
      //{ upsert: true }
    );
  }


  return new Response(JSON.stringify(user), {
    status: 200,
  });
}