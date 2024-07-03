"use client"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { botCategories } from "@/types"
import { Filter } from "lucide-react"
import { useEffect, useState } from "react"

type Filter = {
    category: string
  }
  

const FilterComp = ({onChange}:{onChange:(filter:Filter) => void}) => {
    const [category, setCategory] = useState<string>("")

    useEffect(() => {
        onChange({category})
    },[category])
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
                <div className='flex items-center gap-1 font-medium'>
                    <Filter />
                    Filter
                </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-96">
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/*  */}
            
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                    
                    <span>Categories</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                    <DropdownMenuSubContent className="max-h-96">
                        <DropdownMenuCheckboxItem
                        checked={category === ""}
                        onCheckedChange={() => setCategory("")}
                        >
                            All
                        </DropdownMenuCheckboxItem>
                    {botCategories.map((botCat,index) => (
                        <DropdownMenuCheckboxItem key={index}
                        checked={category === botCat}
                        onCheckedChange={() => setCategory(botCat)}
                        >
                            {botCat}
                        </DropdownMenuCheckboxItem>
                    ))}
                    </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
        </DropdownMenuContent>
    </DropdownMenu>
    
  )
}

export default FilterComp