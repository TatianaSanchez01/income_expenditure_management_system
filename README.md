# Prueba Técnica para Desarrollador Fullstack Senior

## Introducción

El objetivo de esta prueba técnica es evaluar tus habilidades en el desarrollo de una aplicación fullstack. Deberás implementar un sistema de gestión de ingresos y egresos, la gestión de usuarios y la generación de reportes.

## Funcionalidades Principales del Proyecto

1. **Roles y Permisos**

   - **Roles:**
     - **Usuario:** Solo puede acceder a la gestión de movimientos.
     - **Administrador:** Puede ver los reportes, editar usuarios y agregar movimientos.

2. **Home**

   - Página de inicio con un menú principal que permite la navegación a tres secciones:
     - Sistema de gestión de ingresos y gastos (disponible para todos los roles)
     - Gestión de usuarios (solo para administradores)
     - Reportes (solo para administradores)

3. **Sistema de Gestión de Ingresos y Gastos**

   - **Vista de Ingresos y Egresos**
     - Implementar una tabla que muestre los ingresos y egresos registrados con las siguientes columnas:
       - Concepto
       - Monto
       - Fecha
       - Usuario
     - Botón "Nuevo" para agregar un nuevo ingreso o egreso (solo para administradores).
     - Botón "Editar" para editar un ingreso o egreso (solo para administradores).
     - Botón "Eliminar" para eliminar un registro (solo para administradores).
   - **Formulario de Nuevo Ingreso/Egreso**
     - Formulario con los campos:
       - Monto
       - Concepto
       - Fecha
     - Botón para guardar el nuevo movimiento.
     - Botón para cancelar movimiento.

4. **Gestión de Usuarios** (solo para administradores)

   - **Vista de Usuarios**
     - Tabla que muestre la lista de usuarios con las siguientes columnas:
       - Nombre
       - Correo
       - Teléfono
       - Acciones (editar usuario, eliminar usuario)
   - **Formulario de Edición de Usuario**
     - Formulario con los campos:
       - Nombre
       - Rol
     - Botón para guardar los cambios.
     - Botón para cancelar los cambios.
   - **Formulario de Nuevo Usuario**
     - Formulario con los campos:
       - Nombre
       - Correo
       - Teléfono
       - Rol
     - Botón para guardar los cambios.
     - Botón para canceñar los cambios.

5. **Reportes** (solo para administradores)
   - Mostrar un gráfico de movimientos financieros.
   - Mostrar el saldo actual.
   - Botón para descargar el reporte en formato CSV.

## Aspectos Técnicos

- **Tecnologías y Herramientas:**
  - **Frontend:**
    - Next.js utilizando `pages` router.
    - TypeScript.
    - Tailwind CSS.
    - Shadcn para componentes de la interfaz de usuario.
    - GraphQL con Apollo Client para queries y mutaciones.
  - **Backend:**
    - API GraphQL con Apollo Server implementada en una ruta de API de Next.js.
    - Base de datos de Postgres en Supabase.
  - **Protección de Datos:**
    - Implementar control de acceso basado en roles (RBAC) para asegurar que solo los usuarios autorizados puedan acceder a ciertas funcionalidades y datos.
    - Proteger el backend para que rechace conexiones no autenticadas.
  - **Autenticación:**
    - Utilizar [Authjs](https://authjs.dev/) con [Auth0](https://auth0.com/) como proveedor y [Prisma](https://prisma.io) como adaptador para la autenticación por sesiones de base de datos.
  - **Pruebas unitarias**
    - Se agregaron 3 pruebas unitarias con [Jest](https://jestjs.io/).
  - **Despliegue:**
    - Despliegue del proyecto en Vercel.

## Como desplegar el proyecto en local

  1. Clonar el repositorio:

    ```bash
    git clone https://github.com/TatianaSanchez01/income_expenditure_management_system.git
    ```

  2. Instalar las dependencias:

    ```bash
    cd income_expenditure_management_system
    npm install
    ```

  3. Ejecutar las migraciones:

    ```bash
    npx prisma migrate dev
    ```
  4. Iniciar el servidor:

    ```bash
    npm run dev
    ```
  5. Acceder a `http://localhost:3000` en tu navegador.

## Como desplegar el proyecto en vercel

  1. Crear una cuenta en [Vercel](https://vercel.com/).
  2. Instalar [Vercel CLI](https://vercel.com/download).
  3. Iniciar sesión en Vercel CLI:

    ```bash
    vercel login
    ```
  4. Desplegar el proyecto:

    ```bash
    vercel
    ```
  5. Configurar las variables de entorno en Vercel.
    5.2 Cambiar la variable `NEXTAUTH_URL` por la URL proporcionada por Vercel.
  6. Configurar el acceso del despliegue en Auth0.
  7. Acceder a la URL proporcionada por Vercel.
