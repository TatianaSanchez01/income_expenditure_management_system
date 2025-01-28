import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import {
  Bell,
  Home,
  LineChart,
  Users,
  Landmark,
  HandCoins,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const { data: session } = useSession();

  const location = useRouter();

  return (
    <div className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link href='/' className='flex items-center gap-2 font-semibold'>
            <HandCoins className='h-6 w-6' />
            <span className=''>GastoControl</span>
          </Link>
          <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
            <Bell className='h-4 w-4' />
            <span className='sr-only'>Toggle notifications</span>
          </Button>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            <Link
              href='/'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === '/'
                  ? 'bg-muted text-primary'
                  : 'text-muted-foreground'
              } hover:text-primary`}
            >
              <Home className='h-4 w-4' />
              Inicio
            </Link>
            
            <Link
              href='/ingresos-gastos'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === '/ingresos-gastos'
                  ? 'bg-muted text-primary'
                  : 'text-muted-foreground'
              } hover:text-primary`}
            >
              <Landmark className='h-4 w-4' />
              Ingresos y gastos
            </Link>
            <Link
              href='/usuarios'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === '/usuarios'
                  ? 'bg-muted text-primary'
                  : 'text-muted-foreground'
              } hover:text-primary`}
            >
              <Users className='h-4 w-4' />
              Usuarios
            </Link>
            <Link
              href='/reportes'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === '/reportes'
                  ? 'bg-muted text-primary'
                  : 'text-muted-foreground'
              } hover:text-primary`}
            >
              <LineChart className='h-4 w-4' />
              Reportes
            </Link>
          </nav>
        </div>
        <div className='mt-auto p-4'>
          <Card x-chunk='dashboard-02-chunk-0'>
            <CardHeader className='flex flex-row gap-5 justify-center items-center p-2 pt-0 md:p-4'>
              <div>
                <CardTitle>{session?.user?.name}</CardTitle>
                <CardTitle>Admin</CardTitle>
              </div>
              <Avatar>
                <AvatarImage
                  src={session?.user?.image ?? 'https://github.com/shadcn.png'}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className=' flex justify-center items-center p-2 pt-0 md:p-4 md:pt-0'></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
