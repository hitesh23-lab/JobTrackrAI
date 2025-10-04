import { EmailThread } from '../EmailThread';

export default function EmailThreadExample() {
  const mockEmails = [
    {
      id: "1",
      from: "recruiter@google.com",
      subject: "Application Received - Senior Java Fullstack Engineer",
      preview: "Thank you for your application. We have received your resume and will review it shortly...",
      content: "Thank you for your application to the Senior Java Fullstack Engineer position. We have received your resume and will review it shortly. Our team will reach out if your qualifications match our requirements.",
      timestamp: "Oct 1, 10:30 AM",
      isImportant: false,
    },
    {
      id: "2",
      from: "hiring.manager@google.com",
      subject: "Interview Invitation - Senior Java Fullstack Engineer",
      preview: "We are pleased to invite you for an interview. Please confirm your availability...",
      content: "We are pleased to invite you for an interview for the Senior Java Fullstack Engineer position. Please confirm your availability for next week Tuesday or Wednesday. We look forward to speaking with you.",
      timestamp: "Oct 2, 2:15 PM",
      isImportant: true,
    },
  ];

  return <EmailThread emails={mockEmails} jobTitle="Senior Java Fullstack Engineer at Google" />;
}
