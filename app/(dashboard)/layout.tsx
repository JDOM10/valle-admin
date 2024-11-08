"use client"

import Navbar from "@/components/navbar"
import { useAuth } from "@clerk/nextjs"
import { redirect } from 'next/navigation'
export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const {userId} = useAuth();
    if (!userId) {
      redirect('/sign-in')
    } else {
    return (    
      <div>      
      <Navbar/>        
          <>{children}</>      
      </div>
    ) }
  }