import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import {
  CircleUser,
  HandCoins,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '../ui/breadcrumb';

const data = {
  navMain: [
    {
      title: 'Sistema de Gestión de Ingresos y Gastos',
      url: '#',
      items: [
        {
          title: 'Ingresos y egresos',
          url: '/ingresos-egresos',
        },
        {
          title: 'Usuarios',
          url: '/usuarios',
        },
        {
          title: 'Reportes',
          url: '/reportes',
        },
      ],
    },
  ],
};

const Navbar = () => {
  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <div className='w-full flex-1'>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Inicio</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='icon' className='rounded-full'>
            <CircleUser className='h-5 w-5' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Navbar;
