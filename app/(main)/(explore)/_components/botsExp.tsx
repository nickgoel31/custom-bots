"use client"

import { Bot } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import FilterComp from './filter'
import SortComp from './sort'
import { Verified } from 'lucide-react'
import SearchComp from './search'


type Filter = {
  category: string
}

type Sort = {
  sortType: string
}

const BotsExplorePage = ({bots}:{bots: Bot[]}) => {
  const [botsState,setBots] = useState<Bot[]>(bots)

  function handleFilterChange(filter: Filter) {
    if (filter.category === "") {
      setBots(bots)
    } else {
      setBots(bots.filter(bot => bot.category === filter.category))
    }
  }

  function handleSearch(searchQuery: string){
    if(searchQuery === ""){
        setBots(bots);
    } else {
        const normalizedSearchQuery = searchQuery.toLowerCase();
        setBots(bots.filter(bot => 
            bot.name.toLowerCase().includes(normalizedSearchQuery) ||
            bot.introduction.toLowerCase().includes(normalizedSearchQuery) ||
            bot.description.toLowerCase().includes(normalizedSearchQuery) ||
            bot.category.toLowerCase().includes(normalizedSearchQuery)
        ));
    }
}


  // function handleSortChange(sort:Sort){
  //   // switch(sort.sortType){
  //   //   case "newest":
  //   //     setBots(bots.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
  //   //     break;
  //   //   case "oldest":
  //   //     setBots(bots.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
  //   //     break;
  //   //   case "a-z":
  //   //     setBots(bots.sort((a,b) => a.name.localeCompare(b.name)))
  //   //     break;
  //   //   case "z-a":
  //   //     setBots(bots.sort((a,b) => b.name.localeCompare(a.name)))
  //   //     break;
  //   //   case "popularity":
  //   //     // setBots(bots.sort((a,b) => b.likes - a.likes))
  //   //     break;
  //   //   default:
  //   //     setBots(bots)
  //   // }
  //   if(sort.sortType === "newest"){
  //     setBots(bots.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
  //   }
  // }
  return (
    <div className='flex flex-col gap-8'>
          <div className='sort&filter flex items-center w-full justify-between'>
            <FilterComp onChange={handleFilterChange}/>
            <SearchComp onChange={handleSearch}/>
            {/* <SortComp onChange={handleSortChange}/> */}
          </div>

          <div className='bots grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {botsState.map((bot) => (
                <div key={bot.id} className='border bg-muted rounded-lg shadow-md overflow-hidden h-72 p-4 flex flex-col'>
                    <div className=' h-full flex-1 w-full flex flex-col items-center justify-center gap-4'>
                        <div className='relative w-20 h-20 rounded-full overflow-hidden'>
                            <Image src={bot.image || ""} alt={bot.name} width={1000} height={1000} className='w-full object-cover h-full'/>
                        </div>
                        <div>
                            <p className='text-lg font-bold flex items-center gap-1'>
                              {bot.name}
                              <span>
                                <Verified size={20} className='text-muted-foreground text-sm'/>
                              </span>
                            </p>
                            <p className='text-muted-foreground text-xs line-clamp-2 pb-1'>{bot.category}</p>
                            <p className='text-muted-foreground text-sm line-clamp-2'>{bot.description}</p>
                        </div>
                        <div className='flex items-center justify-center gap-3 w-full'>
                            <div className='w-full rounded-md border border-foreground/15'>
                                <Link href={`/bot/${bot.id}`} className='w-full flex items-center justify-center p-2 text-sm font-medium'>
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
              ))}
              {botsState.length <= 0 && (
                <div className='w-full flex items-center justify-center'>
                  <p className='text-muted-foreground font-medium text-center'>No Bots Found</p>
                </div>
              
              )}
          </div>

        </div>
    
  )
}

export default BotsExplorePage