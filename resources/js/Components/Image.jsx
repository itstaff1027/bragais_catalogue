import { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

import { Head, useForm, router, usePage } from '@inertiajs/react';

export default function Image({ className = "", handleFileChange, handleUpload, handleRemoveImage, product_id = 0, previews=[], previewStyle ="", inputName="", ...props }){
    // const [preview, setPreview] = useState(previews);
    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
            {/* Profile Image */}
            <div className="relative">
                {previews.map((src, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={src.preview}
                            alt={`Preview ${index}`}
                            className={`"${previewStyle} object-cover border-2 border-gray-300 rounded-lg shadow-md"`}
                        />
                        {/* Remove Button */}
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                {/* Edit Icon */}
                <InputLabel
                    htmlFor={inputName}
                    className="flex items-center justify-center relative bottom-0 right-0 p-2 bg-white rounded-full border border-gray-200 shadow hover:bg-gray-100 cursor-pointer"
                >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg> */}
                                +
                </InputLabel>
            </div>

            {/* File Input */}
            <input
                id={inputName}
                type="file"
                accept="image/*" // Restrict file selection to images
                className="hidden"
                onChange={handleFileChange} // Update preview on file selection
                multiple
            />

            {/* Feedback Message */}
            <p className="text-sm text-gray-500">Upload Image.</p>

            {/* Submit Button */}
            <button
                className="px-6 py-2 text-white bg-violet-600 rounded-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1"
                onClick={handleUpload}
            >
                Upload
            </button>
        </div>
    )
}