"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export default function BenutzerPage() {
  const [isEditing, setIsEditing] = useState(false)
  
  // Firma bilgileri
  const [firma, setFirma] = useState({
    name: "BVH Kamintechnik GmbH",
    adresse: "Musterstraße 123, 1020 Wien",
    telefon: "+43 1 234 567 890",
    website: "www.bvh-kamin.at",
    email: "office@eilkamin.at",
    uid: "ATU12345678"
  })

  // Kullanıcı bilgileri
  const [kullanici, setKullanici] = useState({
    name: "Ahmet Usta",
    email: "ahmet@bvh-kamin.at",
    rolle: "Techniker"
  })

  const [editedFirma, setEditedFirma] = useState(firma)
  const [editedKullanici, setEditedKullanici] = useState(kullanici)

  const handleSave = () => {
    setFirma(editedFirma)
    setKullanici(editedKullanici)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedFirma(firma)
    setEditedKullanici(kullanici)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <a href="/dashboard">
            <Button variant="ghost" size="sm" className="mr-2">
              ←
            </Button>
          </a>
          <h1 className="text-2xl font-bold">Mein Profil</h1>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            ✏️ Bearbeiten
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Abbrechen
            </Button>
            <Button onClick={handleSave}>
              Speichern
            </Button>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="text-2xl bg-blue-600 text-white">
            {kullanici.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Benutzer Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Persönliche Daten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input 
              value={isEditing ? editedKullanici.name : kullanici.name}
              onChange={(e) => setEditedKullanici({...editedKullanici, name: e.target.value})}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-100" : ""}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input 
              value={isEditing ? editedKullanici.email : kullanici.email}
              onChange={(e) => setEditedKullanici({...editedKullanici, email: e.target.value})}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-100" : ""}
            />
          </div>
          <div>
            <Label>Rolle</Label>
            <div className="mt-1">
              <Badge className="bg-blue-600">{kullanici.rolle}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Firma Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Firma Informationen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Firmenname</Label>
            <Input 
              value={isEditing ? editedFirma.name : firma.name}
              onChange={(e) => setEditedFirma({...editedFirma, name: e.target.value})}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-100" : ""}
            />
          </div>
          <div>
            <Label>Adresse</Label>
            <Input 
              value={isEditing ? editedFirma.adresse : firma.adresse}
              onChange={(e) => setEditedFirma({...editedFirma, adresse: e.target.value})}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-100" : ""}
            />
          </div>
          <div>
            <Label>Telefon</Label>
            <Input 
              value={isEditing ? editedFirma.telefon : firma.telefon}
              onChange={(e) => setEditedFirma({...editedFirma, telefon: e.target.value})}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-100" : ""}
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input 
              value={isEditing ? editedFirma.website : firma.website}
              onChange={(e) => setEditedFirma({...editedFirma, website: e.target.value})}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-100" : ""}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input 
              value={isEditing ? editedFirma.email : firma.email}
              onChange={(e) => setEditedFirma({...editedFirma, email: e.target.value})}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-100" : ""}
            />
          </div>
          <div>
            <Label>UID/VAT Nr.</Label>
            <Input 
              value={isEditing ? editedFirma.uid : firma.uid}
              onChange={(e) => setEditedFirma({...editedFirma, uid: e.target.value})}
              readOnly={!isEditing}
              className={!isEditing ? "bg-gray-100" : ""}
            />
          </div>
        </CardContent>
      </Card>

      {/* Letzte Aktivitäten */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Letzte Aktivitäten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="font-medium">12.03.2026 - 14:32</p>
              <p className="text-gray-600">Unterschrift: Frauenstiftgasse 7</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">12.03.2026 - 09:15</p>
              <p className="text-gray-600">Neue Liste erstellt: Baumergasse 25</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">11.03.2026 - 16:45</p>
              <p className="text-gray-600">Kamin #3 bearbeitet</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          🔑 Passwort ändern
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
          onClick={() => window.location.href = '/login'}
        >
          🚪 Abmelden
        </Button>
      </div>
    </div>
  )
}