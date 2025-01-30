import React, { useEffect, useState } from 'react'

import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import ReportChart from '../atoms/report-chart'
import { Download } from 'lucide-react'
import { useQuery } from '@apollo/client'
import { GET_FINANCIAL_REPORT } from '@/utils/gql/queries/transactions'
import ReactLoading from 'react-loading'
import { formatDate } from '@/utils/formatDate'
import { formatAmount } from '@/utils/formatAmount'
import { useToast } from '@/hooks/use-toast'

export interface ChartData {
  amount: number
  user: { name: string }
  description: string
  date: string
}

function Reportes() {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useQuery(GET_FINANCIAL_REPORT, {
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      const formattedData = data.transactions.map((item: ChartData) => ({
        ...item,
        date: formatDate(item.date),
      }))
      setChartData(formattedData)
    },
  })

  useEffect(() => {
    const total = chartData.reduce((acc, item) => acc + item.amount, 0)
    setAmount(total)
    setLoading(false)
  }, [chartData])

  // Función para convertir los datos a CSV y descargarlos
  const downloadCSV = () => {
    // Cabecera del CSV
    const header = ['Fecha', 'Monto', 'Descripcion', 'Usuario']
    // Datos a exportar
    const rows = chartData.map((data) => [
      data.date,
      formatAmount(data.amount),
      data.description || 'Sin descripcion',
      data.user.name || 'Sin usuario',
    ])

    // Calcular el saldo total
    const totalAmount = chartData.reduce((acc, data) => acc + data.amount, 0)
    const totalRow = ['Saldo total', formatAmount(totalAmount), ''] // La fila con el total

    // Unir la cabecera y las filas
    const csvContent = [
      header.join(','), // Crear una fila con las cabeceras
      ...rows.map((row) => row.join(',')), // Unir las filas con comas
      totalRow.join(','), // Añadir la fila del saldo total
    ].join('\n') // Unir todo con saltos de línea

    // Crear un Blob con el contenido del CSV
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob) // Crear un enlace a este Blob
    const link = document.createElement('a') // Crear un enlace HTML
    link.href = url // Establecer el href como el enlace del archivo Blob
    link.download = 'reporte_financiero.csv' // Establecer el nombre del archivo
    link.click() // Simular un clic para iniciar la descarga
    URL.revokeObjectURL(url) // Liberar la URL creada

    toast({
      variant: 'default',
      title: 'El reporte se generó con éxito.',
      description: 'El archivo csv fue generado con éxito.',
    })
  }

  return (
    <div className="flex flex-wrap gap-6">
      {/* Sección del gráfico */}
      <div className="flex-1 min-w-[300px]">
        <Card className="p-2 shadow-md">
          <CardHeader>
            <CardTitle>Resumen Financiero</CardTitle>
            <CardDescription>
              Esta sección muestra un resumen financiero con un gráfico
              interactivo y opciones para descargar los datos en formato CSV.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <ReactLoading
                type="bubbles"
                color="#3B82F6"
                height={'20%'}
                width={'20%'} 
              />
            ) : (
              <ReportChart chartData={chartData} />
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="flex-1 max-w-sm mx-auto">
        <CardContent className="flex flex-col gap-10 items-center p-6">
          {loading ? (
            <ReactLoading
              type="bubbles"
              color="#3B82F6"
              height={'20%'}
              width={'20%'}
            />
          ) : (
            <>
              <div className="text-center">
                <span className="block text-xl text-gray-500">Saldo Total</span>
                <span className="block text-3xl font-bold text-blue-600">
                  {formatAmount(amount)}
                </span>
              </div>
              <Button
                className="flex items-center justify-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700"
                onClick={downloadCSV}
              >
                <Download className="mr-2 h-5 w-5" />
                Descargar CSV
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Reportes
