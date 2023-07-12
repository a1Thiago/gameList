'use client'
import { Game } from '@/scripts/fetchGames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Accordion from '../Accordion'
import Button from '../Button'
import Heart from './Heart'
import Stars from './Stars'
import { useFirebaseDataContext } from '@/contexts/FirebaseDataContext'
import AuthMessage from './AuthMessage'
import CheckBoxButtonComponent from '../CheckBoxButtonComponent'
interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {

  const [rendering, setRendering] = useState(true)

  const { userData } = useFirebaseDataContext()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    setRendering(false)
  }, [])

  const handleAuthCheck = () => {
    setIsAuthenticated(undefined)

    if (userData) return setIsAuthenticated(true)

    setIsAuthenticated(false)
  }

  if (!game) return <></>

  return (
    <div
      className={`grid h-full gap-4

      

      border-theme-secondary-dark rounded-lg shadow-sm shadow-theme-secondary bg-white rounded-b-md
      transition-opacity duration-500  ${rendering ? 'opacity-0' : 'opacity-100'}`}
    >

      <div className='relative'>

        <CheckBoxButtonComponent item={game.genre} className='bg-theme-secondary-dark text-white w-28 absolute left-1 top-1'>
          {game.genre}
        </CheckBoxButtonComponent>

        <Image
          sizes="(max-width: 404px) 100vw , (max-width: 768px) 60vw, (min-width: 769px) 50vw"
          width='0'
          height='0'
          src={game.thumbnail}
          alt={game.title}
          className='w-full h-auto tablet:w-full tablet:h-full self-center tablet:col-start-1 tablet:row-span-2 rounded-t-md'
        />
        <h3

          title={game.title}
          className='text-black bg-white/70 truncate flex w-full font-semibold py-2 px-4 transition-all opacity-90 hover:opacity-100
  absolute bottom-0 z-10 text-24  transform'
        >
          {game.title}
        </h3>


      </div>


      <p title={game.short_description} className='h-auto overflow-y-hidden text-ellipsis'>
        {game.short_description}
      </p>




      <span className='flex gap-4 items-center cursor-pointer ' onClick={handleAuthCheck}>
        {isAuthenticated === false && <AuthMessage />}
        <Heart gameID={game.id} />
        <Stars gameID={game.id} />
      </span>

      <div className='grid grid-cols-2 gap-2 tablet:text-14 mobile:text-14 '>

        <Link href={`/game/${game.id}`} >
          <Button colorStyle='secondary'><span>Ver mais</span></Button >
        </Link>

        <Link href={game.game_url} target='_blank'>
          <Button colorStyle='primary' ><span>Jogar agora</span></Button >
        </Link>
      </div>

    </div >
  )
}
