"use client";
import { SessionProvider } from 'next-auth/react';
import MainLayout from '../mainlayout';
// import styles from '../main.module.css'

export default function PrivacyPolicy() {
  return (
    //  <SessionProvider>
    //  <MainLayout>
    <div style={{padding:"3rem"}}>

    <h1>Privacy Policy</h1>
    <p><strong>Effective Date: </strong>27/10/2024</p>

    <h2>1. Introduction</h2>
    <p>Welcome to <strong>ShortGenerator</strong>. This Privacy Policy explains how we collect, use, share, and protect information in connection with our website, platform, and services, which allow users to generate faceless short-form videos with the help of AI technology. By using our services, you agree to the collection and use of information as described in this policy.</p>

    <h2>2. Information We Collect</h2>
    <p>We collect several types of information to provide and improve our services, including:</p>
    <ul>
        <li><strong>Personal Information:</strong> When you sign up for an account, we may collect your email address and other information you choose to provide.</li>
        <li><strong>Financial Information:</strong> We use Stripe for subscription payments. We do not store your payment details directly but do store the Stripe Customer ID associated with your account for subscription management purposes.</li>
        <li><strong>Third-Party Access Tokens:</strong> If you connect your account to TikTok for automatic uploads, we may collect and store your TikTok access token to facilitate integration with your TikTok account.</li>
        <li><strong>Usage Data:</strong> We collect information on how you interact with our platform to improve functionality, including IP address, browser type, and activity data.</li>
    </ul>

    <h2>3. How We Use Your Information</h2>
    <p>We use the information we collect to:</p>
    <ul>
        <li>Provide, maintain, and improve our services;</li>
        <li>Manage subscriptions and process payments (via Stripe);</li>
        <li>Enable features like automatic uploading to TikTok with your authorization;</li>
        <li>Communicate with you about updates, offers, and customer support;</li>
        <li>Comply with legal requirements and prevent misuse of our services.</li>
    </ul>

    <h2>4. Sharing Your Information</h2>
    <p>We may share your information only under the following circumstances:</p>
    <ul>
        <li><strong>With Third-Party Service Providers:</strong> We may share data with third parties that perform functions on our behalf, such as payment processing (Stripe) and social media integration (TikTok). These providers only access information as needed to perform their specific tasks and are bound by strict confidentiality agreements.</li>
        <li><strong>For Legal Compliance:</strong> We may disclose information if required to do so by law, to protect our rights, or to comply with a judicial proceeding, court order, or legal process.</li>
        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset sale, your information may be transferred to the acquiring party.</li>
    </ul>

    <h2>5. Your Rights and Choices</h2>
    <p>Depending on your jurisdiction, you may have certain rights regarding your information, such as:</p>
    <ul>
        <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
        <li><strong>Correction:</strong> You may request corrections to any inaccurate information.</li>
        <li><strong>Deletion:</strong> You can request the deletion of your personal information, subject to certain legal exceptions.</li>
        <li><strong>Opt-Out:</strong> You can opt out of marketing communications by following the unsubscribe instructions in any communication you receive from us.</li>
    </ul>
    <p>For any requests, please contact us at <a href="mailto:info@shortgenerator.app">info@shortgenerator.app</a>.</p>

    <h2>6. Security</h2>
    <p>We implement reasonable measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is fully secure. We cannot guarantee the absolute security of your data but are committed to taking all appropriate measures to protect it.</p>

    <h2>7. Third-Party Links</h2>
    <p>Our platform may contain links to other websites or services. This Privacy Policy does not apply to those third-party sites. We recommend reviewing their respective privacy policies before interacting with their services.</p>

    <h2>8. Changes to This Privacy Policy</h2>
    <p>We may update this Privacy Policy periodically. When we make significant changes, we will notify you via email or through a notice on our platform. The “Effective Date” at the top of this page indicates when the latest changes were made.</p>

    <h2>9. Contact Us</h2>
    <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
    <address>
        ShortGenerator <br/>
        Email: <a href="mailto:info@shortgenerator.app">info@shortgenerator.app</a><br/>
    </address>
 
    </div>
    //  </MainLayout>
    //  </SessionProvider>
  );
}