import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ToolsLayout from '@/Layouts/ToolsLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function ColorsPage({ params }){
    const { data, setData, post, processing, errors, reset } = useForm({
        id: 0,
        color_name: '',
    });

    const [success, setSuccess] = useState(false);
    const [colors, setColors] = useState([]);

    const [selectedColorId, setSelectedColorId] = useState("");

    const handleSelectChange = (event) => {
        setData('id', event.target.value);
        setSelectedColorId(event.target.value); // Retrieve the id of the selected option
    };

    const submit = (e) =>  {
        e.preventDefault();
        post(route('color_name.create'),{
            onSuccess: () => {
                reset('color_name');
                fetchData();
                setSelectedColorId("");
            }
        });
    };

    const updateSubmit = (e) =>  {
        e.preventDefault();
        post(route('color_name.update', { id: data.id }),{
            onSuccess: () => {
                reset("id");
                fetchData();
                setSelectedColorId("");
            }  
        });
    };

    const destroySubmit = (e) =>  {
        e.preventDefault();
        post(route('color_name.destroy', { id: data.id }),{
            onSuccess: () => {
                reset("id");
                fetchData();
                setSelectedColorId("");
            }  
        });
    };

    const fetchData = async () => {
        try {
            const response = await fetch(route('product.colors'), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()
            setColors(data);
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
                Create Colors
            </h2>
        }
    >
        <div className="flex justify-center w-full p-4">
            <form onSubmit={submit} className="w-full p-4 border">
                <InputLabel htmlFor="color_name" value="Color Name" />
                <TextInput
                    id="color_name"
                    type="text"
                    name="color_name"
                    value={data.color_name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('color_name', e.target.value)}
                />
                
                <InputError message={errors.color_name} className="mt-2" />
                <div className="flex items-center justify-center w-full p-4">
                    <button className="p-2 text-white bg-emerald-500 rounded-2xl" type="submit" disabled={processing}>Submit</button>
                </div>
                
            </form>
            <div className="flex flex-col border h-auto w-full p-4">
                <h1>Lists</h1>
                <select onChange={handleSelectChange} value={selectedColorId}>
                    <option value="" disabled>Select a color</option>
                    {colors?.map((color) => (
                    <option key={color.id} value={color.id}>
                        {color.color}
                    </option>
                    ))}
                </select>
                {selectedColorId ? (
                    <>
                        <form onSubmit={updateSubmit} className="mt-1 block w-full">
                            <InputLabel htmlFor="color_name" value="Update Color Name here..." />
                            <TextInput
                                id="update_color_name"
                                type="text"
                                name="update_color_name"
                                value={data.color_name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('color_name', e.target.value)}
                            />
                            <InputError message={errors.color_name} className="mt-2" />
                            <button
                                className="mt-2 p-2 text-white bg-emerald-500 rounded-2xl w-full"
                                type="submit"
                                disabled={processing || !selectedColorId} // Disable if no selection
                            >
                                Update
                            </button>
                        </form>
                        <form onSubmit={destroySubmit} className="mt-1 block w-full">

                            <InputLabel className="mt-2" htmlFor="color_name" value="Choose Color to Delete in Dropdowns..." />
                            <button
                                className="w-full mt-2 p-2 text-white bg-rose-600 rounded-2xl"
                                type="submit"
                                disabled={processing || !selectedColorId} // Disable if no selection
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
