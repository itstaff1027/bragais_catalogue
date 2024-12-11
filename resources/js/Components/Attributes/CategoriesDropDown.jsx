
import { createContext, useContext, useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';

const CategoriesContext = createContext();

const Categories = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <CategoriesContext.Provider>
            <div className="relative">{children}</div>
        </CategoriesContext.Provider>
    );
};

const DropDown = ({ className = '', handleSelectChange, selectedItemId, ...props }) => {

    const [items, setItems] = useState([]);

    // const [selectedItemId, setSelectedItemId] = useState("");

    // const handleSelectChange = (event) => {
    //     setSelectedItemId(event.target.value); // Retrieve the id of the selected option
    // };

    const fetchData = async () => {
        try {
            const response = await fetch(route('product.categories'), {
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
                    {item.categories}
                </option>
            ))}
        </select>
    );
}

const EditDropDown = ({ className = '', handleSelectChange, selectedItemId, categories=[], ...props }) => {

    const [items, setItems] = useState([]);

    // const [selectedItemId, setSelectedItemId] = useState("");

    // const handleSelectChange = (event) => {
    //     setSelectedItemId(event.target.value); // Retrieve the id of the selected option
    // };

    const fetchData = async () => {
        try {
            const response = await fetch(route('product.categories'), {
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
            onChange={(e) => handleSelectChange(e.target.value)}
            value={selectedItemId}
        >
            <option disabled>Select Here...</option>
            {items?.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.categories}
                </option>
            ))}
        </select>
    );
}

Categories.DropDown = DropDown;
Categories.Edit = EditDropDown;

export default Categories;


