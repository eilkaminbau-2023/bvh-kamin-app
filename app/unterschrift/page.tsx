"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useRef, useState } from "react"
import SignatureCanvas from "react-signature-canvas"

export default function UnterschriftDetailPage({ params }: { params: { id: string } }) {
  const sigCanvas = useRef<SignatureCanvas>(null)
  const [unterschrift, setUnterschrift] = useState<string | null>(null)
  const [kundeName, setKundeName] = useState("Hans Mueller")
  const [kundeFirma, setKundeFirma] = useState("XYZ Bau GmbH")
  const [kundeEmail, setKundeEmail] = useState("hans@xyz-bau.at")
  const [isEditing, setIsEditing] = useState(false)

  const clearSignature = () => {
    sigCanvas.current?.clear()
    setUnterschrift(null)
  }

  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataUrl = sigCanvas.current.getCanvas().toDataURL("image/png")
      setUnterschrift(dataUrl)
      console.log("İmza kaydedildi")
    }
  }

  const sendEmail = () => {
    alert(`Email wird gesendet an: ${kundeEmail}, office@eilkamin.at`)
    // Burada API çağrısı yapılacak
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <a href="/kamine">
          <Button variant="ghost" size="sm" className="mr-2">
            ←
          </Button>
        </a>
        <h1 className="text-2xl font-bold">Unterschrift</h1>
      </div>

      {/* Info Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Auftrag</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Projekt:</span>
            <span className="font-medium">Frauenstiftgasse 7</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Datum:</span>
            <span className="font-medium">12.03.2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Kamine:</span>
            <span className="font-medium">14 Stück</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <Badge variant="outline" className="text-orange-600">
              {unterschrift ? "Signiert" : "Ausstehend"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Kunde Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Kunde</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div>
                <Label>Firma</Label>
                <Input value={kundeFirma} onChange={(e) => setKundeFirma(e.target.value)} />
              </div>
              <div>
                <Label>Ansprechpartner</Label>
                <Input value={kundeName} onChange={(e) => setKundeName(e.target.value)} />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={kundeEmail} onChange={(e) => setKundeEmail(e.target.value)} />
              </div>
              <Button onClick={() => setIsEditing(false)}>Speichern</Button>
            </>
          ) : (
            <>
              <p><span className="font-medium">Firma:</span> {kundeFirma}</p>
              <p><span className="font-medium">Ansprechpartner:</span> {kundeName}</p>
              <p><span className="font-medium">Email:</span> {kundeEmail}</p>
              <Button variant="outline" onClick={() => setIsEditing(true)}>Bearbeiten</Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Unterschrift Bereich */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Digitale Unterschrift</CardTitle>
        </CardHeader>
        <CardContent>
          {unterschrift ? (
            <div>
              <img src={unterschrift} alt="Unterschrift" className="border rounded-lg w-full mb-4" />
              <Button variant="outline" className="w-full" onClick={clearSignature}>
                Neue Unterschrift
              </Button>
            </div>
          ) : (
            <div>
              <div className="border-2 border-gray-300 rounded-lg h-48 bg-white mb-4">
                <SignatureCanvas
                  ref={sigCanvas}
                  canvasProps={{
                    className: "w-full h-full rounded-lg",
                    style: { width: "100%", height: "100%" }
                  }}
                  backgroundColor="white"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={clearSignature}>
                  Löschen
                </Button>
                <Button className="flex-1" onClick={saveSignature}>
                  Bestätigen
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Buttons */}
      <div className="flex gap-3">
        <a href="/kamine" className="flex-1">
          <Button variant="outline" className="w-full">
            Zurück
          </Button>
        </a>
        <Button 
          className="flex-1 bg-green-600 hover:bg-green-700"
          onClick={sendEmail}
          disabled={!unterschrift}
        >
          📧 Senden & PDF
        </Button>
      </div>
    </div>
  )
}