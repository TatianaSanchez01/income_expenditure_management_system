import React from 'react'
import { useSession } from 'next-auth/react'
import { Enum_RoleName } from '@prisma/client'

function Private({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles: Enum_RoleName[]
}) {
  const { data: session, status } = useSession() as any

  const role = session?.user?.role

  if (allowedRoles.includes(role)) {
    return <>{children}</>
  } else {
    return <></>
  }
}

export default Private
