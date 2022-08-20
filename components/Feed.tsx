import React, { useState } from 'react';
import { RefreshIcon } from '@heroicons/react/outline';
import TweetBox from './TweetBox';
import { Tweet } from '../typings';
import TweetComponent from './TweetComponent';
import { fetchTweets } from '../utils/fetchTweets';
import toast from 'react-hot-toast';
//import NewTweetCompo from '../try/NewTweetCompo';

interface Props {
  tweets: Tweet[]
}

const Feed = ({tweets: tweetsProp}: Props)=> {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);

  //console.log(tweets);

  const handleRefresh = async ()=>{
    const refreshToast = toast.loading('Refreshing...');
    const tweets = await fetchTweets();
    setTweets(tweets);
    toast.success('Tweets Updated !',{
      id:refreshToast,
    })
  }

  return (
    <div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide">
        <div className="flex items-center justify-between"> 
        <h1 className='p-5 pb-8 text-xl font-bold'>Home</h1>
        <RefreshIcon 
        className='h-8 w-8 mr-5 cursor-pointer text-twitter transition-all
        duration-500 ease-out hover:rotate-180 active:scale-125'
        onClick={handleRefresh}
        />
        </div>
        
        <TweetBox setTweets={setTweets}/>
        

        <div> 

          {tweets?.map( 
            tweet=> <TweetComponent key={tweet._id} tweet={tweet}/>
            )
          }

        </div> 
        
        
    </div>
  )
}

export default Feed;