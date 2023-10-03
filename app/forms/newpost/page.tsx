'use client'

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/Switchers/SwitcherFour";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import React, { useEffect } from 'react'
import Tiptap from '../../../components/Tiptap/Tiptap'
import Preview from '../../../components/Previews/Preview'
import PreviewPost from '../../../components/PreviewPost/PreviewPost'



import { Metadata } from "next";
import TodayDateInput from "@/components/Date/Date";
export const metadata: Metadata = {
  title: "Form Elements Page | Next.js E-commerce Dashboard Template",
  description: "This is Form Elements page for TailAdmin Next.js",
  // other metadata
};

const FormElements = () => {

  const [title, setTitle] = React.useState('first post');
  const [category, setCategory] = React.useState('Gaming');
  const [summary, setSummary] = React.useState('');
  const [content, setContent] = React.useState({
    content: ""
  });
  const [Date, setDate] = React.useState('');
  const [File, setFile] = React.useState('');
  const [cover, setCover] = React.useState('');
  const [Previews, setPreviews] = React.useState([]);
  const [audio, setAudio] = React.useState('');
  const [audioPreviews, setAudioPreviews] = React.useState([]);
  const [previewPost, setPreviewPost] = React.useState(false);
  const [warning, setWarning] = React.useState(false)

  useEffect(() => {
    if (File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews([...Previews, reader.result]);
       
      };
      reader.readAsDataURL(File);
    }
  }, [File]);

  useEffect(() => {
    if (audio) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudioPreviews([...audioPreviews, reader.result]);
       
      };
      reader.readAsDataURL(audio);
    }
  }, [audio]);


  const showPreview = () => {

    if(title === '' || category === '' || summary === '' || content.content === '' || Previews.length === 0){
      setWarning(true)
      setTimeout(() => {
          setWarning(false)
          }, 2000);
    }else{
      setPreviewPost(true)
    }
    
  }

  
 
  if(previewPost){
    return(
      <>
      <Breadcrumb pageName="Preview" />
        <PreviewPost 
          title={title} 
          category={category} 
          summary={summary}
          Previews={Previews} 
          cover={cover}
          audioPreviews={audioPreviews} 
          content={content} 
          setPreviewPost={setPreviewPost} 
          date={Date}
          />
      </>
    )
  }


  return (
    <>
      <Breadcrumb pageName="New Post" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-large font-bold text-danger dark:text-white">
                Create new Post
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(ev)=>{setTitle(ev.target.value)}}
                  type="text"
                  placeholder="Title should be catchy as in advertisements!"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Category
                </label>
                <input
                  value={category}
                  onChange={(ev)=>{setCategory(ev.target.value)}}
                  type="text"
                  placeholder="Select the category which your post belongs to."
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                />
              </div>

              {/* <div>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  disabled
                </label>
                <input
                  type="text"
                  placeholder="Disabled label"
                  disabled
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                />
              </div> */}
            </div>
          </div>

          {/* <!-- Toggle switch input --> */}
          {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Toggle switch input
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SwitcherOne />
              <SwitcherTwo />
              <SwitcherThree />
              <SwitcherFour />
            </div>
          </div> */}

          {/* <!-- Time and date --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Time and date
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Todays Date
                </label>
                <div className="relative">
                  <TodayDateInput date={Date} setDate={setDate} />
                </div>
              </div>

              {/* <div>
                <label className="mb-3 block text-black dark:text-white">
                  Select date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div> */}
            </div>
          </div>

          {/* <!-- File upload --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                File upload
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Image / Video
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  accept='image/*,video/mp4'
                  onChange={(e) => {
                    setCover(e.target.files[0])
                    const files = e.target.files;
                    if (files && files.length > 0) {
                    
                      for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        if (file.type.startsWith('image') || file.type === 'video/mp4') {
                          setFile(file);
                        }
                      }
                    }
                  }}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Audio
                </label>
                <input
                  type="file"
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                  accept="audio/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                     
                      for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        if (file.type.startsWith('audio')) {
                          setAudio(file);
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Textarea Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Article
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Summary
                </label>
                <textarea
                  value={summary}
                  onChange={(e)=>{setSummary(e.target.value)}}
                  rows={6}
                  placeholder="summaries should be short and must convey the subject of the post."
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Post content
                </label> 
               <Tiptap content={content} setContent={setContent} />
              </div>

              {/* <div>
                <label className="mb-3 block text-black dark:text-white">
                  Disabled textarea
                </label>
                <textarea
                  rows={6}
                  disabled
                  placeholder="Disabled textarea"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                ></textarea>
              </div> */}
            </div>
          </div>

          {/* <!-- Checkbox and radio --> */}
          {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Checkbox and radio
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <CheckboxOne />
              <CheckboxTwo />
              <CheckboxThree />
              <CheckboxFour />
              <CheckboxFive />
            </div>
          </div> */}

          {/* <!-- Select input --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Preview
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="">
                <label className="mb-3 block text-black dark:text-white border-b">
                  Files
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <Preview Previews={Previews} setPreviews={setPreviews} />
                </div>
              </div>
              <div className=" border-b ">
                <label className="mb-3 block text-black dark:text-white">
                  Audio
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <div className="grid gap-4">
                    {audioPreviews.length > 0 &&
                      audioPreviews.map((media,index)=>(
                        <div key={index.toString()} className="ms-2 mb-2">
                          {media && media.includes('audio/') &&
                            <div className="audio">
                            <audio className="w-full " controls>
                            <source
                            src={media}
                            className="cursor-pointer"
                            alt={`Preview ${index}`}
                        /> </audio>
                          
                        </div>   
                                               
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              {warning && <p className="text-danger font-semibold text-sm italic">please fill all fields!</p>}
              <div className="flex justify-center">
                <button onClick={showPreview} className='text-white bg-danger rounded-full px-4 py-2 font-bold text-xl font-satoshi'>Preview post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
