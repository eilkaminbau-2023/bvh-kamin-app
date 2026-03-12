'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">BVH KAMIN</h1>
        <Button variant="ghost" size="sm" className="text-gray-600">
          👤 Ahmet Usta
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">14</p>
            <p className="text-xs text-gray-600">Heute</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-gray-600">Ausstehend</p>
          </CardContent>
        </Card>
      </div>

      {/* Ausstehende Unterschriften */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">📋 Ausstehende Unterschriften</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="p-3 bg-white border rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">Frauenstiftgasse 7</p>
                <p className="text-sm text-gray-600">14 Kamine · 12.03.2026</p>
              </div>
              <Badge variant="outline" className="text-orange-600">wartet</Badge>
            </div>
            <div className="p-3 bg-white border rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">Baumergasse 25</p>
                <p className="text-sm text-gray-600">8 Kamine · 11.03.2026</p>
              </div>
              <Badge variant="outline" className="text-orange-600">wartet</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heute */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">📅 Heute (12.03.2026)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-white border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Frauenstiftgasse 7</p>
                <p className="text-sm text-gray-600">14 Kamine</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">in Arbeit</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Neue Liste Button */}
      <Button className="w-full mb-6" size="lg">
        ➕ NEUE LISTE
      </Button>

      {/* Schnellzugriff */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-20 flex flex-col">
          <span className="text-xl mb-1">📋</span>
          <span>Projekte</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col">
          <span className="text-xl mb-1">🏭</span>
          <span>Kamine</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col">
          <span className="text-xl mb-1">✍️</span>
          <span>Unterschriften</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col">
          <span className="text-xl mb-1">👤</span>
          <span>Profil</span>
        </Button>
      </div>
    </div>
  )
}