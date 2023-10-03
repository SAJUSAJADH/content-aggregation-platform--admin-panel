import axios from "axios"
import { useEffect, useState } from "react"
import Breadcrumb from "../Breadcrumbs/Breadcrumb"
import { Trash2 } from 'lucide-react'
import { useRouter } from "next/navigation"




export default function Contents(){

    const [Data, setData] = useState([])
    const [alert, setAlert] = useState(false)
    const router = useRouter()

    useEffect(()=>{
        try{
            axios.get('/api/uploads').then(({data})=>{
               
                setData(data.slice().reverse())
            })
            
        }catch(e){
            console.log(e)
        }
    },[Data])

    const Delete = async (id) => {
        const {data} = await axios.post('/api/delete',{id})
        router.push('/content')
    }

    return(
        <>
            <div className="border-b-2"><Breadcrumb pageName="Content"/></div>
            {Data.length != 0 && Data.map((item, index)=>(
                <div key={index} className="w-full py-2 px-2 border-b-2">
                    <div className="grid flex-row flex-wrap lg:grid-cols-5 justify-center items-center lg:justify-evenly gap-4">
                        <div className="flex">               
                                <img
                                src={item.source}
                                alt=""
                                className="rounded cursor-pointer w-28 h-16"
                                onError={(e) => {
                                    e.target.src = "https://tuberanker.com/storage/images/data/can-i-use-someone-elses-video-on-my-youtube-channel.png"
                                  }}
                            />                    
                        </div>
                        <div className="flex flex-wrap">
                            <p className="text-sm font-bold text-form-strokedark">{item.title}</p>
                        </div>
                        <div className="">
                            <h2 className="text-sm font-semibold text-primary">{item.category}</h2>
                        </div>
                        <div className="">
                            <h2 className="text-sm font-semibold text-form-strokedark">{item.date}</h2>
                        </div>
                        <div className="">
                            <h2 
                                onClick={()=>{Delete(item._id)}}
                                className="text-sm font-semibold text-form-strokedark cursor-pointer"><Trash2/></h2>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}