import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ToolsLayout from '@/Layouts/ToolsLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function ColorsPage({ params }){
    const { data, setData, post, processing, errors, reset } = useForm({
        color_name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // post(route('color_name.create'),{
        //     onSuccess: () => reset('color_name')
        // });
    };

  return (

    <ToolsLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Create Colors
            </h2>
        }
    >
        <div className="flex items-center justify-center w-full p-4">
            <form onSubmit={submit} className="w-full">
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

                <button type="submit" disabled={processing}>Submit</button>
            </form>
            <div className="w-full">
                <h1>Lists</h1>
                <select>
                    <option disabled>Values</option>
                </select>
            </div>
            
        </div>
    </ToolsLayout>

  )

}
