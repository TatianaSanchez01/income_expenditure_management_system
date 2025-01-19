import { AppSidebar } from '@/components/molecules/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

export default function Home() {
  const currentLink = usePathname();
  console.log(currentLink);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href='#'>GastoControl</BreadcrumbLink>
              </BreadcrumbItem>
              {currentLink && (
                <>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='#'>GastoControl</BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>Texto interno</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
