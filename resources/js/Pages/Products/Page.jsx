import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductsLayout from '@/Layouts/ProductsLayout';
import { Head, Link } from '@inertiajs/react';
import BragaisTable from '@/Components/BragaisTable';

export default function ProductsPage({ items }){

    const [productData, setProductData] = useState(items.data);

    const tableHead = [
        {
            "id": 0,
            "name": 'ID'
        },
        {
            "id": 1,
            "name": 'Model'
        },
        {
            "id": 2,
            "name": 'Status'
        },
        {
            "id": 3,
            "name": 'Action'
        },
    ];

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch(route('all_product'), {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         })
  
    //         const data = await response.json()
    //         setProductData(data);
    //     } catch (error) {
    //         console.log('Something went Wrong', error)
    //     }
    // }

    useEffect(() => {
    }, [items]);

  return (

    <ProductsLayout>
        <div className="flex flex-col w-full p-4 border">
            <div className="flex w-full justify-end">
                <h1>Search</h1>
            </div>
            <div className="w-full">
                <table className="table-auto w-full text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Model</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.model}</td>
                                <td className="flex justify-center items-center"><div className={`p-2 text-white rounded-3xl ${product.status === 'active' ? 'bg-emerald-300' : 'bg-slate-400'}`}>{product.status}</div></td>
                                <td>
                                    <Link href={route('product.edit', product.id)}>Edit</Link>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination controls */}
                <div className="pagination-controls">
                    {items.links.map((link) => (
                        <Link 
                            key={link.label} 
                            href={link.url} 
                            className={`pagination-link ${link.active ? 'active bg-emerald-200' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }} 
                        />
                    ))}
                </div>
            </div>
        </div>
    </ProductsLayout>
  )

}
