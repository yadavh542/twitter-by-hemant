import { SearchIcon } from '@heroicons/react/outline';
import React from 'react';
import {TwitterTimelineEmbed} from 'react-twitter-embed';

const Widgets = () => {
  return (
    <div className='col-span-2 mt-2 px-2 hidden lg:inline '> 
    <div className='mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3'>
        <SearchIcon className='h-5 w-5 text-gray-400'/>
        <input type='text' placeholder='Search' className='flex-1 bg-transparent outline-none'/>
    </div>

    <TwitterTimelineEmbed
        
        sourceType='profile'
        screenName='aajtak'
        options={{height: 1000}}
    />

    </div>
  )
}

export default Widgets;