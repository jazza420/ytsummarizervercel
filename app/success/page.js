"use client";

// import MainLayout from '../mainlayout';
// import styles from '../main.module.css'

import { useEffect, useState } from 'react';
// import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const SuccessPage = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { session_id } = "lol";

  // const searchParams = useSearchParams();

  // // Get a specific query parameter value
  // const session_id = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   //console.log(router)
  //   //console.log(JSON.stringify(pathname))


  //   if (session_id) {
  //     // Here you can handle post-payment actions, such as updating the database
  //     setLoading(false);
  //   }
  // }, [session_id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Payment Successful</h1>
          <p>Thank you for your purchase!</p>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;