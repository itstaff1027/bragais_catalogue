import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ToolsLayout from '@/Layouts/ToolsLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function HeelHeightsPage({ params }){
  const { data, setData, post, processing, errors, reset } = useForm({
    heel_height: '',
  });

  const [success, setSuccess] = useState(false);
  const [heelHeights, setHeelHeight] = useState([]);

  const submit = (e) =>  {
    e.preventDefault();
    post(route('heel_height.create'),{
        onSuccess: () => {
            reset('heel_height');
            fetchData();
        }
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/api/get-colors', {
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
        <div className="flex justify-center w-full p-4">
            <form onSubmit={submit} className="w-full p-4 border">
                <InputLabel htmlFor="heel_height" value="Heel Height" />
                <TextInput
                    id="heel_height"
                    type="text"
                    name="heel_height"
                    value={data.heel_height}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('heel_height', e.target.value)}
                />
                
                <InputError message={errors.heel_height} className="mt-2" />
                <div className="flex items-center justify-center w-full p-4">
                    <button className="p-2 text-white bg-emerald-500 rounded-2xl" type="submit" disabled={processing}>Submit</button>
                </div>
                
            </form>
            <div className="border h-auto w-full p-4">
                <h1>Lists</h1>
                <select>
                    {heelHeights?.map((heelHeight, i) => (
                        <option key={i}>{heelHeight.value} Inches</option>
                    ))}
                </select>
            </div>
            
        </div>
    </ToolsLayout>

  )

}
