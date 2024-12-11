
import { createContext, useContext, useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
const SizesDropDownContext = createContext();

const SizesDropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <SizesDropDownContext.Provider>
            <div className="relative">{children}</div>
        </SizesDropDownContext.Provider>
    );
};


const Sizes = ({ className = '', handleSelectChange, selectedItemId, ...props }) => {
    const [items, setItems] = useState([]);

    // const [selectedItemId, setSelectedItemId] = useState("");

    // const handleSelectChange = (event) => {
    //     setSelectedItemId(event.target.value); // Retrieve the id of the selected option
    // };

    const fetchData = async () => {
        try {
            const response = await fetch(route('product.sizes'), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            const data = await response.json()
            setItems(data);
        } catch (error) {
            console.log('Something went Wrong', error)
        }
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <select 
            {...props}
            className={"w-1/2 rounded-lg border-slate-600 hover:bg-indigo-300" + className}
            onChange={handleSelectChange}
            value={selectedItemId}
        >
            <option disabled>Select Here...</option>
            {items?.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.sizes}
                </option>
            ))}
        </select>
    );
}

const DropDown = ({ className = "", handleSelectedSize, handleRemoveSize, fetchSelectedSizes, fetchSelectionSizes, filteredOptions, selectedSizes, Sizes = [], product_id=0, ...props }) => {

    return (
        <div className={`w-72 relative ${className}`}>
            <div className="flex flex-wrap gap-2 mb-2">
                {selectedSizes.map((item, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center">
                        {item.sizes}
                        <button
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveSize(item)} // Pass the whole item for removal
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
            <div className="p-4 h-36 overflow-y-auto">
                {filteredOptions.length > 0 && (
                    <Dropdown className="absolute mt-1 w-full max-h-40 overflow-y-auto bg-white border rounded-md shadow-lg z-10">
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                            >
                                Select Size
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                        {filteredOptions
                            .filter((option) => !selectedSizes.some((selected) => selected.size_value_id === option.id)) // Exclude selected options
                            .map((option, index) => (
                                <div
                                    key={index}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelectedSize({ size_id: option.id, product_id })}
                                >
                                    {option.sizes}
                                </div>
                            ))}
                        </Dropdown.Content>
                    </Dropdown>
                )}
            </div>
            
        </div>
    );
};

const CheckBox = ({ className = '', handleSizeCheckBox, sizeSelectedId=[], ...props }) => {

    const [items, setItems] = useState([]);

    // const [selectedSizes, setSelectedSizes] = useState(Sizes);

    // Handle checkbox changes
    const handleSizesChange = (sizesId) => {
        const updatedSizes = sizeSelectedId.includes(sizesId)
            ? sizeSelectedId.filter((id) => id !== sizesId) // Remove if already selected
            : [...sizeSelectedId, sizesId]; // Add if not selected

        handleSizeCheckBox(updatedSizes); // Update the parent state
    };

    const fetchData = async () => {
        try {
            const response = await fetch(route('product.sizes'), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            const data = await response.json()
            setItems(data);
        } catch (error) {
            console.log('Something went Wrong', error)
        }
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div 
            {...props}
            className={"w-1/2 rounded-lg border-slate-600" + className}
        >
            <ul>
                {items?.map((item, i) => (
                    <li key={i}>
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-indigo-600"
                            checked={sizeSelectedId.includes(item.id)}
                            onChange={() => handleSizesChange(item.id)}
                            key={item.id}
                        />
                        <label className="ml-4 text-gray-700" key={i}>{item.sizes}</label>
                    </li>

                ))}
            </ul>
            
        </div>
    );
}


const OrderType = ({ className = '', handleSelectChange, selectedItemId, ...props }) => {
    const [items, setItems] = useState([]);
    const [orderTypes, setOrderTypes] = useState([]);

    // const [selectedItemId, setSelectedItemId] = useState("");

    // const handleSelectChange = (event) => {
    //     setSelectedItemId(event.target.value); // Retrieve the id of the selected option
    // };

    const fetchData = async () => {
        try {
            const response = await fetch(route('product.sizes'), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            const data = await response.json()
            setItems(data);
        } catch (error) {
            console.log('Something went Wrong', error)
        }
    }

    const fetchDataOrderTypes = async () => {
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
        fetchDataOrderTypes();
    }, []);

    return (
        <select 
            {...props}
            className={"w-1/2 rounded-lg border-slate-600 hover:bg-indigo-300" + className}
            onChange={handleSelectChange}
            value={selectedItemId}
        >
            <option disabled>Select Here...</option>
            {items?.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.sizes}
                    test
                </option>
            ))}
        </select>
    );
}

SizesDropdown.DropDown = DropDown;
SizesDropdown.CheckBox = CheckBox;
SizesDropdown.OrderType = OrderType;
SizesDropdown.Sizes = Sizes;

export default SizesDropdown;
