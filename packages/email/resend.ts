import { Resend } from 'resend';

interface LeadData {
  email: string;
  company_name: string;
  source: string;
  placement: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  ip_address: string;
  user_agent: string;
}

export async function sendLeadNotification(leadData: LeadData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('RESEND_API_KEY not set, skipping email notification');
    return;
  }

  const resend = new Resend(apiKey);

  const sourceMap: Record<string, string> = {
    braze: 'Braze',
    hubspot: 'HubSpot',
    klaviyo: 'Klaviyo',
    salesforce: 'Salesforce',
  };

  const sourceName = sourceMap[leadData.source] || leadData.source;

  const emailBody = `
New Lead from ${sourceName} Alternative Landing Page

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email:           ${leadData.email}
Company:         ${leadData.company_name}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEAD DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Source:          ${leadData.source}
Placement:       ${leadData.placement}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UTM PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Source:          ${leadData.utm_source || 'N/A'}
Medium:          ${leadData.utm_medium || 'N/A'}
Campaign:        ${leadData.utm_campaign || 'N/A'}
Content:         ${leadData.utm_content || 'N/A'}
Term:            ${leadData.utm_term || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IP Address:      ${leadData.ip_address}
User Agent:      ${leadData.user_agent}
`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Phleid Leads <onboarding@resend.dev>',
      to: ['nikolaos.eftimiadis@gmail.com'],
      subject: `New Lead: ${leadData.company_name} via ${sourceName}`,
      text: emailBody,
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    console.log('Email sent successfully:', data?.id);
  } catch (error) {
    console.error('Error sending email notification:', error);
    // Don't throw - we don't want to fail the request if email fails
  }
}
