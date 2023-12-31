'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import CloseButton from './CloseButton'

interface InterceptorModalProps {
  url: string
  children: React.ReactNode
}

export default function InterceptorModal({ url, children }: InterceptorModalProps) {


  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [rendering, setRendering] = useState<boolean>(true)

  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    setRendering(false)
    return () => { }
  }, [])

  useEffect(() => {
    setIsOpen(path === url)
  }, [path, url])

  const toggleModal = () => {
    router.back()
  }

  return (
    <>
      {isOpen && (
        <section className='backdrop-blur-sm inset-0 fixed top-0 right-0 w-full h-full grid py-8 items-center justify-center z-50 overscroll-y-none overflow-y-scroll'>
          <div className={`grid relative z-20 border-theme-primary border-2 rounded-lg shadow-sm shadow-theme-secondary bg-white w-auto h-auto
      transition-all duration-500 ${rendering ? 'opacity-0 left-32' : 'opacity-100 left-0'}`}>
            {children}
            {<CloseButton className='text-black h-10 w-10' onClick={toggleModal} />}
          </div>
        </section>
      )}
    </>
  )
}




