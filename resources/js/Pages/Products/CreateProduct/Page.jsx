import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductsLayout from '@/Layouts/ProductsLayout';
import { Head } from '@inertiajs/react';

export default function CreateProductPage({ params }){

  return (

    <ProductsLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Create Product
            </h2>
        }
    >
        Create Products
    </ProductsLayout>

  )

}
