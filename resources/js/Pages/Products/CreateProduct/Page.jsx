import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductsLayout from '@/Layouts/ProductsLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import ColorsCheckBox from '@/Components/Attributes/ColorsCheckBox';
import SizesDropDown  from '@/Components/Attributes/SizesDropDown';
import HeelHeights from '@/Components/Attributes/HeelHeightsDropDown';
import CategoriesDropDown from '@/Components/Attributes/CategoriesDropDown';
import RadioButtonStatus from '@/Components/Attributes/RadioButtonStatus';

export default function CreateProductPage({ params }){
  const { data, setData, post, processing, errors, reset } = useForm({
    model: '',
    status: '',
    color_id: [],
    size_id: [],
    heel_height_id: [],
    category_id: 1,
  });

  const submit = (e) =>  {
    e.preventDefault();
    // setData('status', selectedStatus);
    // console.log(data);
    post(route('products_name.create'),{
      onSuccess: () => {
        reset('model', 'status', 'color_id', 'size_id', 'heel_height_id', 'category_id');
      }
    });
  };


  return (

    <ProductsLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Create Product
        </h2>
      }
    >
      <div className="flex flex-col justify-center w-full">
        <form onSubmit={submit} className="w-full p-4">
          <InputLabel htmlFor="model" value="Model Name" />
          <TextInput
            id="model"
            type="text"
            name="model"
            value={data.model}
            className="mt-1 block w-1/2"
            isFocused={true}
            onChange={(e) => setData('model', e.target.value)}
          />
          {/* <InputLabel htmlFor="size_value_note" value="Note: Use ',' (comma) to seperate the sizes if adding multiple sizes. (39,40,41, etc)" /> */}
          <InputError message={errors.model} className="mt-2" />
          <hr />
          <RadioButtonStatus handleSelectChange={(statuses) => setData('status', statuses)} status={data.status} />
          <InputError message={errors.status} className="mt-2" />
          <hr />
          <InputLabel htmlFor="colors" value="Colors" />
          <div className="p-4 h-36 overflow-y-auto">
          <ColorsCheckBox.Colors 
            handleSelectedColor={(selectedColor, isRemoving = false) => {
              if (isRemoving) {
                // Remove the color by ID
                setData('color_id', data.color_id.filter(color => color.id !== selectedColor.id)); // Remove the color by ID
              } else {
                // Check if the color is already in the list before adding it
                if (!data.color_id.some(color => color.id === selectedColor.id)) {
                  // Add the selected color
                  setData('color_id', [...data.color_id, selectedColor]);
                }
              }
            }} 
            colors={data.color_id} 
          />
          </div>
          <InputError message={errors.color_id} className="mt-2" />
          <hr />
          <InputLabel htmlFor="sizes" value="Sizes" />
          <div className="p-4">
            <SizesDropDown.CheckBox handleSizeCheckBox={(sizeIds) => setData('size_id', sizeIds)} sizeSelectedId={data.size_id}/>
            <InputError message={errors.size_id} className="mt-2" />

          </div>
          <hr />
          <InputLabel htmlFor="heel_heights" value="Heel Heights" />
          <div className="p-4">
            <HeelHeights.CheckBox handleCheckBox={(heelHeightIds) => setData('heel_height_id', heelHeightIds)} heelHeight={data.heel_height_id}/>
            <InputError message={errors.heel_height_id} className="mt-2" />

          </div>
          <hr />
          <InputLabel htmlFor="categories" value="Categories" />
          <div className="p-4">
            <CategoriesDropDown handleSelectChange={(e) => setData('category_id', e.target.value)} selectedItemId={data.category_id}/>
            <InputError message={errors.category_id} className="mt-2" />

          </div>
          <div className="flex items-center justify-center w-1/2">
            <button className="p-2 text-white bg-emerald-500 rounded-2xl" type="submit" disabled={processing}>Submit</button>
          </div>
          
        </form>
      </div>
    </ProductsLayout>

  )

}
