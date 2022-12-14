// @ts-nocheck
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast';
import Feed from '../components/Feed'
import { Sidebar } from '../components/Sidebar'
import Widgets from '../components/Widgets';
import { Tweet } from '../typings';
import { fetchTweets } from '../utils/fetchTweets';

//import Image from 'next/image'
interface Props {
  tweets: Tweet[],
  tweet: Tweet
}

const Home = ({tweets,tweet}: Props) => {
  //console.log(tweets);

  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter By Hemant</title>
      </Head>
      
      <Toaster/>

      <main className="grid grid-cols-9 ">
        {/* Sidebar */}
        <Sidebar tweet={tweet}/>
        {/* Feed */}
        <Feed tweets={tweets}/>
        {/* Widgets */}
        <Widgets/>
      </main>
      
    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();
  return {
    props:{
      tweets,
    },
  }
}
