import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ToolsLayout from '@/Layouts/ToolsLayout';
import { Head } from '@inertiajs/react';

export default function OrderTypesPage({ params }){

  return (

    <ToolsLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Create Order Types
            </h2>
        }
    >
        Order Types
    </ToolsLayout>

  )

}
