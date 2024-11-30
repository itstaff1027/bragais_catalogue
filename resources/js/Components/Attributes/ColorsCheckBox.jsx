
import { useState, useEffect } from 'react';


export default function ColorsCheckBox({ className = '', handleCheckBox, selectedItemId, ...props }) {

    const [items, setItems] = useState([]);

    // const [selectedItemId, setSelectedItemId] = useState("");

    // const handleSelectChange = (event) => {
    //     setSelectedItemId(event.target.value); // Retrieve the id of the selected option
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
                            checked={selectedItemId.includes(item.id)}
                            onChange={() => handleCheckBox(item.id)}
                            key={item.id}
                        />
                        <label className="ml-4 text-gray-700" key={i}>{item.color}</label>
                    </li>

                ))}
            </ul>
            
        </div>
    );
}
