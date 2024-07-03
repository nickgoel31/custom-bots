import { Button } from '@/components/ui/button';
import { getAllBotsInApp } from '@/helpers/get-bot'
import { Filter, SortAsc } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaSort } from 'react-icons/fa';
import FilterComp from '../_components/filter';
import SortComp from '../_components/sort';
import BotsExplorePage from '../_components/botsExp';

const ExplorePage = async () => {
  const bots = await getAllBotsInApp()
  if(!bots) return;
  return (
    <div className='w-full py-4 space-y-10'>
        <div className='flex items-center w-full justify-between'>
            <div>
                <h1 className='font-bold text-3xl leading-normal'>Explore Bots</h1>
                <p className='text-muted-foreground text-sm font-medium'>
                  Explore and discover new bots created by our community.
                </p>
            </div>
        </div>

        <BotsExplorePage bots={bots} />

    </div>
  )
}

export default ExplorePage