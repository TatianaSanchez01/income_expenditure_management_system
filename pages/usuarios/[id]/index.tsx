import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '@/utils/gql/queries/users';
import { CREATE_USER, UPDATE_USER } from '@/utils/gql/mutations/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ReactLoading from 'react-loading';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { nanoid } from 'nanoid';
import { createUser } from '@/utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').optional(),
  phone: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']),
});

export async function getServerSideProps(context: { params: { id: string } }) {
  const id = context.params.id;
  return {
    props: { id },
  };
}

const Index = ({ id }: { id: string }) => {
  const isNewUser = id === 'new';
  const router = useRouter();
  const { toast } = useToast();

  const [userData, setUserData] = useState<{
    name: string;
    email?: string;
    phone?: string;
    role: 'USER' | 'ADMIN';
  }>({
    name: '',
    email: '',
    phone: '',
    role: 'USER',
  });

  const [getUser, { loading: queryLoading }] = useLazyQuery(GET_USER_BY_ID, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setUserData(data.user);
    },
  });

  const [userCreateMutation] = useMutation(CREATE_USER);
  const [userUpdateMutation, { loading: mutationLoading }] =
    useMutation(UPDATE_USER);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: userData,
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    if (isNewUser) {
      const password = nanoid();
      try {
        await createUser({
          name: values.name,
          email: values.email,
          password: password,
        }).then(async (res) => {
          const user = res.usuario;
          await userCreateMutation({
            variables: {
              data: {
                accounts: {
                  create: {
                    type: user.identities[0].provider,
                    provider: user.identities[0].provider,
                    providerAccountId: user.user_id,
                  },
                },
                name: user.name,
                role: user.role,
                phone: values.phone,
                email: user.email,
                image: user.picture,
              },
            },
          });
          toast({
            variant: 'default',
            title: 'Usuario creado con éxito.',
            description: `El usuario ${values.name} ha sido creado correctamente.`,
          });
          router.push('/usuarios');
        });
      } catch (e) {
        console.error(e);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
      }
    } else {
      await userUpdateMutation({
        variables: {
          where: { id },
          data: {
            name: { set: values.name },
            role: { set: values.role },
          },
        },
      });
      toast({
        variant: 'default',
        title: 'Usuario actualizado con éxito.',
        description: `El usuario ${values.name} ha sido actualizado correctamente.`,
      });
    }
  }

  useEffect(() => {
    if (!isNewUser) {
      getUser({ variables: { userId: id } });
    }
  }, [id]);

  useEffect(() => {
    if (userData) {
      form.reset(userData);
    }
  }, [userData, form]);

  if (queryLoading || mutationLoading) {
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
  }

  const handleRedirect = () => {
    router.push('/usuarios');
  };

  return (
    <div className='flex gap-5'>
      <Card className='w-full h-fit bg-white shadow-lg rounded-lg border border-gray-200'>
        <CardHeader className=' px-6 py-5'>
          <CardTitle className='text-xl font-bold text-gray-800'>
            {isNewUser ? 'Agregar un nuevo usuario' : 'Editar usuario'}
          </CardTitle>
        </CardHeader>
        <CardContent className='px-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {/* Name Field */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field (only for new users) */}
              {isNewUser && (
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input {...field} type='email' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Phone Field (only for new users) */}
              {isNewUser && (
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Role Field */}
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='w-[180px]'>
                          <SelectValue placeholder='Seleccione un rol' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value='USER'>Usuario</SelectItem>
                            <SelectItem value='ADMIN'>Administrador</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end gap-5'>
                <Button
                  type='submit'
                  className='px-6 py-2 font-medium rounded-md shadow'
                >
                  Guardar
                </Button>
                <Button
                  variant='outline'
                  type='button'
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
  );
};

export default Index;
