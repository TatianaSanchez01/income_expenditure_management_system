import HomeCard from '@/components/molecules/HomeCard';

const pages = [
  {
    title: 'Sistema de Gestión de Ingresos y Gastos',
    description: 'Panel principal para la gestión de ingresos y egresos.',
    url: '/ingresos-gastos',
  },

  {
    title: 'Gestión de Usuarios',
    description: 'Sección para administrar los usuarios del sistema.',
    url: '/usuarios',
  },

  {
    title: 'Reportes',
    description: 'Sección para visualizar reportes y estadísticas.',
    url: '/reportes',
  },
];

export default function Home() {
  return (
    <>
      {pages.map((page) => (
        <HomeCard
          key={page.title}
          title={page.title}
          description={page.description}
          url={page.url}
        />
      ))}
    </>
  );
}
