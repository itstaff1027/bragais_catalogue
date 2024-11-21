import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ToolsLayout from '@/Layouts/ToolsLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function HeelHeightsPage({ params }){
  const { data, setData, post, processing, errors, reset } = useForm({
    heel_height_value: '',
  });

  const [success, setSuccess] = useState(false);
  const [heelHeights, setHeelHeight] = useState([]);

  const [selectedHeelHeightId, setSelectedHeelHeightId] = useState("");

  const handleSelectChange = (event) => {
    setData('id', event.target.value);
    setSelectedHeelHeightId(event.target.value); // Retrieve the id of the selected option
  };

  const submit = (e) =>  {  
    e.preventDefault();
    // alert(data.heel_height_value)
    post(route('heel_height_name.create'),{
        onSuccess: () => {
            reset('heel_height_value');
            fetchData();
        }
    });
  };

  const updateSubmit = (e) =>  {
    e.preventDefault();
    post(route('heel_height_name.update', { id: data.id }),{
        onSuccess: () => {
            reset("id");
            fetchData();
            setSelectedHeelHeightId("");
        }  
    });
  };

  const destroySubmit = (e) =>  {
      e.preventDefault();
      post(route('heel_height_name.destroy', { id: data.id }),{
          onSuccess: () => {
              reset("id");
              fetchData();
              setSelectedHeelHeightId("");
          }  
      });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(route('product.heel_heights'), {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      setHeelHeight(data);
    } catch (error) {
      console.log('Something went Wrong', error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (

    <ToolsLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Create Heel Heights
            </h2>
        }
    >
      <div className="flex-col sm:flex-row sm:flex justify-center w-full p-4">
            <form onSubmit={submit} className="w-full p-4 border">
                <InputLabel htmlFor="heel_height_value" value="Heel Height Value" />
                <TextInput
                    id="heel_height_value"
                    type="number"
                    name="heel_height_value"
                    value={data.heel_height_value}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('heel_height_value', e.target.value)}
                />
                
                <InputError message={errors.heel_height_value} className="mt-2" />
                <div className="flex items-center justify-center w-full p-4">
                    <button className="p-2 text-white bg-emerald-500 rounded-2xl" type="submit" disabled={processing}>Submit</button>
                </div>
                
            </form>
            <div className="flex flex-col border h-auto w-full p-4">
                <h1>Lists</h1>
                <select onChange={handleSelectChange} value={selectedHeelHeightId}>
                    <option value="" disabled>Select a Heel Height</option>
                    {heelHeights?.map((heel_height) => (
                    <option key={heel_height.id} value={heel_height.id}>
                        {heel_height.heel_heights}
                    </option>
                    ))}
                </select>
                {selectedHeelHeightId ? (
                    <>
                        <form onSubmit={updateSubmit} className="mt-1 block w-full">
                            <InputLabel htmlFor="heel_height_value" value="Update heel_height Name here..." />
                            <TextInput
                                id="update_heel_height_value"
                                type="number"
                                name="update_heel_height_value"
                                value={data.heel_height_value}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('heel_height_value', e.target.value)}
                            />
                            <InputError message={errors.heel_height_value} className="mt-2" />
                            <button
                                className="mt-2 p-2 text-white bg-emerald-500 rounded-2xl w-full"
                                type="submit"
                                disabled={processing || !selectedHeelHeightId} // Disable if no selection
                            >
                                Update
                            </button>
                        </form>
                        <form onSubmit={destroySubmit} className="mt-1 block w-full">

                            <InputLabel className="mt-2" htmlFor="heel_height_value" value="Choose heel_height to Delete in Dropdowns..." />
                            <button
                                className="w-full mt-2 p-2 text-white bg-rose-600 rounded-2xl"
                                type="submit"
                                disabled={processing || !selectedHeelHeightId} // Disable if no selection
                            >
                                Delete
                            </button>
                        </form>
                    </>
                    
                    
                ) : ''}

            </div>
            
        </div>
    </ToolsLayout>

  )

}
