import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ToolsLayout from '@/Layouts/ToolsLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function SizesPage({ params }){
  const { data, setData, post, processing, errors, reset } = useForm({
      size_name_id: 0,
      size_name: '',
      size_value_id:0,
      size_values: ''
  });

  const [success, setSuccess] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [sizeValues, setSizeValues] = useState([]);

  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [sizeValueId, setSizeValueId] = useState("");

  const handleSelectChange = (event) => {
      setData('size_name_id', event.target.value);
      setSelectedSizeId(event.target.value); // Retrieve the id of the selected option
      fetchDataSizeValues(event.target.value);
  };

  const submit = (e) =>  {
      e.preventDefault();
      post(route('size_name.create'),{
          onSuccess: () => {
              reset('size_name');
              fetchData();
              setSelectedSizeId("");
          }
      });
  };

  const updateSubmit = (e) =>  {
      e.preventDefault();
      post(route('size_name.update', { id: data.size_name_id }),{
          onSuccess: () => {
              reset("size_name_id");
              fetchData();
              setSelectedSizeId("");
          }  
      });
  };

  const destroySubmit = (e) =>  {
      e.preventDefault();
      post(route('size_name.destroy', { id: data.size_name_id }),{
          onSuccess: () => {
              reset("size_name_id");
              fetchData();
              setSelectedSizeId("");
          }  
      });
  };

  const fetchData = async () => {
      try {
          const response = await fetch(route('product.sizes'), {
              headers: {
                  'Content-Type': 'application/json',
              },
          })

          const data = await response.json()
          setSizes(data);
      } catch (error) {
          console.log('Something went Wrong', error)
      }
  }

  const changeSizeValues = (event) => {
    setData('size_value_id', event.target.value);
    setSizeValueId(event.target.value); // Retrieve the id of the selected option
  };

  const fetchDataSizeValues = async (size_id) => {
    try {
        const response = await fetch(`/auth/api/get-size-values/${size_id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        setSizeValues(data);
    } catch (error) {
        console.log('Something went Wrong', error)
    }
  }

  const submitSizeValues = (e) =>  {
    e.preventDefault();
    post(route('size_values.create'),{
        onSuccess: () => {
            reset('size_values');
            fetchDataSizeValues();
            setSelectedSizeId("");
        }
    });
  };
  const updateSizeValues = (e) =>  {
    e.preventDefault(); 
    post(route('size_values.update', { id: data.size_value_id }),{
        onSuccess: () => {
            reset("size_values_id");
            fetchDataSizeValues();
            setSelectedSizeId("");
        }  
    });
  };

  const destroySizeValues = (e) =>  {
    e.preventDefault();
    post(route('size_values.destroy', { id: data.size_value_id }),{
        onSuccess: () => {
            reset("size_values_id");
            fetchDataSizeValues();
            setSelectedSizeId("");
        }  
    });
  };

  useEffect(() => {
      fetchData();
  }, []);
  return (

    <ToolsLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Create Sizes
            </h2>
        }
    >
      <div className="flex flex-col justify-center w-full p-4">
            <div className="w-full flex flex-row">
              <form onSubmit={submit} className="w-full p-4 border">
                  <InputLabel htmlFor="size_name" value="Size Name" />
                  <TextInput
                      id="size_name"
                      type="text"
                      name="size_name"
                      value={data.size_name}
                      className="mt-1 block w-full"
                      isFocused={true}
                      onChange={(e) => setData('size_name', e.target.value)}
                  />
                  
                  <InputError message={errors.size_name} className="mt-2" />
                  <div className="flex items-center justify-center w-full p-4">
                      <button className="p-2 text-white bg-emerald-500 rounded-2xl" type="submit" disabled={processing}>Submit</button>
                  </div>
              </form>

              <div className="flex flex-col border h-auto w-full p-4">
                <h1>Size Name Lists</h1>
                <select onChange={handleSelectChange} value={selectedSizeId}>
                    <option value="" disabled>Select a Size</option>
                    {sizes?.map((size) => (
                    <option key={size.id} value={size.id}>
                        {size.sizes}
                    </option>
                    ))}
                </select>
                <InputLabel htmlFor="size_name_note" value="To Add size values in particular category, just pick one Size Name" />
                {selectedSizeId ? (
                    <div className="w-full">
                      <div className="w-full flex">
                        <form onSubmit={updateSubmit} className="p-4 block w-full">
                            <InputLabel htmlFor="size_name" value="Update Size Name here..." />
                            <TextInput
                                id="update_size_name"
                                type="text"
                                name="update_size_name"
                                value={data.size_name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('size_name', e.target.value)}
                            />
                            <InputError message={errors.size_name} className="mt-2" />
                            <button
                                className="mt-2 p-2 text-white bg-emerald-500 rounded-2xl w-full"
                                type="submit"
                                disabled={processing || !selectedSizeId} // Disable if no selection
                            >
                                Update
                            </button>
                        </form>
                        <form onSubmit={destroySubmit} className="p-4 block w-full">

                            <InputLabel className="mt-2" htmlFor="size_name" value="Choose Size to Delete in Dropdowns..." />
                            <button
                                className="w-full mt-2 p-2 text-white bg-rose-600 rounded-2xl"
                                type="submit"
                                disabled={processing || !selectedSizeId} // Disable if no selection
                            >
                                Delete
                            </button>
                        </form>
                      </div>
                      <div className="w-full flex">
                      </div>
                    </div>
                ) : ''}
              </div>
            </div>
            
            <div className="flex flex-row w-full ">
              {selectedSizeId ? (
                <>
                  <form onSubmit={submitSizeValues} className="w-full p-4 border">
                    <InputLabel htmlFor="size_value" value="Size Value" />
                    <TextInput
                        id="size_values"
                        type="text"
                        name="size_values"
                        value={data.size_values}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('size_values', e.target.value)}
                    />
                    <InputLabel htmlFor="size_value_note" value="Note: Use ',' (comma) to seperate the sizes if adding multiple sizes. (39,40,41, etc)" />
                    <InputError message={errors.size_values} className="mt-2" />
                    <div className="flex items-center justify-center w-full p-4">
                        <button className="p-2 text-white bg-emerald-500 rounded-2xl" type="submit" disabled={processing}>Submit</button>
                    </div>
                    
                  </form>
                  <div className="flex flex-col w-full p-4 border">
                    <h1>Size Values Lists</h1>
                    <select onChange={changeSizeValues} value={sizeValueId}>
                      <option value="" disabled>Select a Size Values</option>
                      {sizeValues?.map((value) => (
                      <option key={value.id} value={value.id}>
                          {value.size_values}
                      </option>
                      ))}
                    </select>
                    
                    <div className="w-full">
                      <div className="w-full flex">
                        <form onSubmit={updateSizeValues} className="p-4 block w-full">
                            <InputLabel htmlFor="size_values" value="Update Size Value here..." />
                            <TextInput
                                id="size_values"
                                type="text"
                                name="size_values"
                                value={data.size_values}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('size_values', e.target.value)}
                            />
                            <InputError message={errors.size_values} className="mt-2" />
                            <button
                                className="mt-2 p-2 text-white bg-emerald-500 rounded-2xl w-full"
                                type="submit"
                                disabled={processing || !selectedSizeId} // Disable if no selection
                            >
                                Update
                            </button>
                        </form>
                        <form onSubmit={destroySizeValues} className="p-4 block w-full">

                            <InputLabel className="mt-2" htmlFor="size_values" value="Choose Size Values to Delete in Dropdowns..." />
                            <button
                                className="w-full mt-2 p-2 text-white bg-rose-600 rounded-2xl"
                                type="submit"
                                disabled={processing || !selectedSizeId} // Disable if no selection
                            >
                                Delete
                            </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              ) : ''}
            </div>
        </div>
    </ToolsLayout>

  )

}
