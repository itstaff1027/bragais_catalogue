
import { createContext, useContext, useState, useEffect } from 'react';

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

SizesDropdown.OrderType = OrderType;
SizesDropdown.Sizes = Sizes;

export default SizesDropdown;
