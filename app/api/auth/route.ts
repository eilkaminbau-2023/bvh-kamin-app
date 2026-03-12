import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Burada Firebase Auth ile giriş yapılacak
    // Şimdilik basit bir mock cevap

    if (email === "test@bvh-kamin.at" && password === "123456") {
      return NextResponse.json({
        success: true,
        user: {
          id: "1",
          name: "Ahmet Usta",
          email: email,
          role: "techniker"
        }
      })
    }

    return NextResponse.json(
      { success: false, error: "Ungültige Anmeldedaten" },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server Fehler" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Methode nicht erlaubt" },
    { status: 405 }
  )
}