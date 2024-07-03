"use client"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { FaSort } from "react-icons/fa"

type Sort = {
    sortType: string
}

const SortComp = ({onChange}:{onChange:(sort:Sort) => void}) => {
    const [sortType, setSortType] = useState("")

    useEffect(() => {
        onChange({sortType})
    },[sortType])


  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
                <div className='flex items-center gap-1 font-medium'>
                    <FaSort />
                    Sort
                </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
                checked={sortType === "a-z"}
                onCheckedChange={() => setSortType("a-z")}
            >
                A-Z
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
                checked={sortType === "z-a"}
                onCheckedChange={() => setSortType("z-a")}
            >
                Z-A
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
                checked={sortType === "newest"}
                onCheckedChange={() => setSortType("newest")}
            >
                Newest
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
                checked={sortType === "oldest"}
                onCheckedChange={() => setSortType("oldest")}
            >
                Oldest
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
                checked={sortType === "popularity"}
                onCheckedChange={() => setSortType("popularity")}
            >
                Popularity
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortComp