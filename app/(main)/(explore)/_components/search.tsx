"use client"

import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const SearchComp = ({onChange}:{onChange: (searchQuery: string) => void}) => {
    const [searchQuery, setSearchQuery] = useState("")

    
    useEffect(() => {
        onChange(searchQuery)
    },[searchQuery])
  return (
    <div className='relative'>
        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
            <SearchIcon size={20}/>
        </span>
        <Input className='rounded-full px-4 pl-10' placeholder='Search' onChange={(e) => setSearchQuery(e.target.value)}/>
    </div>
  )
}

export default SearchComp