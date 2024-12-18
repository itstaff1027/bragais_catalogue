import { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

import { Head, useForm, router, usePage } from '@inertiajs/react';

export default function Image({ className = "", handleFileChange, handleUpload, product_id = 0, preview, ...props }){
    // const [preview, setPreview] = useState(null); // State to store preview URL

    // const { data, setData, post, progress } = useForm({
    //     id: product_id,
    //     image: null,
    //     folder: 'local_images'
    //   })

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setData('image', event.target.files[0]);
    //     if (file) {
    //         // Check if the file is an image
    //         if (file.type.startsWith("image/")) {
    //             setPreview(URL.createObjectURL(file)); // Generate preview URL
    //         } else {
    //             alert("Please select a valid image file.");
    //         }
    //     }
    // };

    // const handleUpload = () => {
    //     router.post(route('upload.image'), data, {
    //         onSuccess: (page) => {
    //             // console.log(page.props.url);
    //             const url = page.props.url; 
    //             // console.log(url);
    //             // reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
    //         },
    //         onError: (error) => {
    //             console.error('An error occurred:', error); // Handle error
    //         },
            
    //         preserveScroll: true,
    //     });
    // };

    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
            {/* Profile Image */}
            <div className="relative">
                <img
                    className="h-36 w-36 object-cover border-2 border-violet-500 shadow-md"
                    src={preview || ""}
                    alt="Image"
                />
                {/* Edit Icon */}
                <InputLabel
                    htmlFor="fileInput"
                    className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-gray-200 shadow hover:bg-gray-100 cursor-pointer"
                >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg> */}
                                +
                </InputLabel>
            </div>

            {/* File Input */}
            <input
                id="fileInput"
                type="file"
                accept="image/*" // Restrict file selection to images
                className="hidden"
                onChange={handleFileChange} // Update preview on file selection
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