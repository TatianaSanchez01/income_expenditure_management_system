'use client'
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { useRouter } from 'next/router'
import { Badge } from '../ui/badge'
import { PackagePlus } from 'lucide-react'
import { GET_TRANSACTIONS } from '@/utils/gql/queries/transactions'
import { useMutation, useQuery } from '@apollo/client'
import ReactLoading from 'react-loading'
import { DELETE_TRANSACTION } from '@/utils/gql/mutations/transactions'
import { formatDate } from '@/utils/formatDate'
import { formatAmount } from '@/utils/formatAmount'
import { useToast } from '@/hooks/use-toast'
import Private from '../organism/Private'

function IngresosGastos() {
  const { toast } = useToast()

  const router = useRouter()
  const [ingresosData, setIngresosData] = useState([])
  const [deleteTransaction, { loading: mutationLoading }] =
    useMutation(DELETE_TRANSACTION)

  useQuery(GET_TRANSACTIONS, {
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      setIngresosData(data.transactions)
    },
  })

  async function onDelete(id: string) {
    await deleteTransaction({
      variables: {
        where: {
          id,
        },
      },
    })
      .then((data) => {
        console.log('success')
        const response = data.data.deleteTransaction
        toast({
          variant: 'default',
          title: 'La transacción fue eliminada con éxito.',
          description: `La transacción ${response.description} ha sido eliminada correctamente de su historial.`,
        })
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        })
      })
  }

  if (mutationLoading)
    return (
      <div className="flex items-center justify-center">
        <ReactLoading
          type="bubbles"
          color="#3B82F6"
          height={'20%'}
          width={'20%'}
        />
      </div>
    )

  return (
    <Card>
      <CardHeader className="px-7 flex-row flex items-center justify-between">
        <div>
          <CardTitle>Ingresos y Gastos</CardTitle>
          <CardDescription>Lista de ingresos y gastos </CardDescription>
        </div>
        <Private allowedRoles={['ADMIN']}>
          <Button
            onClick={() => router.push('/ingresos-gastos/new')}
            className="px-7 flex gap-4"
            variant="default"
          >
            Nuevo
            <PackagePlus />
          </Button>
        </Private>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Concepto</TableHead>
              <TableHead className="hidden sm:table-cell">Monto</TableHead>
              <TableHead className="hidden sm:table-cell">Fecha</TableHead>
              <TableHead className="hidden sm:table-cell">Usuario</TableHead>
              <Private allowedRoles={['ADMIN']}>
                <TableHead className="hidden sm:table-cell">Acciones</TableHead>
              </Private>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingresosData.map((data: any) => (
              <TableRow className="bg-accent" key={data.id}>
                <TableCell>{data.description}</TableCell>
                <TableCell className="hidden sm:table-cell text-right">
                  {data.amount >= 0 ? (
                    <span className="text-green-900">
                      {formatAmount(data.amount)}
                    </span>
                  ) : (
                    <span className="text-red-900">
                      {formatAmount(data.amount)}
                    </span>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(data.date)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge className="text-xs" variant="outline">
                    {data.user.name}
                  </Badge>
                </TableCell>
                <Private allowedRoles={['ADMIN']}>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-row gap-5">
                      <Badge
                        onClick={() =>
                          router.push(`/ingresos-gastos/${data.id}`)
                        }
                        className="text-xs justify-center w-24 cursor-pointer"
                        variant="default"
                      >
                        Edit
                      </Badge>
                      <Badge
                        className="text-xs justify-center w-24 cursor-pointer"
                        variant="default"
                        onClick={() => onDelete(data.id)}
                      >
                        Delete
                      </Badge>
                    </div>
                  </TableCell>
                </Private>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default IngresosGastos
