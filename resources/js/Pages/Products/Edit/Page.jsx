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
import ImageUploader from '@/Components/Image'; 

export default function EditProductPage({ items }){
    const { data, setData, post, processing, errors, reset, isDirty } = useForm({
        id: items.id,
        model: items.model,
        status: items.status,
        size_id: items.size_id,
        category_id: items.category_id,
        image: [],
        folder: 'local_images'
    });

    const { props } = usePage();

    const [model, setModel] = useState(items.model);

    const [previews, setPreviews] = useState([]); // State to store preview URL
    const [images, setImages] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [selectedColors, setSeslectedColors] = useState([]);
    const [heelHeightOptions, setHeelHeightOptions] = useState([]);
    const [selectedHeelHeights, setSelectedHeelHeights] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [orderTypesOptions, setOrderTypesOptions] = useState([]);
    const [selectedOrderTypes, setSelectedOrderTypes] = useState('');
    const [isHidden, setIsHidden] = useState(true);

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
        // console.log(size);
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

    const updateColorOrderType = (order_type_id) => {
        if (confirm('Are you sure you want to change the Order Type of this Product-Color?')) {
            // Proceed with the POST request if the user confirms
            router.post(route('update_product_color.order_type'), { order_type_id: order_type_id, item: selectedOrderTypes }, {
                onSuccess: (page) => {
                    setIsHidden(true);
                    getSelectedColors();
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

    const colorOrderTypeModal = (item) => {
        setSelectedOrderTypes(item);
        getSelectedColors();
        getOrderTypesOptions();
        setIsHidden(false);
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
    const removeImage = (data) => {
        router.post(route('product_image.destroy'), data, {
            onSuccess: () => {
                reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
            },
            onError: (error) => {
                console.error('An error occurred:', error); // Handle error
            },
            onFinish: () => {
                fetchImages();
            },
            preserveScroll: true,
        })
    };

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
            // if(data){
            //     setInputs([...data]);
            // }
        } catch (error) {
            console.log('Something went Wrong', error)
        }
    }

    const getOrderTypesOptions = async () => {
        try {
            const response = await fetch(route("product.order_types"), {
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            console.log(data);
            setOrderTypesOptions(data); // Set the available color options
        } catch (error) {
            console.error("Error fetching colors:", error);
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

    
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Convert FileList to an array
        const validFiles = files.filter((file) => file.type.startsWith("image/")); // Filter for images

        // Map files to objects containing both the file and its preview URL
        const newImages = validFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file), // Generate preview URL
        }));

        setPreviews((prevImages) => [...prevImages, ...newImages]);

        // Update data for submission
        setData('image', validFiles);
    };

    const handleRemoveImage = (index) => {
        setPreviews((prevImages) => {
            // Clean up the preview URL to prevent memory leaks
            URL.revokeObjectURL(prevImages[index].preview);
    
            // Create the updated previews array
            const updatedImages = prevImages.filter((_, i) => i !== index);
    
            // Update the data for submission by removing the corresponding file
            setData('image', updatedImages.map((item) => item.file));
    
            return updatedImages;
        });
    };

    const handleUpload = () => {
        router.post(route('upload.image'), data, {
            onSuccess: (page) => {
                // console.log(page.props.url);
                const url = page.props.url; 
                // console.log(url);
                // reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
            },
            onError: (error) => {
                console.error('An error occurred:', error); // Handle error
            },
            onFinish: () => {
                reset();
                setPreviews([]);
                fetchImages();
            },
            
            preserveScroll: true,
        });
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
            <ImageUploader 
                previewStyle={"h-72 w-72"}
                handleFileChange={handleFileChange} 
                handleUpload={handleUpload} 
                handleRemoveImage={handleRemoveImage} 
                previews={previews} 
                product_id={items.id} 
                inputName={"image"}
            />
            <InputError message={errors.image} className="mt-2" />
                {images.length > 0 ? (
                    <div className="flex flex-col w-full p-4">
                        <div  className="flex w-full p-4 overflow-auto">
                            {images.map((keys) => (
                                <div key={keys.id} className="flex w-full p-1">
                                    <div
                                        className="flex flex-col justify-center items-center relative"
                                        key={keys.id}
                                    >
                                        <img
                                            src={`${keys.storage_url}`}
                                            alt="Product Image"
                                        />
                                        <button
                                            type="button"
                                            key={keys.id}
                                            onClick={() => removeImage({ id: keys.id, path: keys.storage_values})}
                                            className="absolute top-0 right-0 bg-red-500 text-white px-3 rounded-3xl hover:bg-red-700 transition delay-30"
                                        >
                                            Trash
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                ) : (<div> No Images can Display, Upload an Image to Display.</div>)}
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

                    {model !== data.model && (
                        <>
                            <button className="p-4 m-4 rounded-xl text-white bg-blue-400" type="submit" onClick={updateModel}>Update</button>
                        </>
                    )}
                    <InputError message={errors.model} className="mt-2" />
                    <hr />
                    <InputLabel htmlFor="status" value="Statuses" />
                    <RadioButtonStatus handleSelectChange={(status) => changeStatus(status)} status={items.status} />
                    <InputError message={errors.status} className="mt-2" />
                    <hr />
                    <InputLabel htmlFor="colors" value="Colors" />
                    <div className="w-full relative">
                        <ColorsCheckBox.OrderTypes
                            className={` p-4 ${isHidden ? 'hidden' : 'flex flex-col'}`}
                            filteredOptions={orderTypesOptions}
                            selectedOrderTypes={selectedOrderTypes}
                            handleSelectedOrderTypes={(orderType) => updateColorOrderType(orderType)}
                        />
                    </div>
                    <div className="p-4">
                        <ColorsCheckBox.EditColors 
                            handleSelectedColor={(color) => addColor(color)} 
                            handleRemoveColor={(removeProductColor) => removeColor(removeProductColor)}
                            handleUpdateOrderTypes={(colorOrderType) => colorOrderTypeModal(colorOrderType)}
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
