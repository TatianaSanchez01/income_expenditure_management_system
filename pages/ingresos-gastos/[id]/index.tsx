import { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { GET_TRANSACTION_BY_ID } from '@/utils/gql/queries/transactions'
import { UPSERT_TRANSACTION } from '@/utils/gql/mutations/transactions'
import { GET_USER_BY_EMAIL } from '@/utils/gql/queries/users'
import ReactLoading from 'react-loading'

import { useToast } from '@/hooks/use-toast'

const FormSchema = z.object({
  amount: z.number(),
  description: z.string().trim().min(1, 'Ingrese un descripción válido'),
  date: z.string().date(),
})

export async function getServerSideProps(context: { params: { id: string } }) {
  const id = context.params.id
  return {
    props: { id },
  }
}

const Index = ({ id }: { id: string }) => {
  const isNewTransaction = id === 'new'
  const { data: session, status } = useSession() as any
  const { toast } = useToast()
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)

  const [transaction, setTransactionData] = useState({
    amount: 0,
    description: '',
    date: new Date().toISOString(),
  })

  const [date, setDate] = useState<Date>(new Date('01/01/2024'))

  const [getTransaction, { loading: querieLoading }] = useLazyQuery(
    GET_TRANSACTION_BY_ID,
    {
      fetchPolicy: 'network-only',
      onCompleted(data) {
        setTransactionData({
          amount: data.transaction.amount,
          description: data.transaction.description,
          date: new Date(data.transaction.date).toISOString(),
        })

        setDate(new Date(data.transaction.date))
      },
    }
  )

  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setUserId(data.getUserByEmail.id)
    },
  })

  const [upsertTransaction, { loading: mutationLoading }] =
    useMutation(UPSERT_TRANSACTION)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      description: '',
      date: new Date().toISOString(),
    },
  })

  useEffect(() => {
    if (id !== 'new') {
      getTransaction({ variables: { transactionId: id } })
    } else {
      getUserByEmail({ variables: { email: session?.user?.email } })
    }
  }, [id])

  useEffect(() => {
    if (transaction) {
      form.reset({
        ...transaction,
        date: new Date(transaction.date).toISOString().slice(0, 10),
      })
    }
  }, [transaction])

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const formData = {
      amount: values.amount,
      description: values.description,
      date: new Date(date).toISOString(),
    }

    const data = {
      create: {
        userId: userId ?? '',
        amount: values.amount,
        description: values.description,
        date: new Date(date).toISOString(),
      },
      update: formData,
    }

    toast({
      variant: 'default',
      title: 'Procesando...',
      description: 'Por favor, espere mientras se procesa la transacción.',
    })

    await upsertTransaction({
      variables: {
        where: {
          id: id === 'new' ? '' : id,
        },
        data,
      },
    })
      .then(() => {
        console.log('success')
        toast({
          variant: 'default',
          title: isNewTransaction
            ? 'Transacción creada'
            : 'Transacción actualizada',
          description: isNewTransaction
            ? 'La transacción ha sido creada con éxito.'
            : 'La transacción ha sido actualizada con éxito.',
        })
        router.push('/ingresos-gastos')
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

  if (querieLoading || mutationLoading)
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

  const handleRedirect = () => {
    router.push('/ingresos-gastos')
  }

  if (status === 'loading') {
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
  }

  if (session?.user?.role !== 'ADMIN') {
    setTimeout(() => {
      window.location.href = '/ingresos-gastos'
    }, 3000)

    return (
      <div className="flex items-center justify-center">
        <h1 className="text-4xl text-gray-500">
          No tienes permisos para acceder a esta página. Redirigiendo...
        </h1>
      </div>
    )
  }

  return (
    <div className="flex gap-5">
      <Card className="w-full h-fit bg-white shadow-lg rounded-lg border border-gray-200">
        <CardHeader className=" px-6 py-5">
          <CardTitle className="text-xl font-bold text-gray-800">
            {isNewTransaction
              ? 'Agregar un nuevo movimiento'
              : 'Editar movimiento'}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                      Concepto
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={transaction?.description ?? ''}
                        onChange={(e) => {
                          setTransactionData({
                            ...transaction,
                            description: e.target.value,
                          })
                        }}
                        type="text"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                      Monto
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={transaction?.amount ?? '0'}
                        onChange={(e) => {
                          setTransactionData({
                            ...transaction,
                            amount: parseFloat(e.target.value),
                          })
                        }}
                        type="text"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="date"
                        type="date"
                        placeholder="Fecha"
                        value={date?.toISOString().slice(0, 10) ?? ''}
                        onChange={(e) => {
                          const newDate = new Date(e.target.value)
                          setDate(newDate)
                          field.onChange(newDate.toISOString())
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-5">
                <Button
                  type="submit"
                  className="px-6 py-2 font-medium rounded-md shadow"
                >
                  Guardar
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleRedirect}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Index
