import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body

        if (!name || !email || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 404 })
        }

        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY || '',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: {
                    name: process.env.BREVO_USER_NAME as string,
                    email: process.env.BREVO_USER_EMAIL as string,
                },
                to: [{
                    email: process.env.BREVO_TO_MAIL as string,
                    name: process.env.BREVO_TO_NAME as string,
                }],
                replyTo: {
                    email: email[0],
                    name: name[0]
                },
                subject: "Contact from Your Portfolio website",
                htmlContent: `
                <html>
                <head></head>
                    <body>
                        <h2>New Message from ${name[0]}</h2>
                        <h3>Email: <strong>${email[0]}</strong></h3>
                        <h3>Message: <strong>${message[0]}</strong></h3>
                    </body>
                </html>
                `
            })
        })

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.message || "Failed to Send Email" }, { status: 404 })
        }

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
    } catch (error) {
        console.error('Error Sending email', error)
        return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 })
    }
}