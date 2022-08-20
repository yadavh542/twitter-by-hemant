import React, { useRef, useState } from 'react';
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon, 
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react';
import { Tweet, TweetBody } from '../typings';
import { fetchTweets } from '../utils/fetchTweets';
import toast from 'react-hot-toast';

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

const TweetBox = ({setTweets}: Props) => {
  const[input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const {data:session} = useSession();
  const [uploadImage, setUploadImage] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if(!imageRef.current?.value) return;

      setImage(imageRef.current.value);
      imageRef.current.value = '';
      setUploadImage(false);
  }

  const postTweet = async ()=>{
    const tweetInfo: TweetBody = {
      text:input,
      username:session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || '',
      image: image,
    }

    const result = await fetch(`/api/addTweet`,{
      body:JSON.stringify(tweetInfo),
      method:'POST',
    })
    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast.success('Tweet Posted');

    return json;
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      postTweet();
      setInput('');
      setImage('');
      setUploadImage(false);
  }

  return (
    <div className='flex flex-row space-x-2 p-3 items-center'>
        <img src={session?.user?.image || "https://cdn-icons-png.flaticon.com/512/147/147142.png"} 
        className=' h-14 w-14 rounded-full object-cover'
        />

        <div className='flex flex-1 items-center pl-2'>
            <form className="flex flex-1 flex-col">
                <input 
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                className='h-20 outline-none w-full text-xl placeholder:text-xl' type="text" placeholder='Whats Hapenning ?'/>

                <div className='flex items-center'>
                    <div className='flex space-x-2 text-twitter flex-1'>
                      <PhotographIcon 
                      onClick={()=>setUploadImage(!uploadImage)}
                      className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                      <SearchCircleIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                      <EmojiHappyIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                      <CalendarIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/> 
                      <LocationMarkerIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                    </div>
                    <button 
                    onClick={handleSubmit}
                    
                    className={!input || !session?'bg-twitter text-white rounded-full px-5 py-2 font-bold disabled: opacity-40':'bg-twitter text-white rounded-full px-5 py-2 font-bold'}>Tweet</button>
                </div>
                {
                  uploadImage && (
                    <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
                      <input 
                      ref={imageRef}
                      className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white' type="text" 
                      placeholder='Enter image Url...'
                      />
                      <button type='submit' onClick={addImageToTweet} className='font-bold text-white'>Add Image</button>
                    </form>
                  )
                }

                {image && (
                  <img className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg' src={image} alt="" />
                )}
            </form>
        </div>
    </div>
  )
}

export default TweetBox;