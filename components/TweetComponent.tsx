import React, { useEffect, useState } from 'react';
import { Comment, CommentBody, Tweet } from '../typings';
import TimeAgo from 'react-timeago';
import {
        ChatAlt2Icon,
    ChatAltIcon,
    HeartIcon,
    SwitchHorizontalIcon,
    SwitchVerticalIcon,
    UploadIcon,
} from '@heroicons/react/outline';
import { fetchComments } from '../utils/fetchComments';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface Props {
    tweet: Tweet
}
const TweetComponent = ({tweet}: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    const {data:session} = useSession();

    const refreshComments = async () => {
        const comments:Comment[] = await fetchComments(tweet._id);
        setComments(comments);
    }

    useEffect(()=>{
        refreshComments();
    },[])

    //console.log(comments);

    const postComment = async ()=>{
        const commentInfo: CommentBody={
            comment:input,
            username:session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
            tweetId: tweet._id,
        }
          const result = await fetch(`/api/addComment`,{
            body:JSON.stringify(commentInfo),
            method:'POST',
          })
          const json = await result.json();
      
          refreshComments();
      
          toast.success('Comment added successfully');
      
          return json;
    };

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        postComment();
        setInput('');
        setCommentBoxVisible(false); //
    }

  return (
    <div className='flex flex-col space-x-3 border-y border-gray-100 p-5'>
        <div className='flex space-x-3'>
            <img
            className='h-10 w-10 rounded-full object-cover'
            src={tweet.profileImg || 'https://cdn-icons-png.flaticon.com/512/147/147142.png'} />
            <div>
                <div className="flex items-center space-x-1">
                    <p className='mr-1 font-bold'>{tweet.username}</p>
                    <p className='hidden text-sm text-gray-500 sm-inline'>@{tweet.username.replace(/\s+/, '').toLowerCase()} </p> .
                    <TimeAgo
                        className='text-sm text-gray-500'
                        date={tweet._createdAt}
                    />
                </div>
                <p className='pt-1'>{tweet.text}</p>
                {tweet.image && (
                    <img src={tweet.image} 
                    className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm'
                    />
                )}
            </div>
        </div>

       <div className='flex justify-around mt-5'>
        <div onClick={()=>setCommentBoxVisible(!commentBoxVisible)} className='flex cursor-pointer items-center space-x-3 text-gray-400 '><ChatAltIcon className='h-5 w-5' /><p>{comments.length}</p></div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400 '><SwitchVerticalIcon className='h-5 w-5'/></div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400 '><HeartIcon className='h-5 w-5'/></div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400 '><UploadIcon className='h-5 w-5'/></div>
       </div>

       {/* Comment Box Logic */}
       {
        commentBoxVisible && (
            <form onSubmit={handleCommentSubmit} className='mt-3 flex space-x-3'>
                <input
                 value={input}
                 onChange={(e)=>setInput(e.target.value)}
                 type="text" placeholder="Write a comment..." 
                className='flex-1 rounded-lg bg-gray-100 p-2 outline-none'
                />
                <button type='submit' className={input?'text-twitter ':'text-gray-500'}>
                    Post
                </button>
            </form>
        )
       }

       {comments?.length > 0 && (
            <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 scrollbar-hide'>
                {comments.map(comment =>( 
                    <div key={comment._id} className='flex space-x-2 relative'>
                        <hr className='absolute left-5 top-10 h-8 border-x border-twitter/30'/>
                        <img className='mt-2 h-7 w-7 rounded-full ' src={comment.profileImg} alt="" />

                        <div>
                            <div className='flex items-center space-x-1'>
                                <p className='mr-1 font-bold'>{comment.username}</p>
                                <p className='hidden text-sm text-gray-500 lg:inline'>@{tweet.username.replace(/\s+/, '').toLowerCase()} .</p>

                                <TimeAgo
                                className='text-sm text-gray-500'
                                date={comment._createdAt}
                                />
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                        
                    </div>
                ))}
            </div>
       )}

    </div>
  )
}

export default TweetComponent;