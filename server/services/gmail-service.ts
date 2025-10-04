import { getUncachableGmailClient } from '../gmail-client';
import { storage } from '../storage';
import type { InsertEmail } from '@shared/schema';

export async function fetchRecentEmails(applicationId: string, companyName: string) {
  try {
    const gmail = await getUncachableGmailClient();
    
    const query = `from:${companyName.toLowerCase().replace(/\s+/g, '')} OR subject:${companyName}`;
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 10,
    });

    const messages = response.data.messages || [];
    const emails: InsertEmail[] = [];

    for (const message of messages) {
      const detail = await gmail.users.messages.get({
        userId: 'me',
        id: message.id!,
      });

      const headers = detail.data.payload?.headers || [];
      const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
      const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
      const date = headers.find(h => h.name === 'Date')?.value || new Date().toISOString();

      let content = '';
      if (detail.data.payload?.parts) {
        const textPart = detail.data.payload.parts.find(p => p.mimeType === 'text/plain');
        if (textPart?.body?.data) {
          content = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
        }
      } else if (detail.data.payload?.body?.data) {
        content = Buffer.from(detail.data.payload.body.data, 'base64').toString('utf-8');
      }

      const preview = content.substring(0, 150) + (content.length > 150 ? '...' : '');

      const email: InsertEmail = {
        applicationId,
        gmailId: message.id!,
        from,
        subject,
        preview,
        content,
        timestamp: new Date(date),
        isImportant: 'false',
      };

      emails.push(email);
      await storage.createEmail(email);
    }

    return emails;
  } catch (error) {
    console.error('Error fetching Gmail emails:', error);
    throw error;
  }
}

export async function analyzeEmailForStatus(emailContent: string, subject: string): Promise<string | null> {
  const content = (emailContent + ' ' + subject).toLowerCase();
  
  if (content.includes('interview') || content.includes('schedule') || content.includes('meeting')) {
    return 'interview';
  }
  if (content.includes('offer') || content.includes('congratulations')) {
    return 'offer';
  }
  if (content.includes('screening') || content.includes('phone call') || content.includes('phone screen')) {
    return 'screening';
  }
  if (content.includes('reject') || content.includes('unfortunately') || content.includes('not moving forward')) {
    return 'rejected';
  }
  
  return null;
}
