
import { createContext, useContext, useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';

const HeelHeightContext = createContext();

const HeelHeight = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <HeelHeightContext.Provider>
            <div className="relative">{children}</div>
        </HeelHeightContext.Provider>
    );
};

const CheckBox = ({ className = '', handleCheckBox, heelHeight=[], ...props }) => {

    const [items, setItems] = useState([]);

    // const [selectedHeelHeight, setSelectedHeelHeight] = useState(heelHeight);

    // Handle checkbox changes
    const handleHeelHeightChange = (heelHeightId) => {
        const updatedHeelHeight = heelHeight.includes(heelHeightId)
            ? heelHeight.filter((id) => id !== heelHeightId) // Remove if already selected
            : [...heelHeight, heelHeightId]; // Add if not selected

        handleCheckBox(updatedHeelHeight); // Update the parent state
    };

    const fetchData = async () => {
        try {
            const response = await fetch(route('product.heel_heights'), {
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
                            checked={heelHeight.includes(item.id)}
                            onChange={() => handleHeelHeightChange(item.id)}
                            key={item.id}
                        />
                        <label className="ml-4 text-gray-700" key={i}>{item.heel_heights}</label>
                    </li>

                ))}
            </ul>
            
        </div>
    );
}

const DropDown = ({ className = "", handleSelectedHeelHeight, handleRemoveHeelHeight, fetchSelectedHeelHeights, fetchSelectionHeelHeights, filteredOptions, selectedHeelHeights, HeelHeights = [], product_id=0, ...props }) => {

    return (
        <div className={`w-72 relative ${className}`}>
            <div className="flex flex-wrap gap-2 mb-2">
                {selectedHeelHeights.map((item, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center">
                        {item.heel_heights}
                        <button
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveHeelHeight(item)} // Pass the whole item for removal
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
                                Select HeelHeight
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                        {filteredOptions
                            .filter((option) => !selectedHeelHeights.some((selected) => selected.heel_height_id === option.id)) // Exclude selected options
                            .map((option, index) => (
                                <div
                                    key={index}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelectedHeelHeight({ HeelHeight_id: option.id, product_id })}
                                >
                                    {option.heel_heights}
                                </div>
                            ))}
                        </Dropdown.Content>
                    </Dropdown>
                )}
            </div>
            
        </div>
    );
};

HeelHeight.CheckBox = CheckBox;
HeelHeight.DropDown = DropDown;

export default HeelHeight;
