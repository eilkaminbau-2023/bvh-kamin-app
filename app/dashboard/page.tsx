export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">EILKAMIN BAU GMBH</h1>
        <a href="/benutzer">
          <Button variant="ghost" size="sm" className="text-gray-600">
            👤 Ahmet Usta
          </Button>
        </a>
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
            <a href="/unterschrift/1" className="block">
              <div className="p-3 bg-white border rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50">
                <div>
                  <p className="font-medium">Frauenstiftgasse 7</p>
                  <p className="text-sm text-gray-600">14 Kamine · 12.03.2026</p>
                </div>
                <Badge variant="outline" className="text-orange-600">wartet</Badge>
              </div>
            </a>
            <a href="/unterschrift/2" className="block">
              <div className="p-3 bg-white border rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50">
                <div>
                  <p className="font-medium">Baumergasse 25</p>
                  <p className="text-sm text-gray-600">8 Kamine · 11.03.2026</p>
                </div>
                <Badge variant="outline" className="text-orange-600">wartet</Badge>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Heute */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">📅 Heute (12.03.2026)</CardTitle>
        </CardHeader>
        <CardContent>
          <a href="/kamine" className="block">
            <div className="p-3 bg-white border rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Frauenstiftgasse 7</p>
                  <p className="text-sm text-gray-600">14 Kamine</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">in Arbeit</Badge>
              </div>
            </div>
          </a>
        </CardContent>
      </Card>

      {/* Neue Liste Button */}
      <a href="/neue-liste" className="block w-full">
        <Button className="w-full mb-6" size="lg">
          ➕ NEUE LISTE
        </Button>
      </a>

      {/* Schnellzugriff */}
      <div className="grid grid-cols-2 gap-3">
        <a href="/projekte" className="w-full">
          <Button variant="outline" className="h-20 w-full flex flex-col">
            <span className="text-xl mb-1">📋</span>
            <span>Projekte</span>
          </Button>
        </a>
        <a href="/kamine" className="w-full">
          <Button variant="outline" className="h-20 w-full flex flex-col">
            <span className="text-xl mb-1">🏭</span>
            <span>Kamine</span>
          </Button>
        </a>
        <a href="/unterschrift" className="w-full">
          <Button variant="outline" className="h-20 w-full flex flex-col">
            <span className="text-xl mb-1">✍️</span>
            <span>Unterschriften</span>
          </Button>
        </a>
        <a href="/benutzer" className="w-full">
          <Button variant="outline" className="h-20 w-full flex flex-col">
            <span className="text-xl mb-1">👤</span>
            <span>Profil</span>
          </Button>
        </a>
      </div>
    </div>
  )
}