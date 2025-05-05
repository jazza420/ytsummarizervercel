import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './faq.module.css';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "Is it free?",
      answer: "Yes there is a free tier of 2 videos per week."
    },
    {
        question: "Do I own the audiobooks?",
        answer:
          "Yes, they are yours to do with as you please."
    },
    {
    question: "Are there any types of content that are not allowed?",
    answer:
        "AI services such as ChatGPT have there own content moderation systems but there is no additional filter beyond that."
    },
    {
      question: "How many credits does an audiobook use?",
      answer:
        "1 credit per 10 minutes of audio."
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
    <div className={styles.faqSection}>
      <div className={styles.faqHeader}>
        <h2 className={styles.h2}>Frequently Asked Questions</h2>
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

// const styles = {
//   faqSection: {
//     // maxWidth: "800px",
//     // margin: "0 auto",
//     // backgroundColor: "#1a1a1a",
//     // backgroundColor: "#333",
//     // color: "#fff",
//     // borderRadius: "8px",
//     // boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
//     padding: "32px",
//     transition: "background-color 0.3s ease",
//   },
//   faqHeader: {
//     textAlign: "center",
//     marginBottom: "10px",
//   },
//   faqItem: {
//     marginBottom: "4px",
//     // borderBottom: "1px solid #555",
//     paddingBottom: "6px",
//   },
//   faqQuestion: {
//     fontSize: "18px",
//     fontWeight: "bold",
//     cursor: "pointer",
//     margin: "0",
//     padding: "10px",
//     backgroundColor: "#333",
//     borderRadius: "5px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     transition: "background-color 0.3s ease",
//   },
//   faqQuestionHover: {
//     backgroundColor: "#555",
//   },
//   h2: {
//     fontSize: "1.3rem",
//     fontWeight: "bold"
//   },
//   faqAnswer: {
//     marginLeft: "10px",
//     marginTop: "10px",
//     fontSize: "16px",
//     color: "#ccc",
//     overflow: "hidden",
//     maxHeight: "0",
//     transition: "max-height 0.3s ease, opacity 0.3s ease",
//   },
//   arrow: {
//     marginLeft: "10px",
//     fontSize: "16px",
//     color: "#aaa",
//   },
// };

export default FAQ;