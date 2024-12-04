import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ToolsLayout from '@/Layouts/ToolsLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function OrderTypesPage({ params }){
  const { data, setData, post, processing, errors, reset } = useForm({
    order_type_value: '',
    id: 0
  });

  const [success, setSuccess] = useState(false);
  const [orderTypes, setOrderTypes] = useState([]);

  const [selectedOrderTypeId, setSelectedOrderTypeId] = useState("");

  const handleSelectChange = (event) => {
    setData('id', event.target.value);
    setSelectedOrderTypeId(event.target.value); // Retrieve the id of the selected option
  };

  const submit = (e) =>  {  
    e.preventDefault();
    // alert(data.order_type_value)
    post(route('order_types_name.create'),{
        onSuccess: () => {
            reset('order_type_value');
            fetchData();
        }
    });
  };

  const updateSubmit = (e) =>  {
    e.preventDefault();
    post(route('order_types_name.update', { id: data.id }),{
        onSuccess: () => {
            reset("id");
            fetchData();
            setSelectedOrderTypeId("");
        }  
    });
  };

  const destroySubmit = (e) =>  {
      e.preventDefault();
      post(route('order_types_name.destroy', { id: data.id }),{
          onSuccess: () => {
              reset("id");
              fetchData();
              setSelectedOrderTypeId("");
          }  
      });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(route('product.order_types'), {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      setOrderTypes(data);
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
                Create Order Types
            </h2>
        }
    >
      <div className="flex-col sm:flex-row sm:flex justify-center w-full p-4">
          <form onSubmit={submit} className="w-full p-4 border">
              <InputLabel htmlFor="order_type_value" value="Order Type Value" />
              <TextInput
                  id="order_type_value"
                  type="text"
                  name="order_type_value"
                  value={data.order_type_value}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData('order_type_value', e.target.value)}
              />
              
              <InputError message={errors.order_type_value} className="mt-2" />
              <div className="flex items-center justify-center w-full p-4">
                  <button className="p-2 text-white bg-emerald-500 rounded-2xl" type="submit" disabled={processing}>Submit</button>
              </div>
              
          </form>
          <div className="flex flex-col border h-auto w-full p-4">
              <h1>Lists</h1>
              <select onChange={handleSelectChange} value={selectedOrderTypeId}>
                  <option value="" disabled>Select a Order Type</option>
                  {orderTypes?.map((order_type) => (
                  <option key={order_type.id} value={order_type.id}>
                      {order_type.name}
                  </option>
                  ))}
              </select>
              {selectedOrderTypeId ? (
                  <>
                      <form onSubmit={updateSubmit} className="mt-1 block w-full">
                          <InputLabel htmlFor="order_type_value" value="Update Order Type Name here..." />
                          <TextInput
                              id="update_order_type_value"
                              type="text"
                              name="update_order_type_value"
                              value={data.order_type_value}
                              className="mt-1 block w-full"
                              isFocused={true}
                              onChange={(e) => setData('order_type_value', e.target.value)}
                          />
                          <InputError message={errors.order_type_value} className="mt-2" />
                          <button
                              className="mt-2 p-2 text-white bg-emerald-500 rounded-2xl w-full"
                              type="submit"
                              disabled={processing || !selectedOrderTypeId} // Disable if no selection
                          >
                              Update
                          </button>
                      </form>
                      <form onSubmit={destroySubmit} className="mt-1 block w-full">

                          <InputLabel className="mt-2" htmlFor="order_type_value" value="Choose Order Type to Delete in Dropdowns..." />
                          <button
                              className="w-full mt-2 p-2 text-white bg-rose-600 rounded-2xl"
                              type="submit"
                              disabled={processing || !selectedOrderTypeId} // Disable if no selection
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
