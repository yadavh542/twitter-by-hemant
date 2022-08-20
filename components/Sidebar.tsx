import React from 'react';
import SidebarRow from './SidebarRow';
import {
    HomeIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    BellIcon,
} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import TimeAgo from 'react-timeago';
import { Tweet } from '../typings';

interface Props {
  tweet: Tweet
}

export const Sidebar = ({tweet}: Props) => {
  const {data:session} = useSession();

  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
        <img className='h-10 w-10 m-3' src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png" alt="" />

        <SidebarRow Icon={HomeIcon} title="Home"/>
        <SidebarRow Icon={HashtagIcon} title="Explore"/>
        <SidebarRow Icon={BellIcon} title="Notifications"/>
        <SidebarRow Icon={MailIcon} title="Messages"/>
        <SidebarRow Icon={BookmarkIcon} title="Bookmarks"/>
        <SidebarRow Icon={CollectionIcon} title="Lists"/>
        <SidebarRow onClick={session?signOut:signIn} Icon={UserIcon} title={session?'Sign Out':'Sign In'}/>
        <SidebarRow Icon={DotsCircleHorizontalIcon} title="More"/>

        <button className='bg-twitter text-white rounded-full px-10 py-4 font-bold max-w-fit hidden lg:inline'>Tweet</button>

        {/* User Profile */}

        <div className='items-center mt-5 flex space-x-2 relative'>
                        
                        <img className='mt-2 h-7 w-7 rounded-full' src={session?.user?.image || ''} alt="" />

                        <div className='hidden lg:inline'>
                            
                                <p className='mr-1 font-bold'>{session?.user?.name}</p>
                                <p className='hidden text-sm text-gray-500 lg:inline'>@{session?.user?.name?.replace(/\s+/, '').toLowerCase()}</p>
                                {/* <p>Tweeted
                                <TimeAgo
                                className='text-sm text-gray-500'
                                date={tweet._createdAt}
                                />
                                </p> */}
                              
                            
                            
                        </div>
                        
        </div>
       
    </div>
  )
}
