import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductsLayout from '@/Layouts/ProductsLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
// import { Inertia } from '@inertiajs/inertia';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import ColorsCheckBox from '@/Components/Attributes/ColorsCheckBox';
import SizesDropDown  from '@/Components/Attributes/SizesDropDown';
import HeelHeights from '@/Components/Attributes/HeelHeightsDropDown';
import Categories from '@/Components/Attributes/CategoriesDropDown';
import RadioButtonStatus from '@/Components/Attributes/RadioButtonStatus';

export default function EditProductPage({ items }){
    const { data, setData, post, processing, errors, reset, isDirty } = useForm({
        id: items.id,
        model: items.model,
        status: items.status,
        size_id: items.size_id,
        category_id: items.category_id
    });

    const { props } = usePage();

    const [model, setModel] = useState(items.model);

    const [images, setImages] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [selectedColors, setSeslectedColors] = useState([]);
    const [heelHeightOptions, setHeelHeightOptions] = useState([]);
    const [selectedHeelHeights, setSelectedHeelHeights] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const submit = (e) =>  {
        e.preventDefault();
        post(route('products_name.create'),{
            onSuccess: () => {
                reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
            }
        });
    };

    const addColor = (color) => {

        router.post(route('add_product.color'), color, {
            onSuccess: () => {
                reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
            },
            onError: (error) => {
                console.error('An error occurred:', error); // Handle error
            },
            onFinish: () => {
                getSelectionColors(); // Refresh the data
                getSelectedColors(); // Refresh the selected colors
            },
            preserveScroll: true,
        });

    };

    const removeColor = (removeColor) => {
        router.post(route('remove_product.color'), removeColor, {
            onSuccess: () => {
                reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
            },
            onError: (error) => {
                console.error('An error occurred:', error); // Handle error
            },
            onFinish: () => {
                getSelectionColors(); // Refresh the data
                getSelectedColors(); // Refresh the selected colors
            },
            preserveScroll: true,
        })
    }

    const addHeelHeight = (heelHeight) => {
        console.log(heelHeight);
        router.post(route('heel_height_product.update'), heelHeight, {
            onSuccess: () => {
                reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
            },
            onError: (error) => {
                console.error('An error occurred:', error); // Handle error
            },
            onFinish: () => {
                getSelectedHeelHeights();
                getSelectionHeelHeight();
            },
            preserveScroll: true,
        });

    };

    const removeHeelHeight = (removeHeelHeight) => {
        router.post(route('heel_height_product.destroy'), removeHeelHeight, {
            onSuccess: () => {
                reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
            },
            onError: (error) => {
                console.error('An error occurred:', error); // Handle error
            },
            onFinish: () => {
                getSelectedHeelHeights();
                getSelectionHeelHeight();
            },
            preserveScroll: true,
        })
    }

    const addSize = (size) => {
        console.log(size);
        router.post(route('sizes_product.update'), size, {
            onSuccess: () => {
                reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
            },
            onError: (error) => {
                console.error('An error occurred:', error); // Handle error
            },
            onFinish: () => {
                getSelectedSizes();
                getSelectionSize();
            },
            preserveScroll: true,
        });

    };

    const removeSize = (removeSize) => {
        router.post(route('sizes_product.destroy'), removeSize, {
            onSuccess: () => {
                reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
            },
            onError: (error) => {
                console.error('An error occurred:', error); // Handle error
            },
            onFinish: () => {
                getSelectedSizes();
                getSelectionSize();
            },
            preserveScroll: true,
        })
    }

    const changeStatus = (status) => {
        if (confirm('Are you sure you want to update the product status?')) {
            // Proceed with the POST request if the user confirms
            router.post(route('product_update.status'), { id: items.id, status: status}, {
                onSuccess: () => {
                    reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
                },
                onError: (error) => {
                    console.error('An error occurred:', error); // Handle error
                },
                onFinish: () => {
                    getSelectedHeelHeights();
                    getSelectionHeelHeight();
                },
                preserveScroll: true,
            });
        } else {
            // If the user cancels, you can add any logic here if needed
            console.log('Action canceled by user');
        }
    }

    const updateCategory = (newCategory) => {
        // console.log(newCategory)
        if (confirm('Are you sure you want to change the Category of this Product?')) {
            // Proceed with the POST request if the user confirms
            router.post(route('update_product.category'), { id: items.id, category_id: newCategory}, {
                onSuccess: (page) => {
                    setData('category_id', page.props.items.category_id);
                },
                onError: (error) => {
                    console.error('An error occurred:', error); // Handle error
                },
                preserveScroll: true,
            });
        } else {
            // If the user cancels, you can add any logic here if needed
            console.log('Action canceled by user');
        }
    }

    const updateModel = () => {
        // console.log()
        if (confirm('Are you sure you want to change the Model Name of this Product?')) {
            // Proceed with the POST request if the user confirms
            router.post(route('update_product.model'), { id: items.id, model: data.model}, {
                onSuccess: (page) => {
                    setData('model', page.props.items.model);
                    setModel(page.props.items.model)
                },
                onError: (error) => {
                    console.error('An error occurred:', error); // Handle error
                },
                preserveScroll: true,
            });
        } else {
            // If the user cancels, you can add any logic here if needed
            console.log('Action canceled by user');
        }
    }

    const [inputs, setInputs] = useState([
        { id: 1, value: '' },
        { id: 2, value: '' },
        { id: 3, value: '' },
        { id: 4, value: '' },
        { id: 5, value: '' },
    ]);

    // Function to handle adding a new input field
    // const addInput = () => {
    //     setInputs([...inputs, { id: Date.now(), value: '' }]);
    // };

    // // Function to handle removing an input field
    // const removeInput = (id) => {
    //     const updatedInputs = inputs.filter((input) => input.id !== id); // Remove the selected input
    //     setInputs(updatedInputs);
    //     setData('product_keys', updatedInputs); // Sync with external data state
    // };

    // Function to handle changes in input values
    const handleInputChange = (id, newValue) => {
        const updatedInputs = inputs.map((input) =>
            input.id === id ? { ...input, value: newValue } : input
        );
        setInputs(updatedInputs); // Update local state
        setData('product_keys', updatedInputs); // Sync with external data state
    };

    const submitImages = (e) =>  {
        e.preventDefault();
        post(route('storage_create.product_keys', items.id),{
            onSuccess: () => {
                reset('product_keys');
                setInputs([
                    { id: 1, value: '' },
                    { id: 2, value: '' },
                    { id: 3, value: '' },
                    { id: 4, value: '' },
                    { id: 5, value: '' },
                ])
            }
        });
    };


    const fetchImages = async () => {
        try {
            const response = await fetch(route('storage.product_keys', items.id), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()
            setImages(data);
            // console.log(data);
            // if(data){
            //     setInputs([...data]);
            // }
        } catch (error) {
            console.log('Something went Wrong', error)
        }
    }

    const getSelectionColors = async () => {
        try {
            const response = await fetch(route("product.colors"), {
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            // console.log(data);
            setFilteredOptions(data); // Set the available color options
        } catch (error) {
            console.error("Error fetching colors:", error);
        }
    };

    // Fetch colors from the API
    const getSelectedColors = async () => {
        try {
            const response = await fetch(route('color_product', items.id), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                // If the response status code is not OK (2xx), log the error
                console.error('Error response status:', response.status);
                const errorText = await response.text(); // Get the raw error message
                console.error('Error response body:', errorText);
                return; // Exit the function if there's an error
            }
      
            const data = await response.json(); // Only try to parse JSON if the response is OK
            // // console.log(data);
            // const selectedColor = data.map((selected) => ({"id": selected.id, "color": selected.color}))
            setSeslectedColors(data); // Set the available color options
        } catch (error) {
            console.error("Error fetching colors:", error);
        }
    };

    const getSelectionHeelHeight = async () => {
        try {
            const response = await fetch(route("product.heel_heights"), {
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            // console.log(data);
            setHeelHeightOptions(data); // Set the available color options
        } catch (error) {
            console.error("Error fetching HeelHeight:", error);
        }
    };

    // Fetch HeelHeight from the API
    const getSelectedHeelHeights = async () => {
        try {
            const response = await fetch(route('heel_height_product', items.id), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                // If the response status code is not OK (2xx), log the error
                console.error('Error response status:', response.status);
                const errorText = await response.text(); // Get the raw error message
                console.error('Error response body:', errorText);
                return; // Exit the function if there's an error
            }
      
            const data = await response.json(); // Only try to parse JSON if the response is OK
            // console.log(data);
            // const selectedColor = data.map((selected) => ({"id": selected.id, "color": selected.color}))
            setSelectedHeelHeights(data); // Set the available color options
        } catch (error) {
            console.error("Error fetching HeelHeight:", error);
        }
    };

    const getSelectionSize = async () => {
        try {
            const response = await fetch(route("product.sizes"), {
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            // console.log(data);
            setSizeOptions(data); // Set the available color options
        } catch (error) {
            console.error("Error fetching Size:", error);
        }
    };

    // Fetch Size from the API
    const getSelectedSizes = async () => {
        // router.get(route('sizes_product', items.id), {}, {
        //     onSuccess: () => {
        //         setSelectedSizes(data);
        //     }
        // })
        try {
            const response = await fetch(route('sizes_product', items.id), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                // If the response status code is not OK (2xx), log the error
                console.error('Error response status:', response.status);
                const errorText = await response.text(); // Get the raw error message
                console.error('Error response body:', errorText);
                return; // Exit the function if there's an error
            }
      
            const data = await response.json(); // Only try to parse JSON if the response is OK
            // console.log(data);
            // const selectedColor = data.map((selected) => ({"id": selected.id, "color": selected.color}))
            setSelectedSizes(data); // Set the available color options
        } catch (error) {
            console.error("Error fetching Size:", error);
        }
    };

    useEffect(() => {
        fetchImages();
        getSelectionColors();
        getSelectedColors();
        getSelectedHeelHeights();
        getSelectionHeelHeight();
        getSelectedSizes();
        getSelectionSize();
    }, []);

    return (

        <ProductsLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Product
                </h2>
            }
        >
            <div className="flex flex-col justify-center w-full">
                {images.length > 0 ? (
                    <form onSubmit={submit} className="flex flex-col w-full p-4">
                        <div  className="flex w-full p-4 overflow-auto">
                            {images.map((keys) => (
                                <div key={keys.id} className="flex w-full p-1">
                                    <div className="flex flex-col justify-center items-center" key={keys.id}>
                                        {keys.storage_value === 'empty' ? (
                                            <div className="flex justify-center items-center text-white w-36 h-36 bg-slate-400/50 rounded-lg p-4 m-1">
                                                + Image
                                            </div>
                                        ) : (
                                            // <img src="https://drive.google.com/uc?export=view&id=1pNSE-2pnr7dleTEatWY2qK3AbT1LDftt" alt="Image" />
                                            <img 
                                                src={'/assets/jehzasilver.webp'} 
                                                className="w-80" 
                                                alt="Google Drive Image"
                                            />
                                        )

                                        }
                                        
                                        {/* <img  src={'/assets/BB3.png'} className="w-16" /> */}
                                        <TextInput
                                            id="keys"
                                            type="text"
                                            name="keys"
                                            value={keys.storage_value}
                                            placeholder="Add Google Keys"
                                            className=" rounded-3xl"
                                            isFocused={true}
                                            onChange={(e) => handleKeysChange(keys.id, e.target.value)}
                                        />
                                    </div>
                                    {/* <button
                                        type="button"
                                        onClick={() => removeInput(input.id)}
                                        className="bg-red-500 text-white px-3 rounded-3xl hover:bg-red-700 transition delay-30"
                                    >
                                        Trash
                                    </button> */}
                                </div>
                            ))}
                        </div>
                        
                        {/* <button
                            type="button"
                            onClick={addInput}
                            className={`w-1/2 mt-4 px-4 py-2 rounded-full ${inputs.length === 5 ? 'bg-slate-100' : 'text-black bg-gray-100/50 hover:bg-gray-500 transition delay-30'}`}
                            disabled={inputs.length === 5 ? true : false}
                        >
                            + Image
                        </button> */}
                        {inputs.some((input) => input.value.trim() !== '') && ( // Check if any input has a value
                            <button
                                type="submit"
                                className="m-2 p-2 w-1/6 rounded-full bg-blue-400"
                            >
                                Update
                            </button>
                        )}
                        
                    </form>
                ) : (
                    <form onSubmit={submitImages} className="flex flex-col w-full p-4">
                        <div  className="flex w-full p-4 overflow-auto">
                            {inputs.map((input) => (
                                <div key={input.id} className="flex w-full p-1">
                                    <div className="flex flex-col justify-center items-center" key={input.id}>
                                        <div className="flex justify-center items-center text-white w-36 h-36 bg-slate-400/50 rounded-lg p-4 m-1">
                                            + image
                                        </div>
                                        {/* <img  src={'/assets/BB3.png'} className="w-16" /> */}
                                        <TextInput
                                            id="input"
                                            type="text"
                                            name="input"
                                            value={input.value}
                                            placeholder="Add Google Keys"
                                            className=" rounded-3xl"
                                            isFocused={true}
                                            onChange={(e) => handleInputChange(input.id, e.target.value)}
                                        />
                                        <InputError message={errors.product_keys} className="mt-2" />
                                    </div>
                                    {/* <button
                                        type="button"
                                        onClick={() => removeInput(input.id)}
                                        className="h-8 bg-red-500 text-white px-3 rounded-3xl hover:bg-red-700 transition delay-30"
                                    >
                                        Trash
                                    </button> */}
                                </div>
                            ))}
                        </div>
                        {/* <button
                            type="button"
                            onClick={addInput}
                            className={` mt-4 px-4 py-2 rounded-full ${inputs.length === 5 ? 'bg-slate-100' : 'text-black bg-gray-100/50 hover:bg-gray-500 transition delay-30'}`}
                            disabled={inputs.length === 5 ? true : false}
                        >
                            + Image
                        </button> */}
                        {inputs.some((input) => input.value.trim() !== '') && ( // Check if any input has a value
                            <button
                                type="submit"
                                className="m-2 p-2 w-1/6 rounded-full bg-emerald-400"
                            >
                                Submit
                            </button>
                        )}
                    </form>
                )}
                {/* {isDirty && <div className="p-4 bg-red-500 rounded-xl text-white">There are unsaved form changes.</div>} */}
                <div className="w-full p-4">
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

                    {model !== data.model ? (
                        <>
                            <button className="p-4 m-4 rounded-xl text-white bg-blue-400" type="submit" onClick={updateModel}>Update</button>
                        </>
                    ) : (<></>)}
                    <InputError message={errors.model} className="mt-2" />
                    <hr />
                    <InputLabel htmlFor="status" value="Statuses" />
                    <RadioButtonStatus handleSelectChange={(status) => changeStatus(status)} status={items.status} />
                    <InputError message={errors.status} className="mt-2" />
                    <hr />
                    <InputLabel htmlFor="colors" value="Colors" />
                    <div className="p-4">
                        <ColorsCheckBox.EditColors 
                            handleSelectedColor={(color) => addColor(color)} 
                            handleRemoveColor={(removeProductColor) => removeColor(removeProductColor)}
                            // colors={data.color_id}
                            product_id={items.id}
                            fetchSelectedColors={getSelectedColors}
                            fetchSelectionColors={getSelectionColors}
                            filteredOptions={filteredOptions}
                            selectedColors={selectedColors}
                        />
                    </div>
                    <InputError message={errors.color_id} className="mt-2" />
                    <hr />
                    <InputLabel htmlFor="sizes" value="Sizes" />
                    <div className="p-4">
                        <SizesDropDown.DropDown 
                            handleSelectedSize={(Size) => addSize(Size)} 
                            handleRemoveSize={(removeProductSize) => removeSize(removeProductSize)}
                            // colors={data.color_id}
                            product_id={items.id}
                            fetchSelectedSizes={getSelectedSizes}
                            fetchSelectionSizes={getSelectionSize}
                            filteredOptions={sizeOptions}
                            selectedSizes={selectedSizes}
                        />
                        <InputError message={errors.size_id} className="mt-2" />
                    </div>
                    <hr />
                    <InputLabel htmlFor="heel_heights" value="Heel Heights" />
                    <div className="p-4">
                        <HeelHeights.DropDown 
                            handleSelectedHeelHeight={(heelHeight) => addHeelHeight(heelHeight)} 
                            handleRemoveHeelHeight={(removeProductHeelHeight) => removeHeelHeight(removeProductHeelHeight)}
                            // colors={data.color_id}
                            product_id={items.id}
                            fetchSelectedHeelHeights={getSelectedHeelHeights}
                            fetchSelectionHeelHeights={getSelectionHeelHeight}
                            filteredOptions={heelHeightOptions}
                            selectedHeelHeights={selectedHeelHeights}
                        />
                        <InputError message={errors.heel_height_id} className="mt-2" />

                    </div>
                    <hr />
                    <InputLabel htmlFor="categories" value="Categories" />
                    <div className="p-4">
                        <Categories.Edit handleSelectChange={(newCategory) => updateCategory(newCategory)} selectedItemId={data.category_id}/>
                        <InputError message={errors.category_id} className="mt-2" />

                    </div>
                    {/* <div className="flex items-center justify-center w-1/2">
                        <button className="p-2 text-white bg-emerald-500 rounded-2xl" type="submit" disabled={processing}>Submit</button>
                    </div> */}
                
                </div>
            </div>
        </ProductsLayout>

    )

}
