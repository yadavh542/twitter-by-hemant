import React, { useEffect, useState } from 'react';
// import { Tweet } from '../typings';
import TimeAgo from 'react-timeago';
import {
    ChatAlt2Icon,
    HeartIcon,
    SwitchHorizontalIcon,
    UploadIcon,
} from '@heroicons/react/outline';
import { sanityClient } from '../sanity';


const NewTweetCompo = () => {
    const [tweet, setTweet] = useState([]);

    useEffect(()=>{
        sanityClient
        .fetch(
            ` *[_type=="tweet" && !blockTweet]{
                _id,
                ...
              } | order(_createdAt desc)
            `
            )
        .then(res => {
          setTweet(res)})
        .catch(err => {
          console.log(err);
        });
    },[]);

  return (
    <div className='flex flex-col space-x-3 border-y border-gray-100 p-5'>
      <h1>Hello</h1>
    { tweet?.map(t => ( 
        <div className='flex space-x-3'>
        <img
        className='h-10 w-10 rounded-full object-cover'
        src={t.profileImg} />
        <div>
            <div className="flex items-center space-x-1">
                <p className='mr-1 font-bold'>{t.result.username}</p>
                <p className='hidden text-sm text-gray-500 sm-inline'>@{t.username.replace(/\s+/, '').toLowerCase()}</p>
                <TimeAgo
                    className='text-sm text-gray-500'
                    date={t._createdAt}
                />
            </div>
            <p className='pt-1'>{t.text}</p>
            {t.image && (
                <img src={t.image} 
                className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm'
                />
            )}
        </div>
    </div>
    ))
    }

       <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
       </div>

    </div>
  )
}

export default NewTweetCompo;