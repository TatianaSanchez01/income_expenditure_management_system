import Reportes from '@/components/features/Reportes'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import ReactLoading from 'react-loading'

const Index = () => {
  const { data: session, status } = useSession() as any

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
      window.location.href = '/'
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
    <div>
      <Reportes />
    </div>
  )
}
export default Index
