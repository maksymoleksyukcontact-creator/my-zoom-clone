import MeetingsList from '@/components/MeetingsList'
import React from 'react'

function Home() {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const date = new Date().toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <section className='flex flex-col gap-10 size-full text-white'>
      <div
        style={{ backgroundImage: "url('/images/hero-background.png')" }}
        className='h-[300px] w-full bg-cover rounded-2xl'>
        <div className='h-full flex flex-col justify-between max-md:px-6 max-md:py-4 px-10 py-6'>
          <div className='glassmorphism max-w-[260px] flex-center p-2 rounded-[10px]'></div>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl lg:text-7xl font-extrabold'>{time}</h1>
            <p className='text-lg font-medium text-sky-1'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingsList />
    </section>
  )
}

export default Home