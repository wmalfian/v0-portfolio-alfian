import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Contact API route called")

    const body = await request.json()
    const { firstName, lastName, email, subject, message } = body

    console.log("[v0] Form data received:", { firstName, lastName, email, subject })

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      console.log("[v0] Validation failed: missing fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("[v0] Validation failed: invalid email format")
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      console.error("[v0] Missing RESEND_API_KEY environment variable")
      return NextResponse.json(
        {
          error: "Email service not configured. Opening email client as fallback.",
          fallback: true,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Attempting to send email via Resend to wmalfian@gmail.com")

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["wmalfian@gmail.com"],
          reply_to: email,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
            <hr>
            <p><small>Sent from your portfolio website at ${new Date().toLocaleString()}</small></p>
          `,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("[v0] Resend API error:", data)
        throw new Error(data.message || "Failed to send email")
      }

      console.log("[v0] Email sent successfully via Resend:", data.id)
      return NextResponse.json({ message: "Message sent successfully", success: true }, { status: 200 })
    } catch (sendError) {
      console.error("[v0] Email send failed:", sendError)

      return NextResponse.json(
        {
          error: "Unable to send email. Please use the email client option instead.",
          fallback: true,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[v0] Contact form error:", error)

    let errorMessage = "Failed to send message"
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage, fallback: true }, { status: 500 })
  }
}
