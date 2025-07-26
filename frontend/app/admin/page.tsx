'use client'
import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Admin = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <>
      {isAuthenticated ?
        router.push('/admin/dashboard') :
        router.push('/admin/login')
      }
    </>
  )
}

export default Admin