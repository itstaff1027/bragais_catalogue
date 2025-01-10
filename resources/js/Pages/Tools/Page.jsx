import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import ToolsLayout from '@/Layouts/ToolsLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import ImageUploader from '@/Components/Image'; 

import { top, body, bottom, footer, womensXScrollable, mensXScrollable, urlPath } from '@/Constant/Constant'

export default function ToolsPage({ items, page_images }){

  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    imageTop: [],
    imageBody: [],
    imageBottom: [],
    imageFooter: [],
    imageWomensXScrollable: [],
    imageMensXScrollable: [],
    gender: "womens",
    folder: 'local_images'
  });

  const [page, setPage] = useState('womens');

  const [previewsHeader, setPreviewsHeader] = useState([]); // State to store preview UR  L
  const [previewsBody, setPreviewsBody] = useState([]); // State to store preview URL
  const [previewsBottom, setPreviewsBottom] = useState([]); // State to store preview URL
  const [previewsFooter, setPreviewsFooter] = useState([]); // State to store preview URL
  const [previewsWomensXScrollable, setPreviewsWomensXScrollable] = useState([]); // State to store preview URL
  const [previewsMensXScrollable, setPreviewsMensXScrollable] = useState([]); // State to store preview URL
  const [images, setImages] = useState([]);

  const handleFileChange = (event, setPreviews, variable) => {
    // setData
    const files = Array.from(event.target.files); // Convert FileList to an array
    const validFiles = files.filter((file) => file.type.startsWith("image/")); // Filter for images

    // Map files to objects containing both the file and its preview URL
    const newImages = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file), // Generate preview URL
    }));

    setPreviews((prevImages) => [...prevImages, ...newImages]);

    // Update data for submission
    setData(variable, validFiles);
  };

  const handleRemoveImage = (index, setPreviews, previews, variable) => {
    setPreviews(() => {
        // Clean up the preview URL to prevent memory leaks
        URL.revokeObjectURL(previews[index].preview);

        // Create the updated previews array
        const updatedImages = previews.filter((_, i) => i !== index);

        // Update the data for submission by removing the corresponding file
        setData(variable, updatedImages.map((item) => item.file));

        return updatedImages;
    });
  };

  const handleUpload = (section_id, variable) => {
    router.post(route('upload.image_section'), { ...data, section_id: section_id[0].id, page_section: variable }, {
      onSuccess: (page) => {
          // console.log(page.props.url);
          const url = page.props.url; 
          // console.log(url);
          // reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
      },
      onError: (error) => {
          console.error('An error occurred:', error); // Handle error
      },
      onFinish: () => {
        reset();
        setPreviewsHeader([]);
        setPreviewsBody([]);
        setPreviewsBottom([]);
        setPreviewsFooter([]);
        setPreviewsMensXScrollable([]);
        setPreviewsWomensXScrollable([]);
      },
      preserveScroll: true,
    });
  };

  const handleUpdateImage = (section_items, id, path, variable) => {
    router.post(route('upload.updated_image_section'), { ...data, section_id: section_items[0].id, section_image_id: id, image_path: path, page_section: variable}, {
      onSuccess: (page) => {
          // console.log(page.props.url);
          const url = page.props.url; 
          // console.log(url);
          // reset('model', 'status', 'product_color_id', 'size_id', 'heel_height_id', 'category_id');
      },
      onError: (error) => {
          console.error('An error occurred:', error); // Handle error
      },
      onFinish: () => {
        reset();
        setPreviewsHeader([]);
        setPreviewsBody([]);
        setPreviewsBottom([]);
        setPreviewsFooter([]);
        setPreviewsMensXScrollable([]);
        setPreviewsWomensXScrollable([]);
      },
      preserveScroll: true,
    });
  };

  const removeImage = (data) => {
    router.post(route('destroy.image_section'), data, {
        onSuccess: () => {
            reset();
        },
        onError: (error) => {
            console.error('An error occurred:', error); // Handle error
        },
        onFinish: () => {
          reset();
          setPreviewsHeader([]);
          setPreviewsBody([]);
          setPreviewsBottom([]);
          setPreviewsFooter([]);
          setPreviewsMensXScrollable([]);
          setPreviewsWomensXScrollable([]);
        },
        preserveScroll: true,
    })
};

  // useEffect(() => {
    
  //   const test = page_images
  //   .filter(ewan => 
  //     ewan.section.section_name === top
  //   );

  //   console.log(test)
  // }, []);

  return (

    <ToolsLayout>
      <h1>Choose Page To Update Image Contents for Front pages</h1>
      <select onChange={(e) => {
          setPage(e.target.value); 
          setData('gender', e.target.value)
        }}>
        <option disabled>Select Category</option>
        <option value="womens">Womens</option>
        <option value="mens">Mens</option>
      </select>
      {page && <div className="flex flex-col w-full p-2">
          <div className="w-full">
            <h1>Top {page} Image</h1>
            <div className="w-full border"></div>
            { 
              page_images?.some(prop => prop.section?.section_name === top && prop.gender === page) ?
              page_images
                ?.filter(prop => prop.section?.section_name === top && prop.gender === page) // Filter items
                .map((prop, i) => ( // Map over filtered items
                  <div key={i}>
                    <img src={`${urlPath}${prop.image_url}`} className='flex w-auto h-32' />
                    <ImageUploader 
                      previewStyle={"h-72 w-72"}
                      handleFileChange={(e) => handleFileChange(e, setPreviewsHeader, 'imageTop')} 
                      handleRemoveImage={(index) => handleRemoveImage(index, setPreviewsHeader, previewsHeader, 'imageTop')} 
                      handleUpload={() => handleUpdateImage(items.filter(section => section.section_name === top), prop.id, prop.image_url, 'imageTop')}  
                      previews={previewsHeader}
                      inputName={"previewsHeader"}
                    />
                  </div>
                )) : <ImageUploader 
                previewStyle={"h-72 w-72"}
                handleFileChange={(e) => handleFileChange(e, setPreviewsHeader, 'imageTop')} 
                handleRemoveImage={(index) => handleRemoveImage(index, setPreviewsHeader, previewsHeader, 'imageTop')} 
                handleUpload={() => handleUpload(items.filter(section => section.section_name === top), 'imageTop')}  
                previews={previewsHeader}
                inputName={"previewsHeader"}
              />
            }
            
          </div>

          <div className="w-full">
            <h1>Body {page} Image</h1>
            <div className="w-full border"></div>
            { 
              page_images?.some(prop => prop.section?.section_name === body && prop.gender === page ) ?
              page_images
                ?.filter(prop => prop.section?.section_name === body && prop.gender === page) // Filter items
                .map((prop, i) => ( // Map over filtered items
                  <div key={i}>
                    <img src={`${urlPath}${prop.image_url}`} className='flex w-auto h-32' />
                    <ImageUploader 
                      previewStyle={"h-72 w-72"}
                      handleFileChange={(e) => handleFileChange(e, setPreviewsBody, 'imageBody')} 
                      handleRemoveImage={(index) => handleRemoveImage(index, setPreviewsBody, previews, 'imageBody')} 
                      handleUpload={() => handleUpdateImage(items.filter(section => section.section_name === body), prop.id, prop.image_url, 'imageBody')}  
                      previews={previewsBody}
                      inputName={"previewsBody"}
                    />
                  </div>
                )) : <ImageUploader 
                previewStyle={"h-72 w-72"}
                handleFileChange={(e) => handleFileChange(e, setPreviewsBody, 'imageBody')} 
                handleRemoveImage={(index) => handleRemoveImage(index, setPreviewsBody, previewsBody, 'imageBody')} 
                handleUpload={() => handleUpload(items.filter(section => section.section_name === body), 'imageBody')}  
                previews={previewsBody}
                inputName={"previewsBody"}
              />
            }
            
          </div>

          <div className="w-full">
            <h1>Bottom {page} Image</h1>
            <div className="w-full border"></div>
            { 
              page_images?.some(prop => prop.section?.section_name === bottom && prop.gender === page ) ?
              page_images
                ?.filter(prop => prop.section?.section_name === bottom && prop.gender === page) // Filter items
                .map((prop, i) => ( // Map over filtered items
                  <div key={i}>
                    <img src={`${urlPath}${prop.image_url}`} className='flex w-auto h-32' />
                    <ImageUploader 
                      previewStyle={"h-72 w-72"}
                      handleFileChange={(e) => handleFileChange(e, setPreviewsBottom, 'imageBottom')} 
                      handleRemoveImage={(index) => handleRemoveImage(index, setPreviewsBottom, previews, 'imageBottom')} 
                      handleUpload={() => handleUpdateImage(items.filter(section => section.section_name === bottom), prop.id, prop.image_url, 'imageBottom')}  
                      previews={previewsBottom}
                      inputName={"previewsBottom"}
                    />
                  </div>
                )) : <ImageUploader 
                previewStyle={"h-72 w-72"}
                handleFileChange={(e) => handleFileChange(e, setPreviewsBottom, 'imageBottom')} 
                handleRemoveImage={(index) => handleRemoveImage(index, setPreviewsBottom, previewsBottom, 'imageBottom')} 
                handleUpload={() => handleUpload(items.filter(section => section.section_name === bottom), 'imageBottom')}  
                previews={previewsBottom}
                inputName={"previewsBottom"}
              />
            }
            
          </div>

          {/* <div className="w-full">
            <h1>Footer {page} Image</h1>
            <div className="w-full border"></div>
            <ImageUploader 
              previewStyle={"h-72 w-72"}
              handleFileChange={(e) => handleFileChange(e, setPreviewsFooter)} 
              handleRemoveImage={(index) => handleRemoveImage(index, setPreviewsFooter, previewsFooter)} 
              handleUpload={handleUpload}  
              previews={previewsFooter}
              inputName={"previewsFooter"}
            />
            
          </div> */}

          { page === 'womens' && <div className="w-full">
              <h1>Womens X Scrollable Image</h1>
              <div className="w-full border"></div>
                <ImageUploader 
                  previewStyle={"h-72 w-72"}
                  handleFileChange={(e) => handleFileChange(e, setPreviewsWomensXScrollable, 'imageWomensXScrollable')} 
                  handleRemoveImage={(index) => handleRemoveImage(index, setPreviewsWomensXScrollable, previewsWomensXScrollable, 'imageWomensXScrollable')} 
                  handleUpload={() => handleUpload(items.filter(section => section.section_name === womensXScrollable), 'imageWomensXScrollable')}  
                  previews={previewsWomensXScrollable}
                  inputName={"previewsWomensXScrollable"}
                />
                {/* <InputError message={errors.image} className="mt-2" /> */}
                <div className="flex overflow-x-auto p-4 gap-4">
                  {page_images?.some(prop => prop.section?.section_name === womensXScrollable  && prop.gender === page) ? (
                    page_images
                      ?.filter(prop => prop.section?.section_name === womensXScrollable  && prop.gender === page)
                      .map((prop) => (
                        <div
                          className="min-w-[200px] flex justify-center items-center relative"
                          key={prop.id}
                        >
                          <img
                            src={`${urlPath}${prop.image_url}`}
                            alt="Product Image"
                            className="h-44"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage({ id: prop.id, path: prop.image_url })}
                            className="absolute top-0 right-0 bg-red-500 text-white px-3 rounded-3xl hover:bg-red-700 transition delay-30"
                          >
                            Trash
                          </button>
                        </div>
                      ))
                  ) : (
                    <div>No Images can Display, Upload an Image to Display.</div>
                  )}
                </div>

            </div>
          }
          { page === 'mens' && <div className="w-full">
              <h1>Mens X Scrollable Image</h1>
              <div className="w-full border"></div>
                <ImageUploader 
                  previewStyle={"h-72 w-72"}
                  handleFileChange={(e) => handleFileChange(e, setPreviewsMensXScrollable, 'imageMensXScrollable')} 
                  handleRemoveImage={(index) => handleRemoveImage(index, setPreviewsMensXScrollable, previewsMensXScrollable, 'imageMensXScrollable')} 
                  handleUpload={() => handleUpload(items.filter(section => section.section_name === mensXScrollable), 'imageMensXScrollable')}  
                  previews={previewsMensXScrollable}
                  inputName={"previewsMensXScrollable"}
                />
                <div className="flex overflow-x-auto p-4 gap-4">
                    {page_images?.some(prop => prop.section?.section_name === mensXScrollable  && prop.gender === page) ? (
                      page_images
                        ?.filter(prop => prop.section?.section_name === mensXScrollable  && prop.gender === page)
                        .map((prop) => (
                          <div
                            className="min-w-[200px] flex justify-center items-center relative"
                            key={prop.id}
                          >
                            <img
                              src={`${urlPath}${prop.image_url}`}
                              alt="Product Image"
                              className="h-44"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage({ id: prop.id, path: prop.image_url })}
                              className="absolute top-0 right-0 bg-red-500 text-white px-3 rounded-3xl hover:bg-red-700 transition delay-30"
                            >
                              Trash
                            </button>
                          </div>
                        ))
                    ) : (
                      <div>No Images can Display, Upload an Image to Display.</div>
                    )}
                </div>
            </div>
          }
        </div>
      }
      
    </ToolsLayout>
  )

}
