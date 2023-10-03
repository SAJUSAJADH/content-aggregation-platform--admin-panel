import { Trash2 } from 'lucide-react';



export default function Preview({Previews, setPreviews}){

    const handleDelete = (i) => {
      Previews.splice(i, 1)
      Preview();
    }


    return(
        <>
            <div className="grid lg:grid-cols-2">
            {Previews.length > 0 &&
            Previews.map((media, index) => (
            <div key={index.toString()} className="ms-2 mb-2">
              {media && media.includes('image/')?
              <div className='relative'>
                <img
                src={media}
                className="w-full h-full rounded cursor-pointer"
                alt={`Preview ${index}`}
              />
                <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white bg-danger  rounded-full hover:bg-red-600 cursor-pointer"
                  >
                    <Trash2 size={20} />
                </button>
              </div>
              : 
              <div className='relative'>
              <video
                  src={media}
                  className="w-full h-full rounded cursor-pointer"
                  controls
                  alt={`Preview ${index}`}
            /> 
              <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white bg-danger  rounded-full hover:bg-red-600 cursor-pointer"
                  >
                    <Trash2 size={20} />
                </button>
            </div>  
                }
            </div>
          ))}
            </div>
        </>
    )
}