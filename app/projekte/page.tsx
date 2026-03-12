"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface Projekt {
  id: number
  name: string
  adresse: string
  kunde: string
  yetkili: string
}

export default function ProjektePage() {
  const [projekte, setProjekte] = useState<Projekt[]>([
    { id: 1, name: "Frauenstiftgasse 7", adresse: "Wien 1020", kunde: "XYZ Bau", yetkili: "Hans Mueller" },
    { id: 2, name: "Baumergasse 25", adresse: "Wien 1030", kunde: "Bau GmbH", yetkili: "Franz Weber" },
  ])

  const [newProjekt, setNewProjekt] = useState({ name: "", adresse: "", kunde: "", yetkili: "" })
  const [showForm, setShowForm] = useState(false)

  const addProjekt = () => {
    if (newProjekt.name) {
      setProjekte([...projekte, { id: Date.now(), ...newProjekt }])
      setNewProjekt({ name: "", adresse: "", kunde: "", yetkili: "" })
      setShowForm(false)
    }
  }

  const deleteProjekt = (id: number) => {
    setProjekte(projekte.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center mb-6">
        <a href="/dashboard">
          <Button variant="ghost" size="sm">←</Button>
        </a>
        <h1 className="text-2xl font-bold ml-2">Projekte</h1>
      </div>

      <Input placeholder="Projekt suchen..." className="mb-4" />

      {projekte.map(p => (
        <Card key={p.id} className="mb-3">
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm">{p.adresse}</p>
                <p className="text-sm">{p.kunde} / {p.yetkili}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => deleteProjekt(p.id)}>✕</Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {showForm ? (
        <Card className="mt-4">
          <CardContent className="p-4 space-y-3">
            <Input placeholder="Projektname" value={newProjekt.name} onChange={e => setNewProjekt({...newProjekt, name: e.target.value})} />
            <Input placeholder="Adresse" value={newProjekt.adresse} onChange={e => setNewProjekt({...newProjekt, adresse: e.target.value})} />
            <Input placeholder="Kunde" value={newProjekt.kunde} onChange={e => setNewProjekt({...newProjekt, kunde: e.target.value})} />
            <Input placeholder="Yetkili" value={newProjekt.yetkili} onChange={e => setNewProjekt({...newProjekt, yetkili: e.target.value})} />
            <div className="flex gap-2">
              <Button onClick={addProjekt}>Speichern</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Abbrechen</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button className="w-full mt-4" onClick={() => setShowForm(true)}>➕ Neues Projekt</Button>
      )}
    </div>
  )
}