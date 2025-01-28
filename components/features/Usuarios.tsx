import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { UserRoundPlus } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useMutation, useQuery } from '@apollo/client';
import ReactLoading from 'react-loading';
import { GET_USERS } from '@/utils/gql/queries/users';
import { DELETE_USER } from '@/utils/gql/mutations/users';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useToast } from '@/hooks/use-toast';

function Usuarios() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { toast } = useToast();

  const [deleteUser, { loading: mutationLoading }] = useMutation(DELETE_USER);

  useQuery(GET_USERS, {
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      setUsers(data.users);
    },
  });

  async function onDelete(id: string) {
    await deleteUser({
      variables: {
        where: {
          id,
        },
      },
    })
      .then((data) => {
        console.log('success');
        const response = data.data.deleteUser;
        toast({
          variant: 'default',
          title: 'El usuario fue eliminado con éxito.',
          description: `El usuario ${response.name} fue eliminado con éxito.`,
        })
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: 'destructive',
          title: 'Error al eliminar el usuario.',
          description: 'Ocurrió un error al eliminar el usuario.',
        });
      });
  }

  if (mutationLoading)
    return (
      <div className='flex items-center justify-center'>
        <ReactLoading
          type='bubbles'
          color='#3B82F6'
          height={'20%'}
          width={'20%'}
        />
      </div>
    );

  return (
    <Card>
      <CardHeader className='px-7 flex-row flex items-center justify-between'>
        <div>
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>Lista de usuarios del sistema</CardDescription>
        </div>
        <Button
          onClick={() => router.push('/usuarios/new')}
          className='px-7 flex gap-4'
          variant='default'
        >
          Nuevo
          <UserRoundPlus />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className='hidden sm:table-cell'>Correo</TableHead>
              <TableHead className='hidden sm:table-cell'>Teléfono</TableHead>
              <TableHead className='hidden sm:table-cell'>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow className='bg-accent' key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {user.email}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {user.phone || '--'}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <div className='flex flex-row gap-5'>
                    <Badge
                      onClick={() => router.push(`/usuarios/${user.id}`)}
                      className='text-xs justify-center w-24 cursor-pointer'
                      variant='default'
                    >
                      Edit
                    </Badge>
                    <Badge
                      className='text-xs justify-center w-24 cursor-pointer'
                      variant='default'
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Usuarios;
