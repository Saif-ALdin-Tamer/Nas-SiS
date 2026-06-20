import { useState } from 'react';
import './Help.css';

const Help = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "How do I enroll in a new course?",
      answer: "Navigate to the 'Courses' page from the left sidebar, click on any course you are interested in, and go to the 'Course Price' tab to find the Enroll button."
    },
    {
      question: "Where can I find my exam results?",
      answer: "Your midterms, finals, and assignment grades are all consolidated in the 'Results' page. You can also view your overall GPA summary there."
    },
    {
      question: "How is my attendance calculated?",
      answer: "Attendance is recorded per course. Your overall percentage on the Dashboard is an aggregate of all your enrolled courses. You can see detailed dates on the 'Attendance' page."
    },
    {
      question: "How do I contact my instructor?",
      answer: "Go to the 'Messages' page to start a chat thread with any of your assigned instructors, or look up their profile in your course details."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="help-page">
      <div className="help-header">
        <h2>Help Center</h2>
        <p>Find answers to common questions or reach out to support.</p>
      </div>

      <div className="help-grid">
        <div className="help-main">
          <div className="card faq-card">
            <h3 className="section-title">Frequently Asked Questions</h3>
            
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${openFaq === index ? 'open' : ''}`}
                >
                  <button 
                    className="faq-question" 
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <svg className="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card docs-card">
            <h3 className="section-title">Documentation & Guides</h3>
            <div className="docs-grid">
              <a href="#" className="doc-item">
                <div className="doc-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V12L16.5 16.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="doc-content">
                  <h4>Getting Started</h4>
                  <p>A quick tour of the NAS platform.</p>
                </div>
              </a>
              <a href="#" className="doc-item">
                <div className="doc-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="var(--accent-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="doc-content">
                  <h4>Student Policies</h4>
                  <p>Read about grading and attendance rules.</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="help-sidebar">
          <div className="card contact-card">
            <h3 className="section-title">Contact Support</h3>
            <p className="contact-desc">Need more help? Send a message to the admin team.</p>
            
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Subject</label>
                <select className="form-control">
                  <option>General Inquiry</option>
                  <option>Technical Issue</option>
                  <option>Course Enrollment</option>
                  <option>Billing & Payments</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-control" rows="4" placeholder="Describe your issue..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          </div>

          <div className="card quick-contacts">
            <h3 className="section-title">Direct Channels</h3>
            <div className="channel-item">
              <span className="channel-icon">📧</span>
              <div className="channel-text">
                <p>Email Support</p>
                <strong>support@nas.edu</strong>
              </div>
            </div>
            <div className="channel-item">
              <span className="channel-icon">📞</span>
              <div className="channel-text">
                <p>Call IT Desk</p>
                <strong>+1 (555) 123-4567</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
