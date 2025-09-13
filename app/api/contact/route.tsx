import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    console.log("[v0] Environment variables check:", {
      EMAIL_USER: process.env.EMAIL_USER ? "Set" : "Missing",
      EMAIL_PASS: process.env.EMAIL_PASS ? "Set" : "Missing",
    })

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("[v0] Missing email environment variables")
      return NextResponse.json(
        {
          error: "Email service not configured. Please contact the administrator.",
        },
        { status: 500 },
      )
    }

    const nodemailer = require("nodemailer")

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    try {
      await transporter.verify()
      console.log("[v0] Email transporter verified successfully")
    } catch (verifyError) {
      console.error("[v0] Email transporter verification failed:", verifyError)
      return NextResponse.json(
        {
          error: "Email service configuration error. Please try again later.",
        },
        { status: 500 },
      )
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "s70315@ocean.umt.edu.my",
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
    }

    console.log("[v0] Attempting to send email to s70315@ocean.umt.edu.my")

    // Send email
    const info = await transporter.sendMail(mailOptions)

    console.log("[v0] Email sent successfully:", info.messageId)

    // Log the message for backup
    console.log("Contact form submission sent to s70315@ocean.umt.edu.my:", {
      name: `${firstName} ${lastName}`,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Contact form error:", error)

    let errorMessage = "Failed to send message"
    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        errorMessage = "Email authentication failed. Please check configuration."
      } else if (error.message.includes("Network")) {
        errorMessage = "Network error. Please try again."
      } else {
        errorMessage = error.message
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
