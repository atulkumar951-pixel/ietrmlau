import React, { useState } from 'react'
import { members } from '../data/members'
import GridAnimation from '../components/GridAnimation'
import {  Search } from 'lucide-react'

function Members() {

  let [querry,setQuerry] = useState('');
  const handleSearchInput = (e) => {
    setQuerry(e.target.value);
  }

  const filteredData = members.filter((member) => member.name.toLowerCase().includes(querry.toLowerCase()));
  return (
    <div className='bg-linear-to-b from-background/90 via-black/60 to-background/90'>
      <div className="hidden md:block">
        <GridAnimation />
      </div>

       {/* backgroundImage*/}
             <div
               className="fixed inset-0 bg-cover bg-center z-0 bg-no-repeat pointer-events-none" style={{ backgroundImage: `url('images/backgroundImg.png')` }}
             ></div>

             {/*overlay layer*/}
             <div className='fixed inset-0 bg-linear-to-b from-black/70 to-black/80 '></div>

      <section className='min-h-screen py-30 mx-5 relative z-10'>
        <div className='flex flex-col justify-center items-center text-center'>
          <h2 className="animate-[fadeIn_1s_ease-in-out] text-4xl font-bold mb-4">
            Meet the <span className="text-primary">Team</span> Behind the <span className="text-primary">Community</span>
          </h2>
          <p className="animate-[fadeIn_1s_ease-in-out] text-muted-foreground mb-12">
            Dedicated individuals working together to build a strong, collaborative, and growing tech community.
          </p>
          <div className='z-5 h-12 transition-all duration-300 animate-[fadeIn_1s_ease-in-out] w-100  flex items-center justify-center'>


            <input id='search' type="text" placeholder='Enter member name' className='px-5 border border-primary rounded-s-xl h-8 w-50 sm:w-100 outline-none ' onChange={handleSearchInput} />
            <button  className='rounded-r-xl bg-primary text-sm flex justify-center items-center w-15 h-8 mr-2 cursor-pointer '>
              <Search className='hover:scale-110'/>
            </button>

          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className=" w-4/5 h-4/5 rounded-2xl">
            <div className="p-5 gap-5 grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
              {/* Profile Cards */}
              {
                filteredData.length == 0 ? (
                  <div className='col-start-2 place-items-center'>
                    <h1 className='text-muted-foreground'>
                      No Results Found!
                    </h1>
                  </div>
                ) :
                filteredData.map((member) => (
                  <div key={member.id} className="animate-[fadeIn_1s_ease-in-out] relative group rounded-2xl
              overflow-hidden border bg-primary/10 backdrop-blur-md sm:backdrop-blur-xs border-primary/40 sm:border-white/10  hover:border-primary/40 h-96 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(32,178,166,0.2)] cursor-pointer z-10 flex items-center justify-center
            max-w-59 sm:max-w-68 max-h-83 sm:max-h-96 active:scale-110
              ">

                    {/* Background Image */}

                    <img
                      src={member.bg}
                      alt="bg"
                      className="absolute inset-0 w-full h-full opacity-90 sm:opacity-70 group-hover:opacity-90 object-contain transition duration-300"
                    />
                    <div className="absolute top-6 left-15 sm:left-20 sm:top-10 border-2 border-primary rounded-full overflow-hidden h-30 sm:h-32 w-30 sm:w-32">
                    <img src={member.profileImg}  />
                    </div>
                    <div className="flex flex-col mt-25 sm:mt-30 ml-3 items-center gap-0 sm:gap-1 z-5">
                      <h1 className='z-5 text-foreground text-xl sm:text-2xl mt-2 sm:mt-0'>{member.name} </h1>
                      <div className='text-primary'>
                        <p>({member.batch})</p>
                      </div>
                      <p className="z-5 text-xs text-muted-foreground max-w-45 sm:max-w-55 text-center">
                        {member.shortDescription}
                      </p>
                      <a href={member.linkedIn} target='_blank' className='z-50'>
                        <button className="z-20 text-xs cursor-pointer mt-1 sm:mt-3 glass border border-primary hover:bg-primary active:bg-primary text-white font-bold py-2 px-4 h-8 w-25 rounded-2xl transition-all sm:duration-300" >
                          LinkedIn →
                        </button>
                      </a>

                    </div>
                  </div>

                ))
              }


            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Members;