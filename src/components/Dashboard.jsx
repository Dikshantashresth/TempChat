import React from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Rooms from './Rooms';

const Dashboard = () => {
  const {id} = useParams();
  
  return (
    <div className='bg-black p-3 text-white h-screen'>
        <div className="header font-bold text-5xl text-white">Welcome {id}</div>
        <div className="button-contianer mt-4 flex gap-3">
           <Link to='/create'> <button className='bg-zinc-900 p-3 w-20 cursor-pointer rounded-lg'>Create</button></Link>
           <Link to='/join'><button className='bg-blue-600 p-3 w-20 cursor-pointer rounded-lg'>Join</button></Link> 
        </div>
        <p className='p-2 font-bold text-2xl'>Your Rooms</p>
        <Rooms/>
    </div>
  )
}

export default Dashboard
