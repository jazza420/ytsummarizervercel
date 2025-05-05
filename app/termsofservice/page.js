"use client";
import { SessionProvider } from 'next-auth/react';
import MainLayout from '../mainlayout';
// import styles from '../main.module.css'

export default function TermsOfService() {
  return (
     <SessionProvider>
     <MainLayout>

<div  style={{padding:"3rem"}}>

<h1>Terms of Service</h1>
<p><strong>Effective Date:</strong> 27/10/2024</p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing or using ShortGenerator (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;), you agree to comply with and be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not access or use our services.</p>

<h2>2. Description of Services</h2>
<p>ShortGenerator provides a platform that allows users to generate faceless short-form videos using artificial intelligence (&quot;Services&quot;). We reserve the right to modify or discontinue any aspect of our Services at any time without prior notice.</p>

<h2>3. User Accounts</h2>
<p>To use certain features of our Services, you may need to create an account. You agree to provide accurate, current, and complete information and to keep this information up-to-date. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

<h2>4. Subscriptions and Payments</h2>
<p>Our Services are provided on a subscription basis. Payments are processed via Stripe, and by subscribing, you agree to the payment terms outlined at the time of purchase. We may change subscription fees at any time with prior notice. By continuing to use the Services after the change, you agree to the new fees.</p>

<h2>5. Use of AI-Generated Content</h2>
<p>You acknowledge that the content generated using our platform is created using artificial intelligence and may contain errors or inaccuracies. You are solely responsible for ensuring that all content meets your standards and complies with applicable laws.</p>

<h2>6. Intellectual Property</h2>
<p>All intellectual property rights in the platform, including but not limited to software, design, and text, are owned by ShortGenerator or our licensors. You may not reproduce, modify, distribute, or otherwise exploit any content on our platform without our prior written consent.</p>

<h2>7. Third-Party Integrations</h2>
<p>Our platform may integrate with third-party services, such as TikTok, to enhance your experience. By using these integrations, you agree to comply with all third-party terms and grant us access to necessary information (e.g., access tokens) to facilitate the integration.</p>

<h2>8. Prohibited Activities</h2>
<p>You agree not to:</p>
<ul>
<li>Use the Services for any illegal, fraudulent, or unauthorized purpose;</li>
<li>Attempt to gain unauthorized access to our systems or other user accounts;</li>
<li>Interfere with or disrupt the integrity or performance of our platform.</li>
</ul>

<h2>9. Termination</h2>
<p>We may suspend or terminate your access to the Services at our sole discretion if we determine that you have violated these Terms or for any other reason without prior notice. Upon termination, your right to access the Services will cease immediately.</p>

<h2>10. Limitation of Liability</h2>
<p>To the fullest extent permitted by law, ShortGenerator shall not be liable for any indirect, incidental, special, or consequential damages arising from or in connection with your use of our Services. Our total liability to you for any claim related to the Services shall not exceed the amount paid by you in the preceding twelve (12) months.</p>

<h2>11. Disclaimers</h2>
<p>The Services are provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We make no representations or warranties of any kind, express or implied, regarding the reliability or accuracy of the Services, including AI-generated content.</p>

<h2>12. Governing Law</h2>
<p>These Terms shall be governed by and construed in accordance with the laws of Australia. Any disputes arising from these Terms shall be resolved exclusively in the courts of Australia.</p>

<h2>13. Changes to These Terms</h2>
<p>We may modify these Terms at any time. We will notify you of significant changes by posting a notice on our platform or sending an email. Your continued use of the Services following the posting of revised Terms means you accept and agree to the changes.</p>

<h2>14. Contact Us</h2>
<p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
<address>
    ShortGenerator <br/>
    Email: <a href="mailto:info@shortgenerator.app">info@shortgenerator.app</a><br/>
</address>

</div>


     </MainLayout>
     </SessionProvider>
  );
}