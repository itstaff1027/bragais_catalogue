import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import ColorsCheckBox from '@/Components/Attributes/ColorsCheckBox';
import SizesDropDown  from '@/Components/Attributes/SizesDropDown';
import HeelHeights from '@/Components/Attributes/HeelHeightsDropDown';
import CategoriesDropDown from '@/Components/Attributes/CategoriesDropDown';
import RadioButtonStatus from '@/Components/Attributes/RadioButtonStatus';
import PublicLayout from '@/Layouts/PublicLayout'


export default function ProductGalleryPage({ item }){

  useEffect(() => {
    console.log(item);
  }, [])
  return (

    <PublicLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Product Gallery
        </h2>
      }
    >
      test
      {}
    </PublicLayout>

  )

}
