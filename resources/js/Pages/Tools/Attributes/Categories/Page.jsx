import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ToolsLayout from '@/Layouts/ToolsLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function CategoriesPage({ params }){

  const { data, setData, post, processing, errors, reset } = useForm({
    id: 0,
    categories_name: '',
    categories_gender: 'male'
  });

  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  const [selectedCategoriesId, setSelectedCategoriesId] = useState("");

  const handleSelectChange = (event) => {
      setData('id', event.target.value);
      setSelectedCategoriesId(event.target.value); // Retrieve the id of the selected option
  };

  const submit = (e) =>  {
      e.preventDefault();
      post(route('categories_name.create'),{
          onSuccess: () => {
              reset('categories_name');
              fetchData();
              setSelectedCategoriesId("");
          }
      });
  };

  const updateSubmit = (e) =>  {
      e.preventDefault();
      post(route('categories_name.update', { id: data.id }),{
          onSuccess: () => {
              reset();
              fetchData();
              setSelectedCategoriesId("");
          }  
      });
  };

    const addGender = (e) =>  {
        e.preventDefault();
        post(route('categories_gender.update', { id: data.id }),{
            onSuccess: () => {
                reset();
                fetchData();
                setSelectedCategoriesId("");
            }  
        });
    };

  const destroySubmit = (e) =>  {
      e.preventDefault();
      post(route('categories_name.destroy', { id: data.id }),{
          onSuccess: () => {
              reset("id");
              fetchData();
              setSelectedCategoriesId("");
          }  
      });
  };

  const fetchData = async () => {
      try {
          const response = await fetch(route('product.categories'), {
              headers: {
                  'Content-Type': 'application/json',
              },
          })

          const data = await response.json()
          setCategories(data);
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
                Create Categories
            </h2>
        }
    >
      <div className="flex-col sm:flex-row sm:flex justify-center w-full p-4">
            <form onSubmit={submit} className="w-full p-4 border">
                <InputLabel htmlFor="categories_name" value="Categories Name" />
                <TextInput
                    id="categories_name"
                    type="text"
                    name="categories_name"
                    value={data.categories_name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('categories_name', e.target.value)}
                />
                
                <InputError message={errors.categories_name} className="mt-2" />
                <div className="flex items-center justify-center w-full p-4">
                    <button className="p-2 text-white bg-emerald-500 rounded-2xl" type="submit" disabled={processing}>Submit</button>
                </div>
                
            </form>
            <div className="flex flex-col border h-auto w-full p-4">
                <h1>Lists</h1>
                <select onChange={handleSelectChange} value={selectedCategoriesId}>
                    <option value="" disabled>Select a categories</option>
                    {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.categories}
                    </option>
                    ))}
                </select>
                {selectedCategoriesId && (
                    <>
                        <form onSubmit={updateSubmit} className="mt-1 block w-full">
                            <InputLabel htmlFor="categories_name" value="Update Categories Name here..." />
                            <TextInput
                                id="update_categories_name"
                                type="text"
                                name="update_categories_name"
                                value={data.categories_name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('categories_name', e.target.value)}
                            />
                            <InputError message={errors.categories_name} className="mt-2" />
                            <button
                                className="mt-2 p-2 text-white bg-emerald-500 rounded-2xl w-full"
                                type="submit"
                                disabled={processing || !selectedCategoriesId} // Disable if no selection
                            >
                                Update
                            </button>
                        </form>
                        <form onSubmit={addGender} className="mt-1 block w-full">
                            <InputLabel htmlFor="categories_gender" value="Update Gender Category..." />
                            <select onChange={(e) => setData('categories_gender', e.target.value)}>
                                <option disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="none">None</option>
                            </select>
                            <InputError message={errors.categories_gender} className="mt-2" />
                            <button
                                className="mt-2 p-2 text-white bg-emerald-500 rounded-2xl w-full"
                                type="submit"
                                disabled={processing || !selectedCategoriesId} // Disable if no selection
                            >
                                Update
                            </button>
                        </form>
                        <form onSubmit={destroySubmit} className="mt-1 block w-full">

                            <InputLabel className="mt-2" htmlFor="categories_name" value="Choose categories to Delete in Dropdowns..." />
                            <button
                                className="w-full mt-2 p-2 text-white bg-rose-600 rounded-2xl"
                                type="submit"
                                disabled={processing || !selectedCategoriesId} // Disable if no selection
                            >
                                Delete
                            </button>
                        </form>
                    </>
                    
                    
                )}

            </div>
            
        </div>
    </ToolsLayout>

  )

}
