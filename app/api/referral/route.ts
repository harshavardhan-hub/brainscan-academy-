import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { content } = body;

        if (!content) {
            return NextResponse.json({ error: 'Missing content' }, { status: 400 });
        }

        const webhookUrl = process.env.DISCORD_REFERRAL_WEBHOOK_URL;
        
        if (!webhookUrl) {
            return NextResponse.json({ error: 'Webhook URL not configured on server' }, { status: 500 });
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to notify Discord' }, { status: response.status });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
