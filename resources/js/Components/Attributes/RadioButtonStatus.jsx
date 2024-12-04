
import { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function RadioButtonStatus({ className = '', handleSelectChange, status = '', ...props }) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        handleSelectChange(selectedValue);
        status = selectedValue;
    };

    return (
        <div className="flex flex-row">
            <div className="justify-center items-center p-2">
                <InputLabel htmlFor="active" value="Active" />
                <TextInput
                    id="active"
                    type="radio"
                    name="status" // Same name for both buttons
                    value="active"
                    checked={status === 'active'}
                    className="mt-1 block"
                    isFocused={true}
                    onChange={handleChange}
                />
            </div>
            <div className="justify-center items-center p-2">
                <InputLabel htmlFor="inactive" value="Inactive" />
                <TextInput
                    id="inactive"
                    type="radio"
                    name="status" // Same name for both buttons
                    value="inactive"
                    checked={status === 'inactive'}
                    className="mt-1 block"
                    isFocused={true}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
