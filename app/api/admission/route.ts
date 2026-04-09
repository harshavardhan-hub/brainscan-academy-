import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const webhookUrl = process.env.DISCORD_ADMISSION_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("DISCORD_ADMISSION_WEBHOOK_URL is not set");
      return NextResponse.json({ error: "Webhook URL not configured" }, { status: 500 });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord API returned ${response.status} ${response.statusText}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error submitting to Discord:", error);
    return NextResponse.json(
      { error: "Failed to submit admission form" },
      { status: 500 }
    );
  }
}
