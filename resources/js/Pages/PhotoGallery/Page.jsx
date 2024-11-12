import { useState, useEffect } from 'react';
import ImageSlider from '@/Components/ImageSlider' 

export default function PhotoPage({ params }){
  //const router = useRouter();
  const { model } = 5;

  const [isModel, setModel] = useState('');
  const [data, setData] = useState([])

  useEffect(() => {
    // setModel(model);

    async function  fetchData(){
      try {
        const response = await fetch(`/api/get-shoe/${model}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',

          },
        });

        const data = await response.json()
        setData(data[0]);
      } catch (error){
        console.log('Something went Wrong', error)
      } 

    }

    fetchData()

  }, [model])

  const indexArray = [1, 2, 3, 4]

  return (
    <div className="photo_container flex flex-col w-full max-h-screen bg-[#020E29] p-16">
      <Link href={`/`}>
        Back
      </Link>
      <div className="w-full flex flex-row shadow-xl shadow-slate-600/100 rounded-xl">
        <div className="flex w-full h-96 justify-center items-center p-8">
          <ImageSlider>
            {indexArray.map((i, index) => {
               return <Image key={i} width={300} height={300} src={`/shoes/${data.model}/${data.model}_${i}.jpg`} alt={`Image ${index}`} />
            })}
          </ImageSlider>
        </div>
        <div className="flex w-full h-96 flex-col text-left text-xl p-8 ">
          <h1>Model: {data.model ? data.model : (<>test test</>) }</h1>
          <h1>Category: {data.category}</h1>
          <div className="flex flex-row w-full items-center">
            Color: 
              <div className="p-2 bg-amber-500 rounded-full ml-2 w-8 h-6 text-white justify-center items-center"></div> 
              <div className="p-2 bg-yellow-600 rounded-full ml-2 w-8 h-6"></div> 
              <div className="p-2 bg-zinc-400 rounded-full ml-2 w-8 h-6"></div> 
              <div className="p-2 bg-amber-400 rounded-full ml-2 w-8 h-6"></div> 
              <div className="p-2 bg-stone-950 rounded-full ml-2 w-8 h-6"></div> 
              <div className="p-2 bg-sky-950 rounded-full ml-2 w-8 h-6"></div> 
              <div className="p-2 bg-sky-950 rounded-full ml-2 w-8 h-6"></div> 
          </div>
          <h1>Available Heel Height: </h1>
          <h1>Descriptions: </h1>
          <h1></h1>
        </div>

      </div>
      <hr className="m-4" />
      <div className="flex justify-center items-center text-center">
        Order Now!
      </div>
    </div>
  )

}
