'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"

export default function BestaetigungPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => window.history.back()}>
          ←
        </Button>
        <h1 className="text-2xl font-bold">Bestätigung</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Dokument bestätigen</CardTitle>
          <CardDescription>Geben Sie den Bestätigungscode ein</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="code">Bestätigungscode</Label>
            <Input id="code" placeholder="z.B. IMP-20260312-001" />
          </div>

          <Button className="w-full">
            Bestätigen
          </Button>
        </CardContent>
      </Card>

      {/* Beispiel für bestätigtes Dokument */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <CardTitle className="text-green-700">Bestätigt</CardTitle>
          </div>
          <CardDescription className="text-green-600">
            Dieses Dokument wurde digital signiert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><span className="font-medium">Dokument:</span> Frauenstiftgasse 7 - 12.03.2026</p>
          <p><span className="font-medium">Signiert von:</span> Hans Mueller (XYZ Bau GmbH)</p>
          <p><span className="font-medium">Datum:</span> 12.03.2026 14:32</p>
          <p><span className="font-medium">Code:</span> IMP-20260312-001</p>
          
          <div className="pt-4">
            <Button variant="outline" className="w-full">
              📄 PDF anzeigen
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}