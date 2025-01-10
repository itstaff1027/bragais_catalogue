import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ToolsLayout from '@/Layouts/ToolsLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function SectionsPage({ items }){
  const { data, setData, post, processing, errors, reset } = useForm({
    page_section_value: '',
    id: 0
  });

  const [success, setSuccess] = useState(false);
  const [pageSection, setPageSection] = useState([]);

  const [selectedPageSectionId, setSelectedPageSectionId] = useState("");

  const handleSelectChange = (event) => {
    setData('id', event.target.value);
    setSelectedPageSectionId(event.target.value); // Retrieve the id of the selected option
  };

  const submit = (e) =>  {  
    e.preventDefault();
    // alert(data.page_section_value)
    post(route('page_sections_name.create'),{
        onSuccess: (page) => {
            reset();
        }
    });
  };

  const updateSubmit = (e) =>  {
    e.preventDefault();
    post(route('page_sections_name.update', data.id),{
        onSuccess: (page) => {
            reset();
            // fetchData();
            setSelectedPageSectionId("");
        }  
    });
  };

  const destroySubmit = (e) =>  {
      e.preventDefault();
      post(route('page_sections_name.destroy', { id: data.id }),{
          onSuccess: (page) => {
                reset();
                setSelectedPageSectionId("");
          }  
      });
  };

  return (

    <ToolsLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Create Page Section Names
            </h2>
        }
    >
      <div className="flex-col sm:flex-row sm:flex justify-center w-full p-4">
          <form onSubmit={submit} className="w-full p-4 border">
              <InputLabel htmlFor="page_section_value" value="Page Section Value" />
              <TextInput
                  id="page_section_value"
                  type="text"
                  name="page_section_value"
                  value={data.page_section_value}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData('page_section_value', e.target.value)}
              />
              
              <InputError message={errors.page_section_value} className="mt-2" />
              <div className="flex items-center justify-center w-full p-4">
                  <button className="p-2 text-white bg-emerald-500 rounded-2xl" type="submit" disabled={processing}>Submit</button>
              </div>
              
          </form>
          <div className="flex flex-col border h-auto w-full p-4">
              <h1>Lists</h1>
              <select onChange={handleSelectChange} value={selectedPageSectionId}>
                  <option value="" disabled>Select a Page Section</option>
                  {items?.map((page_section) => (
                  <option key={page_section.id} value={page_section.id}>
                      {page_section.section_name}
                  </option>
                  ))}
              </select>
              {selectedPageSectionId ? (
                  <>
                      <form onSubmit={updateSubmit} className="mt-1 block w-full">
                          <InputLabel htmlFor="page_section_value" value="Update Page Section Name here..." />
                          <TextInput
                              id="update_page_section_value"
                              type="text"
                              name="update_page_section_value"
                              value={data.page_section_value}
                              className="mt-1 block w-full"
                              isFocused={true}
                              onChange={(e) => setData('page_section_value', e.target.value)}
                          />
                          <InputError message={errors.page_section_value} className="mt-2" />
                          <button
                              className="mt-2 p-2 text-white bg-emerald-500 rounded-2xl w-full"
                              type="submit"
                              disabled={processing || !selectedPageSectionId} // Disable if no selection
                          >
                              Update
                          </button>
                      </form>
                      <form onSubmit={destroySubmit} className="mt-1 block w-full">

                          <InputLabel className="mt-2" htmlFor="page_section_value" value="Choose Page Section to Delete in Dropdowns..." />
                          <button
                              className="w-full mt-2 p-2 text-white bg-rose-600 rounded-2xl"
                              type="submit"
                              disabled={processing || !selectedPageSectionId} // Disable if no selection
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
