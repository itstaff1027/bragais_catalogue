import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductsLayout from '@/Layouts/ProductsLayout';
import { Head } from '@inertiajs/react';
import BragaisTable from '@/Components/BragaisTable';

export default function ProductsPage({ params }){

    const testHead = [
        {
            "id": 0,
            "name": "test1"
        },
        {
            "id": 2,
            "name": "test2"
        }
    ]

    const testBody = [
        {
            "id": 0,
            "items": [
                {
                    "id": 0,
                    "name": "testtest1"
                },
                {
                    "id": 1,
                    "name": "testtest2"
                }
            ]
        }
    ]

  return (

    <ProductsLayout>
        <div className="flex flex-col w-full p-4 border">
            <div className="flex w-full justify-end">
                <h1>Search</h1>
            </div>
            <div className="w-full">
                <BragaisTable
                    tableHead={testHead}
                    tableBody={testBody}
                    className="table-auto"
                />
            </div>
            
        </div>
    </ProductsLayout>
  )

}
