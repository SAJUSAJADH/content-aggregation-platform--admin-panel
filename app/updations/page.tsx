'use client'

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import {useState , useEffect} from 'react'

import { Metadata } from "next";
import axios from "axios";
import { useRouter } from "next/navigation";
const metadata: Metadata = {
  title: "Updation Page | Next.js E-commerce Dashboard Template",
  description: "This is Profile page for TailAdmin Next.js",
  // other metadata
};

const Profile = () => {

  const router = useRouter()
  const [trend1, setTrend1] = useState('')
  const [trend2, setTrend2] = useState('')
  const [trend3, setTrend3] = useState('')
  const [trend4, setTrend4] = useState('')
  const [trend5, setTrend5] = useState('')
  const [trend6, setTrend6] = useState('')
  const [id, setId] = useState('')
  const [notification1, setNotification1] = useState('')
  const [notification2, setNotification2] = useState('')
  const [notification3, setNotification3] = useState('')
  const [nID, setNid] = useState('')

  useEffect(()=>{
    axios.get('/api/gettrend').then(({data})=>{
      setTrend1(data[0]?.trend1)
      setTrend2(data[0]?.trend2)
      setTrend3(data[0]?.trend3)
      setTrend4(data[0]?.trend4)
      setTrend5(data[0]?.trend5)
      setTrend6(data[0]?.trend6)
      setId(data[0]?._id)
    })
  },[])
  
  useEffect(()=>{
    axios.get('/api/getnotification').then(({data})=>{
      setNotification1(data[0]?.notification1)
      setNotification2(data[0]?.notification2)
      setNotification3(data[0]?.notification3)
      setNid(data[0]?._id)
    })
  },[])

  const Update = async () => {
    if(id != ''){
      try{
        const {data} = await axios.post('/api/maketrend',{id, trend1, trend2, trend3, trend4, trend5, trend6})
        router.push('/updations')
      }catch(e){
        console.log(e)
      }
    }
  }

  const send = async () => {
    if(nID != ''){
      try{
        const {data} = await axios.post("/api/notify",{id: nID, notification1, notification2, notification3})
        router.push('/updations')
      }catch(e){
        console.log(e)
      }
    }
  }

  

  return (
    <>
      <Breadcrumb pageName="Updations" />

      <div className="bg-white text-black px-4 py-4 w-3/4">
      
        <div className="grid gap-4">

        <h2 className="text-lg font-bold italic">upload new trends</h2>

          <input value={trend1} onChange={(e)=>{setTrend1(e.target.value)}} type="text" className="border-2 border-graydark focus:outline-none w-2/4 px-4 py-2 text-italic rounded"></input>
          <input value={trend2} onChange={(e)=>{setTrend2(e.target.value)}} type="text" className="border-2 border-graydark focus:outline-none w-2/4 px-4 py-2 text-italic rounded"></input>
          <input value={trend3} onChange={(e)=>{setTrend3(e.target.value)}} type="text" className="border-2 border-graydark focus:outline-none w-2/4 px-4 py-2 text-italic rounded"></input>
          <input value={trend4} onChange={(e)=>{setTrend4(e.target.value)}} type="text" className="border-2 border-graydark focus:outline-none w-2/4 px-4 py-2 text-italic rounded"></input>
          <input value={trend5} onChange={(e)=>{setTrend5(e.target.value)}} type="text" className="border-2 border-graydark focus:outline-none w-2/4 px-4 py-2 text-italic rounded"></input>
          <input value={trend6} onChange={(e)=>{setTrend6(e.target.value)}} type="text" className="border-2 border-graydark focus:outline-none w-2/4 px-4 py-2 text-italic rounded"></input>


          
          <button onClick={Update} className="bg-danger text-white px-4 py-2 rounded font-bold">update</button>
        </div>
      </div>

      <div className="bg-white mt-4 text-black px-4 py-4 w-3/4">
      <div className="grid gap-4">
        <h2 className="text-lg font-bold italic">send notification to TechNoobs</h2>
        <input value={notification1} onChange={(e)=>{setNotification1(e.target.value)}} type="text" className="border-2 border-graydark focus:outline-none w-2/4 px-4 py-2 text-italic rounded"></input>
        <input value={notification2} onChange={(e)=>{setNotification2(e.target.value)}} type="text" className="border-2 border-graydark focus:outline-none w-2/4 px-4 py-2 text-italic rounded"></input>
        <input value={notification3} onChange={(e)=>{setNotification3(e.target.value)}} type="text" className="border-2 border-graydark focus:outline-none w-2/4 px-4 py-2 text-italic rounded"></input>
        <button onClick={send} className="bg-danger text-white px-4 py-2 rounded font-bold">send</button>
      </div>
      </div>
    </>
  );
};

export default Profile;
