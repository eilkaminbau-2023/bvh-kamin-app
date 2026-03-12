"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"

interface Projekt {
  id: number
  name: string
  adresse: string
  kunde: string
  yetkili: string
  email: string
  telefon: string
}

export default function ProjektDetailPage({ params }: { params: { id: string } }) {
  const [projekt, setProjekt] = useState<Projekt>({
    id: parseInt(params.id),
    name: "Frauenstiftgasse 7",
    adresse: "Wien 1020",
    kunde: "XYZ Bau GmbH",
    yetkili: "Hans Mueller",
    email: "hans@xyz-bau.at",
    telefon: "+43 123 456 789"
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedProjekt, setEditedProjekt] = useState(projekt)

  useEffect(() => {
    // Gerçek uygulamada veritabanından çekilecek
    setEditedProjekt(projekt)
  }, [projekt])

  const saveChanges = () => {
    setProjekt(editedProjekt)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center mb-6">
        <a href="/projekte">
          <Button variant="ghost" size="sm">←</Button>
        </a>
        <h1 className="text-2xl font-bold ml-2">{projekt.name}</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Projekt Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div>
                <Label>Projektname</Label>
                <Input value={editedProjekt.name} onChange={e => setEditedProjekt({...editedProjekt, name: e.target.value})} />
              </div>
              <div>
                <Label>Adresse</Label>
                <Input value={editedProjekt.adresse} onChange={e => setEditedProjekt({...editedProjekt, adresse: e.target.value})} />
              </div>
              <div>
                <Label>Kunde</Label>
                <Input value={editedProjekt.kunde} onChange={e => setEditedProjekt({...editedProjekt, kunde: e.target.value})} />
              </div>
              <div>
                <Label>Ansprechpartner</Label>
                <Input value={editedProjekt.yetkili} onChange={e => setEditedProjekt({...editedProjekt, yetkili: e.target.value})} />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={editedProjekt.email} onChange={e => setEditedProjekt({...editedProjekt, email: e.target.value})} />
              </div>
              <div>
                <Label>Telefon</Label>
                <Input value={editedProjekt.telefon} onChange={e => setEditedProjekt({...editedProjekt, telefon: e.target.value})} />
              </div>
            </>
          ) : (
            <>
              <p><span className="font-medium">Adresse:</span> {projekt.adresse}</p>
              <p><span className="font-medium">Kunde:</span> {projekt.kunde}</p>
              <p><span className="font-medium">Ansprechpartner:</span> {projekt.yetkili}</p>
              <p><span className="font-medium">Email:</span> {projekt.email}</p>
              <p><span className="font-medium">Telefon:</span> {projekt.telefon}</p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Letzte Listen */}
      <h2 className="text-lg font-semibold mb-3">Letzte Listen</h2>
      <div className="space-y-3 mb-6">
        <Card>
          <CardContent className="p-4 flex justify-between">
            <div>
              <p className="font-medium">12.03.2026</p>
              <p className="text-sm">14 Kamine</p>
            </div>
            <a href="/unterschrift/1">
              <Button variant="outline" size="sm">Ansehen</Button>
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex justify-between">
            <div>
              <p className="font-medium">11.03.2026</p>
              <p className="text-sm">8 Kamine</p>
            </div>
            <a href="/unterschrift/2">
              <Button variant="outline" size="sm">Ansehen</Button>
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        {isEditing ? (
          <>
            <Button className="flex-1" onClick={saveChanges}>Speichern</Button>
            <Button variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>Abbrechen</Button>
          </>
        ) : (
          <>
            <Button className="flex-1" onClick={() => setIsEditing(true)}>✏️ Bearbeiten</Button>
            <a href="/neue-liste" className="flex-1">
              <Button className="w-full">➕ Neue Liste</Button>
            </a>
          </>
        )}
      </div>
    </div>
  )
}