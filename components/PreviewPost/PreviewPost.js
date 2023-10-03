import parse from "html-react-parser"
import { ArrowLeft } from 'lucide-react';
import { Storage } from '../../configure';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";



export default function PreviewPost({title, category, Previews, cover, date, audioPreviews, content, summary, setPreviewPost}){
    
    const [srcURL, setSrcURL] = React.useState('')
    const [warning, setWarning] = React.useState(false)
    const [uploading, setUploading] = React.useState(false)
    const [posting, setPosted] = React.useState(false)
    const router = useRouter();

    useEffect(()=>{
        if(srcURL != ''){
            setWarning(true)
        }
    },[srcURL])

    let x = Math.floor((Math.random() * 3));
    const clues = [
         "uploading to firbase....", "connecting to firebase....", "establishing connection..."
    ]

    const Upload = async () => {
        setUploading(true)
        try{
            const imageRef = ref(Storage, `posts/${title}`)
            if(cover){
                await uploadBytes(imageRef, cover)
                const downloadURL = await getDownloadURL(imageRef)
                setUploading(false)
                setSrcURL(downloadURL)           
            }
        }catch(e){
            console.log(`occured exception - ${e}`)
        }
    }

    const Createpost = async () => {
        setPosted(true)
        try{
            if(srcURL != ''){
            const {data} = await axios.post('/api/create', {
                title,
                category,
                date,
                content: content.content,
                summary,
                srcURL   
            })
            setPosted(false)
            if(data.message.includes('success')){
                router.push('/content')
            }
            
        }
        }catch(e){
            console.log(e)
        }
        
    }

    return(
        <>
            <div className="container md:w-2/4 rounded mx-auto bg-black z-30 shadow-lg px-4 py-4 min-h-screen">
                <p onClick={()=>{setPreviewPost(false)}} className="font-bold cursor-pointer  p-2 text-white"><ArrowLeft style={{border: "1px solid white"}}/></p>
                <p className="font-semibold italic text-sm  p-2 text-white text-end">{date}</p>
                
                
                <div className="grid">
                    <div className="">
                        {Previews && 
                            Previews.length > 0 &&
                            Previews[0].includes('image/')?
                            <img
                                src={Previews[0]}
                                className="w-full h-full rounded cursor-pointer"
                                alt={`Preview`}
                            />: 
                            <video
                                src={Previews[0]}
                                className="w-full h-full rounded cursor-pointer"
                                controls
                                alt={`Preview`}
                            /> 
                        }
                    </div>
                </div>
                <div className="text-start">
                    <p className="text-4xl text-white font-sans font-bold py-4">{title}</p>
                </div>
                <p className="text-md text-white font-sans italic mb-2">{summary}</p>

                <div className="flex justify-start py-2">
                    {audioPreviews &&
                        audioPreviews.length > 0 &&
                            audioPreviews[0].includes('audio/') &&
                                <audio controls>
                                    <source 
                                        src={audioPreviews[0]}
                                        alt="audio"
                                        className="cursor-pointer"
                                        >    
                                    </source>

                                </audio>
                    }
                </div>
                
                <p className="text-xl font-bold text-primary font-sans italic mb-2">{category}</p>
                
                <div className="mt-6">
                    <p className="text-white">{parse(content.content)}</p>
                </div>

            </div>
            <div className="grid gap-4 justify-center mt-4">
                <p className="text-danger font-bold text-xl">Step 1 : </p>
                <button 
                    onClick={Upload}
                    className="bg-meta-4 hover:bg-danger text-white font-bold font-sans rounded  px-4 py-2 text-xl ">
                    Upload to Firebase
                </button>
                {uploading && <p className="text-danger italic font-bold">{clues[x]}</p>}
                {warning && <p className="text-danger italic font-bold">Upload was successfull 👍</p>}
                <p className="text-danger font-bold text-xl">Step 2 : </p>
                <button 
                    onClick={Createpost}
                    className="bg-meta-4 hover:bg-danger text-white font-bold font-sans rounded px-4 py-2 text-xl ">
                    Post to Website
                </button>
                {posting && <p className="text-danger italic font-bold">posting to website ⏳</p>}
            </div>
        </>
    )
}