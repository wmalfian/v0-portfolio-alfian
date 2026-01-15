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

    console.log("[v0] Environment variables check:", {
      EMAIL_USER: process.env.EMAIL_USER ? "Set" : "Missing",
      EMAIL_PASS: process.env.EMAIL_PASS ? "Set" : "Missing",
    })

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("[v0] Missing email environment variables")

      // Log the submission for reference
      console.log("[v0] Contact form submission (env vars missing):", {
        name: `${firstName} ${lastName}`,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        {
          error: "Email service not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.",
          fallback: true,
        },
        { status: 500 },
      )
    }

    const nodemailer = await import("nodemailer")

    console.log("[v0] Creating email transporter")

    const transporter = nodemailer.default.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    try {
      console.log("[v0] Verifying transporter...")
      await transporter.verify()
      console.log("[v0] Email transporter verified successfully")
    } catch (verifyError) {
      console.error("[v0] Email transporter verification failed:", verifyError)

      // Log the submission for reference
      console.log("[v0] Contact form submission (verification failed):", {
        name: `${firstName} ${lastName}`,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        {
          error: "Email authentication failed. Please check your EMAIL_USER and EMAIL_PASS credentials.",
          fallback: true,
        },
        { status: 500 },
      )
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "wmalfian@gmail.com",
      replyTo: email,
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
      text: `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from your portfolio website at ${new Date().toLocaleString()}
      `,
    }

    console.log("[v0] Attempting to send email to wmalfian@gmail.com")

    // Send email
    const info = await transporter.sendMail(mailOptions)

    console.log("[v0] Email sent successfully:", info.messageId)

    // Log the message for backup
    console.log("[v0] Contact form submission sent to wmalfian@gmail.com:", {
      name: `${firstName} ${lastName}`,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ message: "Message sent successfully", success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] Contact form error:", error)

    let errorMessage = "Failed to send message"
    if (error instanceof Error) {
      console.error("[v0] Error details:", error.message, error.stack)

      if (error.message.includes("Invalid login")) {
        errorMessage = "Email authentication failed. Please check your Gmail credentials and enable App Passwords."
      } else if (error.message.includes("Network")) {
        errorMessage = "Network error. Please try again."
      } else {
        errorMessage = error.message
      }
    }

    return NextResponse.json({ error: errorMessage, fallback: true }, { status: 500 })
  }
}
