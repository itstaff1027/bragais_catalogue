
import { createContext, useContext, useState, useEffect } from 'react';

const ColorsCheckBoxContext = createContext();

const ColorsCheckBox = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <ColorsCheckBoxContext.Provider>
            <div className="relative">{children}</div>
        </ColorsCheckBoxContext.Provider>
    );
};


const Colors = ({ className = '', handleCheckBox, colors=[], ...props }) => {
    const [items, setItems] = useState([]);

    // Handle checkbox changes
    const handleColorChange = (colorsId) => {
        const updatedColors = colors.includes(colorsId)
            ? colors.filter((id) => id !== colorsId) // Remove if already selected
            : [...colors, colorsId]; // Add if not selected
        handleCheckBox(updatedColors);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(route('product.colors'), {
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching colors:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div {...props} className={`w-1/2 rounded-lg border-slate-600 ${className}`}>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-indigo-600"
                            checked={colors.includes(item.id)}
                            onChange={() => handleColorChange(item.id)}
                        />
                        <label className="ml-4 text-gray-700">{item.color}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const OrderTypes = ({ className = '', handleSelectChange, handleCheckBox, selectedItemId, selectedOrderTypesId, ...props }) => {
    const [items, setItems] = useState([]);
    const [orderTypes, setOrderTypes] = useState([]);

    // const [selectedOrderTypesId, setSelectedOrderTypesId] = useState("");

    // const handleSelectChange = (event) => {
    //     setSelectedOrderTypesId(event.target.value); // Retrieve the id of the selected option
    // };

    const fetchData = async () => {
        try {
            const response = await fetch(route('product.colors'), {
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
                            checked={selectedItemId.includes(item.id)}
                            onChange={() => handleCheckBox(item.id)}
                            key={item.id}
                        />
                        <label className="ml-4 text-gray-700" key={i}>{item.color}</label>
                        <select
                            className="w-1/4 m-2 p-0 rounded-lg"
                            onChange={(e) => handleSelectChange(e.target.value, item.id)}  // Pass item.id to handle the change for this specific color
                            value={selectedItemId.find(item => item.colors_id === item.id)?.order_type_id || ""}
                        >
                            {orderTypes?.map((types, index) => (
                                <option key={types.id} value={types.id}>{types.name}</option>
                            ))}
                        </select>
                    </li>

                ))}
            </ul>
            
        </div>
    );
}

ColorsCheckBox.Colors = Colors;
ColorsCheckBox.OrderTypes = OrderTypes;

export default ColorsCheckBox;
