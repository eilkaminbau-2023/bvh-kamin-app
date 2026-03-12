"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export default function NeueListePage() {
  const [projekt, setProjekt] = useState("")
  const [datum, setDatum] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = () => {
    if (!projekt) {
      alert("Bitte Projekt auswählen")
      return
    }
    window.location.href = `/kamine?projekt=${projekt}&datum=${datum}`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center mb-6">
        <a href="/dashboard">
          <Button variant="ghost" size="sm">←</Button>
        </a>
        <h1 className="text-2xl font-bold ml-2">Neue Liste</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listendetails</CardTitle>
          <CardDescription>Projekt und Datum auswählen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Projekt */}
          <div className="space-y-2">
            <Label>Projekt *</Label>
            <Select value={projekt} onValueChange={setProjekt}>
              <SelectTrigger>
                <SelectValue placeholder="Projekt auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frauenstift">Frauenstiftgasse 7</SelectItem>
                <SelectItem value="baumergasse">Baumergasse 25</SelectItem>
                <SelectItem value="mariahilfer">Mariahilfer Straße 42</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Datum */}
          <div className="space-y-2">
            <Label>Datum</Label>
            <Input 
              type="date" 
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
            />
          </div>

          {/* Firma Info */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-medium">BVH Kamintechnik</p>
            <p className="text-sm text-gray-600">Ahmet Usta (Techniker)</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-3">
        <a href="/dashboard" className="flex-1">
          <Button variant="outline" className="w-full">Abbrechen</Button>
        </a>
        <Button className="flex-1" onClick={handleSubmit}>
          Liste erstellen
        </Button>
      </div>
    </div>
  )
}