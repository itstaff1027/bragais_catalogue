
import { useState, useEffect } from 'react';


export default function HeelHeightsDropDown({ className = '', handleCheckBox, heelHeight=[], ...props }) {

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
