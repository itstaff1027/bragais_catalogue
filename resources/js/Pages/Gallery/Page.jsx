import { useState, useEffect } from 'react'
import ImageSlider from '@/Components/ImageSlider.jsx'

//const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Gallery(){
  
  const [filter, setFilter] = useState([])
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  //const { data, error, isLoading } = useSWR('/api/get-shoes', fetcher);
  
  const indexArray = [1, 2, 3, 4]; 

  const buttonArray = [
    {
      "id": 0,
      "name": "All",
      "filter": {
        "type": "All",
        "sub_type": "none"
      }
    },
    {
      "id": 1,
      "name": "6.5 Inches",
      "filter": {
        "type": "Pageant",
        "sub_type": "6.5",
      }
    },
    {
      "id": 2,
      "name": "5.5 Inches",
      "filter": {
        "type": "Pageant",
        "sub_type": "5.5",
      }
    },
    {
      "id": 3,
      "name": "5 Inches",
      "filter": {
        "type": "Pageant",
        "sub_type": "5",
      }
    },
    {
      "id": 4,
      "name": "4 Inches",
      "filter": {
        "type": "Heels",
        "sub_type": "4",
      }
    },
    {
      "id": 5,
      "name": "Mandiator",
      "filter": {
        "type": "Mandiator",
        "sub_type": "None",
      }
    },
    {
      "id": 6,
      "name": "Wondiator",
      "filter": {
        "type": "Wondiator",
        "sub_type": "4",
      }
    },
    {
      "id": 7,
      "name": "Sandals",
      "filter": {
        "type": "Sandals",
        "sub_type": "None",
      }
    },
    {
      "id": 8,
      "name": "Belts",
      "filter": {
        "type": "Accessory",
        "sub_type": "None",
      }
    }
  ]
  
  const fetchShoes = async (filter) => {
    //const { data, error, isLoading } = useSWR('/api/get-shoes', fetcher);
    const interval = 1500;
    setLoading(true);
    try {
      const response = await fetch('/api/get-shoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filter)
      })
      const data = await response.json();
      //console.log(data)
       setData(data);
    } catch (error) {
      console.error("Something went wrong!", error);
    } finally {
      setInterval(() => {
        setLoading(false);
      }, interval);
    }
  }
  
  useEffect(() => {
    //setFilter([{
    //  "type": "All",
    //  "sub_type": "None"
    //}])
    async function fetchData(){
      try {
        const response = await fetch('/api/get-shoes')
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Something went wrong!", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData()
  }, []);

  //if (error) return <div>Failed to load</div>;
  

  return (
    <div className="flex w-full h-auto">
        <div className="flex flex-col p-2">
            {buttonArray?.map((button, index) => (
                <button 
                key={button.id}
                onClick={(e) => {
                    e.preventDefault();
                    fetchShoes(button.filter);
                }}
                
                className="rounded-full shadow-xl m-2 p-4 bg-none text-white hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-slate-500 duration-300">
                {button.name}
                </button>
            ))}
        </div>
        <div className="border grid grid-cols-4 gaps-4 w-full p-4 h-auto overflow-y-auto" > 
        {isLoading ? (<div>Loading ... </div>) : (data?.map((item, index) => (
            <div key={index} className="sample_images grid-cols-4 gaps-4 rounded-xl shadow-xl p-2">
                <ImageSlider>
                    {indexArray.map((i, indexI) => {
                    return <Image key={i} width={270} height={270} src={`${item.image_path}${item.model.toLowerCase()}_${i}.jpg`} alt="1" loading="lazy" />
                    })}
                </ImageSlider>
                <div className="flex justify-between w-full p-4">
                    <div>
                        {item.model}
                    </div>
                    <Link href={`${item.page_path}`} >View More</Link>
                </div>
            </div>
            ))
        )}
        </div>
    </div>
  )
}
