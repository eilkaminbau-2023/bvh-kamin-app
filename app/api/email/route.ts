import { NextResponse } from "next/server"
import { Resend } from 'resend'

// Resend API key'i environment variable'dan al
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { to, subject, html, attachments, cc } = body

    console.log("📧 Email wird gesendet...")
    console.log("📨 Von: office@eilkamin.at")
    console.log("📨 An:", to)
    if (cc) console.log("📨 CC:", cc)
    console.log("📨 Betreff:", subject)

    // Email gönderme işlemi
    const { data, error } = await resend.emails.send({
      from: 'BVH Kamin <office@eilkamin.at>',
      to: Array.isArray(to) ? to : [to],
      cc: cc ? (Array.isArray(cc) ? cc : [cc]) : undefined,
      subject: subject,
      html: html,
      attachments: attachments?.map((att: any) => ({
        filename: att.filename,
        content: att.content.split(',')[1], // base64 data URL'den içeriği al
      })),
    })

    if (error) {
      console.error("❌ Resend Fehler:", error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Email wurde gesendet",
      from: "office@eilkamin.at",
      to: to,
      id: data?.id
    })

  } catch (error) {
    console.error("❌ Email Fehler:", error)
    return NextResponse.json(
      { success: false, error: "Email konnte nicht gesendet werden" },
      { status: 500 }
    )
  }
}

// Test endpoint - API durumunu kontrol et
export async function GET() {
  // API key var mı kontrol et
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({
      success: false,
      error: "RESEND_API_KEY nicht gefunden",
      config: {
        from: "office@eilkamin.at",
        service: "Resend",
        status: "fehler: API Key fehlt"
      }
    })
  }

  return NextResponse.json({
    success: true,
    config: {
      from: "office@eilkamin.at",
      service: "Resend",
      status: "bereit",
      apiKey: process.env.RESEND_API_KEY ? "vorhanden" : "fehlt"
    }
  })
}