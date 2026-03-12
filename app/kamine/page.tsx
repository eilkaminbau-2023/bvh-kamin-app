"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Column {
  id: string
  name: string
}

interface Row {
  id: number
  [key: string]: string | number
}

export default function KaminePage() {
  const [listTitle, setListTitle] = useState("Kaminhöhe Liste")

  const [columns, setColumns] = useState<Column[]>([
    { id: "col1", name: "Sütun 1" },
    { id: "col2", name: "Sütun 2" },
    { id: "col3", name: "Sütun 3" },
    { id: "col4", name: "Sütun 4" },
    { id: "col5", name: "Sütun 5" },
    { id: "col6", name: "Sütun 6" },
    { id: "col7", name: "Höhe (m)" },
  ])

  const [rows, setRows] = useState<Row[]>([
    { id: 1 }
  ])

  const [projektInfo, setProjektInfo] = useState({
    name: "Frauenstiftgasse 7",
    adresse: "Wien 1020",
    datum: new Date().toLocaleDateString('de-DE')
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const projekt = params.get('projekt')
    const datum = params.get('datum')
    if (projekt) {
      setProjektInfo(prev => ({
        ...prev,
        name: projekt === "frauenstift" ? "Frauenstiftgasse 7" : 
              projekt === "baumergasse" ? "Baumergasse 25" : "Mariahilfer Straße 42",
        datum: datum ? new Date(datum).toLocaleDateString('de-DE') : new Date().toLocaleDateString('de-DE')
      }))
    }
  }, [])

  useEffect(() => {
    const updatedRows = rows.map(row => {
      const newRow: Row = { id: row.id }
      columns.forEach(col => {
        newRow[col.id] = row[col.id] || ""
      })
      return newRow
    })
    setRows(updatedRows)
  }, [columns])

  const addRow = () => {
    const newId = Math.max(...rows.map(r => r.id), 0) + 1
    const newRow: Row = { id: newId }
    columns.forEach(col => {
      newRow[col.id] = ""
    })
    setRows([...rows, newRow])
  }

  const deleteRow = (id: number) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id))
    }
  }

  const addColumn = () => {
    const newColId = `col${columns.length + 1}`
    const newColName = `Sütun ${columns.length + 1}`
    setColumns([...columns, { id: newColId, name: newColName }])
    
    setRows(rows.map(row => {
      const newRow = { ...row }
      newRow[newColId] = ""
      return newRow
    }))
  }

  const deleteColumn = (colId: string) => {
    if (columns.length > 1) {
      setColumns(columns.filter(col => col.id !== colId))
      setRows(rows.map(row => {
        const newRow = { ...row }
        delete newRow[colId]
        return newRow
      }))
    }
  }

  const updateCell = (rowId: number, colId: string, value: string) => {
    setRows(rows.map(row => 
      row.id === rowId ? { ...row, [colId]: value } : row
    ))
  }

  const updateColumnName = (colId: string, newName: string) => {
    setColumns(columns.map(col => 
      col.id === colId ? { ...col, name: newName } : col
    ))
  }

  const calculateTotal = () => {
    const heightCol = columns.find(c => c.name.includes("Höhe"))?.id || "col7"
    const total = rows.reduce((sum, row) => {
      const val = parseFloat(row[heightCol] as string) || 0
      return sum + val
    }, 0)
    return total.toFixed(2)
  }

  const exportToExcel = () => {
    let csv = columns.map(c => c.name).join(",") + "\n"
    rows.forEach(row => {
      const line = columns.map(col => row[col.id] || "").join(",")
      csv += line + "\n"
    })
    
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `kamin-liste-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const exportToPdf = () => {
    Promise.all([
      import('jspdf'),
      import('jspdf-autotable')
    ]).then(([jsPDFModule, autoTableModule]) => {
      const jsPDF = jsPDFModule.default
      const autoTable = autoTableModule.default
      const doc = new jsPDF({ orientation: 'landscape' })
    
      // BAŞLIK: BVH
      doc.setFontSize(18)
      doc.text("BVH", 14, 20)
      
      // PROJE BİLGİLERİ
      doc.setFontSize(12)
      doc.text(projektInfo.name, 14, 30)
      doc.text(projektInfo.adresse, 14, 38)
      doc.text(`Datum: ${projektInfo.datum}`, 14, 46)
      
      // LİSTE BAŞLIĞI
      doc.setFontSize(14)
      doc.text(listTitle, 14, 58)
      
      // TABLO BAŞLIKLARI
      const tableColumn = columns.map(col => col.name)
      
      // TABLO SATIRLARI
      const tableRows = rows.map(row => 
        columns.map(col => row[col.id] || "")
      )
      
      // TABLO
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 65,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] }
      })
      
      // TABLONUN BİTİŞ Y KOORDİNATI
      const finalY = (doc as any).lastAutoTable?.finalY || 65
      
      // Höhe sütununun X koordinatını hesapla
      // Varsayılan sütun genişlikleri: ilk sütun (sıra no) 20px, sonra her sütun 30px
      const colWidth = 30
      const startX = 20 // Sıra numarası sütunu
      const heightColIndex = 7 // Höhe sütunu 7. sırada (index 6)
      const heightColX = startX + (heightColIndex * colWidth) + 5
      
      // GESAMT - HÖHE SÜTUNUNUN ALTINDA
      doc.setFontSize(10)
      doc.setTextColor(0, 0, 0) // SİYAH
      doc.text(`Gesamt: ${calculateTotal()} m`, heightColX, finalY + 10)
      
      // PDF KAYDET
      doc.save(`kamin-liste-${projektInfo.name.split(' ')[0]}-${new Date().toISOString().split('T')[0]}.pdf`)
    }).catch(error => {
      console.error("PDF Fehler:", error)
      alert("PDF konnte nicht erstellt werden")
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* ÜST KISIM */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <a href="/neue-liste">
            <Button variant="ghost" size="sm">←</Button>
          </a>
          <h1 className="text-2xl font-bold ml-2">Kamin Liste</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">⋯</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={addColumn}>Spalte hinzufügen</DropdownMenuItem>
            <DropdownMenuItem onClick={exportToExcel}>Excel Export</DropdownMenuItem>
            <DropdownMenuItem onClick={exportToPdf}>PDF Export</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* PROJE BİLGİLERİ VE LİSTE BAŞLIĞI */}
      <div className="mb-4 p-3 bg-white rounded-lg border space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">BVH</span>
          <span>{projektInfo.name}</span>
        </div>
        <p className="text-sm">{projektInfo.adresse}</p>
        <p className="text-sm">Datum: {projektInfo.datum}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Liste:</span>
          <Input 
            value={listTitle} 
            onChange={(e) => setListTitle(e.target.value)}
            className="h-8 text-sm max-w-xs"
          />
        </div>
      </div>

      {/* TABLO */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              {columns.map(col => (
                <th key={col.id} className="p-2 border relative">
                  <div className="flex items-center justify-between">
                    <Input 
                      value={col.name} 
                      onChange={(e) => updateColumnName(col.id, e.target.value)}
                      className="w-24 h-8 text-sm"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 ml-1"
                      onClick={() => deleteColumn(col.id)}
                    >
                      ✕
                    </Button>
                  </div>
                </th>
              ))}
              <th className="p-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="border-b">
                <td className="p-2 border text-center">{index + 1}</td>
                {columns.map(col => (
                  <td key={col.id} className="p-2 border">
                    <Input 
                      value={row[col.id] as string || ""} 
                      onChange={(e) => updateCell(row.id, col.id, e.target.value)}
                      className="w-24"
                      type={col.name.includes("Höhe") ? "number" : "text"}
                      step={col.name.includes("Höhe") ? "0.1" : undefined}
                    />
                  </td>
                ))}
                <td className="p-2 border">
                  <Button variant="ghost" size="sm" onClick={() => deleteRow(row.id)}>
                    ✕
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOPLAM VE BUTONLAR */}
      <div className="mt-4 space-y-3">
        <div className="text-right font-semibold">
          Gesamt: {calculateTotal()} m
        </div>

        <Button onClick={addRow} variant="outline" className="w-full">
          + Zeile hinzufügen
        </Button>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={exportToExcel}>
            📊 Excel
          </Button>
          <Button variant="outline" className="flex-1" onClick={exportToPdf}>
            📄 PDF
          </Button>
          <a href="/unterschrift/1" className="flex-1">
            <Button className="w-full">✍️ Unterschrift</Button>
          </a>
        </div>
      </div>
    </div>
  )
}