import { NextRequest, NextResponse } from "next/server";
import { insertLead, type LeadData } from "@repo/database";
import { sendLeadNotification } from "@repo/email";

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
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Prepare lead data
    const leadData: LeadData = {
      email,
      company_name: companyName,
      source: source || "braze",
      placement,
      utm_source: utmParams?.utm_source || null,
      utm_medium: utmParams?.utm_medium || null,
      utm_campaign: utmParams?.utm_campaign || null,
      utm_content: utmParams?.utm_content || null,
      utm_term: utmParams?.utm_term || null,
      ip_address: ipAddress,
      user_agent: userAgent,
    };

    // Store in Supabase
    try {
      const lead = await insertLead(leadData);
      console.log("Lead stored in Supabase:", lead?.id);
    } catch (dbError) {
      console.error("Failed to store lead in database:", dbError);
      // Continue with email notification even if DB fails
    }

    // Send email notification
    try {
      await sendLeadNotification(leadData);
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Continue - don't fail the request if email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
