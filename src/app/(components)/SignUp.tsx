'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { SignUpResult, useFirebaseAuthContext } from '@/contexts/FirebaseAuthContext'
import InputWithLabel from '@/app/(components)/ui/InputWithLabel'
import Button from '@/app/(components)/ui/Button'
import { SmallLoadingCircle } from '@/app/(components)/ui/LoadingCircle'

export default function SignUp() {

  const { user, signUp } = useFirebaseAuthContext()

  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean | null>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    setError(null)
    event.preventDefault()
    setIsLoading(true)
    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''
    // eslint-disable-next-line
    const { result, error }: SignUpResult = await signUp(email, password)

    if (error) {
      setError(error.code)
      return console.error(error)
    }
    setIsLoading(false)
  }

  if (user) return <></>

  return (

    <div className=' bg-white flex flex-col justify-center items-center w-full h-full'>
      <h2 className='my-4 text-center font-semibold text-24'>Registrar-se</h2>

      <form onSubmit={handleForm} className='w-full'>
        <fieldset className='grid gap-4 group w-full' disabled={isLoading! && !error}>
          {error
            ? (<div className='text-red-500'>{error}</div>)
            : (<span className='opacity-0 group-disabled:opacity-100 '>
              <SmallLoadingCircle className='h-10 w-10 border-theme-secondary-dark' />
            </span>)
          }
          <InputWithLabel icon='email' label='E-mail' autoComplete='email' required type='email' name='email' id='email' placeholder='example@mail.com' inputRef={emailRef} />

          <InputWithLabel icon='password' label='Senha' autoComplete='password' required type='password' name='password' id='password' placeholder='********' inputRef={passwordRef} />
          <span className='my-6 inline-flex items-center justify-center'>
            <Button type='submit' colorStyle='secondary' >
              <span className='group-disabled:opacity-0'>Registrar-se</span>
            </Button >
          </span>
          <Link href='/auth/entrar'><p className='text-center underline font-medium mobile:text-14'>Ja tem uma conta?<br />Clique aqui para entrar.</p></Link>
        </fieldset>
      </form>

    </div>

  )
}

