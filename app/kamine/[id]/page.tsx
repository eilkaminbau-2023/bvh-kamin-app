'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export default function KaminDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => window.history.back()}>
          ←
        </Button>
        <h1 className="text-2xl font-bold">Kamin #{params.id}</h1>
      </div>

      {/* Projekt Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Kamin Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Projekt</p>
            <p className="font-medium">Frauenstiftgasse 7</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Datum</p>
            <p className="font-medium">12.03.2026</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <Badge className="bg-green-100 text-green-800">Erledigt</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Arbeiten */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Durchgeführte Arbeiten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="ausschleifen" checked />
            <label htmlFor="ausschleifen" className="text-sm font-medium">Ausschleifen</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="uberdach" checked />
            <label htmlFor="uberdach" className="text-sm font-medium">Überdach Ausschleifen</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="putztuer" checked />
            <label htmlFor="putztuer" className="text-sm font-medium">Putztür</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="montiert" />
            <label htmlFor="montiert" className="text-sm font-medium">Putztür montiert</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="vermauert" />
            <label htmlFor="vermauert" className="text-sm font-medium">Kehrtür vermauert</label>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-500">Höhe (m)</p>
            <p className="text-lg font-semibold">5.9 m</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Anmerkung</p>
            <p className="text-sm">Schornstein wurde gereinigt</p>
          </div>
        </CardContent>
      </Card>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          ✏️ Bearbeiten
        </Button>
        <Button className="flex-1">
          📋 Kopieren
        </Button>
      </div>
    </div>
  )
}