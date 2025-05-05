import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './faq.module.css';

function BillingFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "Is it free?",
      answer: "Yes there is a free tier of 5 summaries per week."
    },
    {
      question: "How many credits does a summary cost?",
      answer:
        "1 credit per summary."
    },
    {
      question: "Do credits expire at the end of the month?",
      answer:
        "Yes"
    },
    {
      question: "Do you accept refunds?",
      answer:
        "Not currently."
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqSectionBilling}>
      <div className={styles.faqHeader}>
        <h2 className={styles.h2}>Billing FAQ</h2>
      </div>

      {faqItems.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <div
            className={styles.faqQuestion}
            onClick={() => toggleFAQ(index)}
          >
            {item.question}
            <span className={styles.arrow}>
              {activeIndex === index ? <FontAwesomeIcon icon={faChevronUp}/> : <FontAwesomeIcon icon={faChevronDown}/>} 
            </span>
          </div>
          <div
            className={styles.faqAnswer}
            style={{
              // ...,
              maxHeight: activeIndex === index ? "100px" : "0",
              opacity: activeIndex === index ? 1 : 0,
            }}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BillingFAQ;