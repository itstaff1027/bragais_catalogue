import { useState, useEffect } from 'react'
import ImageSlider from '@/Components/ImageSlider.jsx'
import { Head, Link } from '@inertiajs/react';
import { urlPath } from '@/Constant/Constant';
//const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Gallery(){
  
  const [filter, setFilter] = useState([])
  const [filterHeelHeights, setFilterHeelHeights] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  //const { data, error, isLoading } = useSWR('/api/get-shoes', fetcher);

  const fetchCategories = async () => {
    try {
      const response = await fetch(route('public-product.categories'), {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Something went wrong!", error);
    } 
  }

  const filterProducts = (value) => {
    if(value === 'all'){
      const originalData = data;
      setFilteredData(originalData)
    }else{
      const filtered = data.filter(product => 
        product.category === value || product.heel_heights.some((item) => item.heel_height === value)
      );
      setFilteredData(filtered);
    }
  }
  
  useEffect(() => {
    async function fetchData(){
      try {
        const response = await fetch(route('public_products'))
        const data = await response.json();
        console.log(data);
        setData(data);
        setFilteredData(data);
        setFilterHeelHeights([...new Set(data.flatMap((product) => product.heel_heights.map((item => item.heel_height))).filter(Boolean))]);
      } catch (error) {
        console.error("Something went wrong!", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    fetchCategories();
  }, []);

  return (
    <div className="sm:flex w-full h-[700px]">
      <div className="flex sm:flex-col justify-between items-center p-2 overflow-x-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              filterProducts('all');
            }}
            className="rounded-full shadow-xl m-2 p-4 bg-none text-white hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-slate-500 duration-300">
              All
          </button>
          {categories?.filter(category => category.gender === 'female' || category.gender === 'none').map((button, index) => (
            <button 
              key={button.id}
              onClick={(e) => {
                  e.preventDefault();
                  filterProducts(button.categories);
              }}
                
              className="rounded-full shadow-xl m-2 p-4 bg-none text-white hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-slate-500 duration-300">
              {button.categories}
            </button>
          ))}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full text-white justify-center items-center">
          {filterHeelHeights.map((heel_height, index) => (
            <button onClick={(e) => {
                e.preventDefault();
                filterProducts(heel_height);
              }} 
              key={index} className="rounded-full shadow-xl m-2 p-4 bg-none text-white hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-slate-500 duration-300"
            >
              {heel_height}
            </button>
          ))}
        </div>

        <div className="sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 w-full p-4 h-auto overflow-y-auto flex overflow-x-auto text-white" > 
          {isLoading ? (<div>Loading ... </div>) : (filteredData?.map((item, index) => {
              return (
                <div key={index} className="flex flex-col w-[300px] sm:max-w-xs rounded-xl shadow-xl bg-gray-800">
                  {/* Image Slider */}
                  <ImageSlider>
                    {item.image_url ? item.image_url?.map((path, i) => {
                      return <img key={i} width={270} height={270} src={`${urlPath}${path.storage_values}`} alt={`image-${path.image_url}`} />;
                    }) : ''}
                  </ImageSlider>

                  <div className="flex justify-between w-full p-4">
                    <div>{item.model}</div>
                    <Link href={`${item.page_path}`}>View More</Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
    </div>
  )
}
