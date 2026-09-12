import { Code2, Laptop } from 'lucide-react'
import React from 'react'
import GridAnimation from '../components/GridAnimation'

function Development() {
  return (
    <div>
      {/* Grid Animation */}
      <div className="hidden md:block">
        <GridAnimation />
      </div>

      {/* backgroundImage*/}
      <div
        className="fixed inset-0 bg-cover bg-center z-0 bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('images/backgroundImg.png')` }}
      ></div>

      {/*overlay layer*/}
      <div className='fixed inset-0 bg-linear-to-b from-black/70 to-black/80 '></div>

      {/* Main Content */}
      <section className='relative min-h-screen overflow-hidden py-30 z-3 animate-[fadeIn_1s_ease-in-out]'>

        {/* hero section */}
        <div className='flex flex-col items-center '>
          <Code2 className="w-10 h-10 text-primary" />
          <h1
            className='text-4xl text-center  md:text-6xl font-bold
          max-w-3xl mx-15 z-3 text-gray-300'
          ><span className='bg-primary text-transparent bg-clip-text'>Development</span> Resources</h1>
          <h2 className='text-sm  md:text-xl
            max-w-150 text-center mx-15 mt-5 text-muted-foreground z-3 '>
            Master Data Structures & Algorithms through curated sheets, roadmaps, coding platforms, and interview preparation resources.
          </h2>
        </div>

      </section>
    </div>
  )
}

export default Development
