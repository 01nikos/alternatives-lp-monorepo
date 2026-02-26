import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, companyName, source, placement, utmParams } = body;

    // Validate inputs
    if (!email || !companyName) {
      return NextResponse.json(
        { success: false, error: "Email and company name are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Get request metadata
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const timestamp = new Date().toISOString();

    // Prepare lead data
    const leadData = {
      email,
      company_name: companyName,
      source: source || "hubspot",
      placement,
      utm_source: utmParams?.utm_source || null,
      utm_medium: utmParams?.utm_medium || null,
      utm_campaign: utmParams?.utm_campaign || null,
      utm_content: utmParams?.utm_content || null,
      utm_term: utmParams?.utm_term || null,
      ip_address: ipAddress,
      user_agent: userAgent,
      timestamp,
    };

    // TODO: Store in Cloudflare D1 database
    // For now, we'll send an email notification

    // Send email notification to Phleid team
    await sendEmailNotification(leadData);

    // Log to console (temporary - replace with database)
    console.log("New lead captured:", leadData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendEmailNotification(leadData: any) {
  // Email notification to kulhanek.josef@gmail.com
  const emailBody = `
New Lead from HubSpot Alternative Landing Page

Email: ${leadData.email}
Company: ${leadData.company_name}
Source: ${leadData.source}
Placement: ${leadData.placement}

UTM Parameters:
- Source: ${leadData.utm_source || "N/A"}
- Medium: ${leadData.utm_medium || "N/A"}
- Campaign: ${leadData.utm_campaign || "N/A"}

Metadata:
- IP Address: ${leadData.ip_address}
- User Agent: ${leadData.user_agent}
- Timestamp: ${leadData.timestamp}
  `;

  try {
    // MailChannels API integration
    // Note: This requires MailChannels to be configured on Cloudflare Workers
    // For development, we'll log to console
    console.log("Email notification:", {
      to: "kulhanek.josef@gmail.com",
      subject: `New Lead: ${leadData.company_name} via ${leadData.source}`,
      body: emailBody,
    });

    // In production with Cloudflare Workers:
    /*
    await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "kulhanek.josef@gmail.com" }],
          },
        ],
        from: {
          email: "leads@hubspotalternatives.com",
          name: "HubSpot Alternative",
        },
        subject: `New Lead: ${leadData.company_name} via ${leadData.source}`,
        content: [
          {
            type: "text/plain",
            value: emailBody,
          },
        ],
      }),
    });
    */
  } catch (error) {
    console.error("Error sending email notification:", error);
    // Don't fail the request if email fails
  }
}
