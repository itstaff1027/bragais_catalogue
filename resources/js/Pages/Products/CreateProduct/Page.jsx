import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductsLayout from '@/Layouts/ProductsLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import ColorsCheckBox from '@/Components/Attributes/ColorsCheckBox';
import SizesDropDown from '@/Components/Attributes/SizesDropDown';
import HeelHeightsDropDown from '@/Components/Attributes/HeelHeightsDropDown';
import CategoriesDropDown from '@/Components/Attributes/CategoriesDropDown';

export default function CreateProductPage({ params }){
  const { data, setData, post, processing, errors, reset } = useForm({
    model: '',
    color_id: [],
    size_id: 0,
    heel_height_id: 0,
    category_id: 0,
  });

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedHeelHeights, setSelectedHeelHeights] = useState([]);

  // Handle checkbox changes
  const handleColorChange = (colorsId) => {
      if (selectedColors.includes(colorsId)) {
          // Remove colors if already selected
          setSelectedColors(selectedColors.filter((id) => id !== colorsId));
      } else {
          // Add colors if not selected
          setSelectedColors([...selectedColors, colorsId]);
      }
  };

  const handleHeelHeightChange = (HeelHeightsId) => {
    if (selectedHeelHeights.includes(HeelHeightsId)) {
        // Remove HeelHeights if already selected
        setSelectedHeelHeights(selectedHeelHeights.filter((id) => id !== HeelHeightsId));
    } else {
        // Add HeelHeights if not selected
        setSelectedHeelHeights([...selectedHeelHeights, HeelHeightsId]);
    }
  };

  const submit = (e) =>  {
    e.preventDefault();
    data.color_id = selectedItems;
    post(route('size_name.create'),{
      onSuccess: () => {
        reset('size_name');
        fetchData();
        setSelectedSizeId("");
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

          <InputLabel htmlFor="colors" value="Colors" />
          <div className="p-4 h-36 overflow-auto">
            <ColorsCheckBox handleCheckBox={handleColorChange} selectedItemId={selectedColors}/>
          </div>
          <InputError message={errors.color_id} className="mt-2" />

          <InputLabel htmlFor="sizes" value="Sizes" />
          <div className="p-4">
            <SizesDropDown handleSelectChange={(e) => setData('size_id', e.target.value)} selectedItemId={data.size_id}/>
          </div>

          <InputLabel htmlFor="heel_heights" value="Heel Heights" />
          <div className="p-4">
            <HeelHeightsDropDown handleCheckBox={handleHeelHeightChange} selectedItemId={selectedHeelHeights}/>
          </div>
          
          <InputLabel htmlFor="categories" value="Categories" />
          <div className="p-4">
            <CategoriesDropDown handleSelectChange={(e) => setData('category_id', e.target.value)} selectedItemId={data.category_id}/>
          </div>
          <div className="flex items-center justify-center w-1/2">
            <button className="p-2 text-white bg-emerald-500 rounded-2xl" type="submit" disabled={processing}>Submit</button>
          </div>
          
        </form>
      </div>
    </ProductsLayout>

  )

}
