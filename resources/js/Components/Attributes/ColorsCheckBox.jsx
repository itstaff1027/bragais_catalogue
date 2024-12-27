
import { createContext, useContext, useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';

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


const Colors = ({ className = "", handleSelectedColor, colors = [], ...props }) => {
    const [filteredOptions, setFilteredOptions] = useState([]); // Stores filtered color options
    
    // Handle selecting a color
    const handleSelect = (option) => {
      handleSelectedColor(option); // Add the color
    };
  
    // Handle removing a selected color
    const handleRemove = (e, item) => {
      e.preventDefault();
      handleSelectedColor(item, true); // Pass 'true' to indicate removal
    };
  
    // Fetch colors from the API
    const fetchData = async () => {
      try {
        const response = await fetch(route("product.colors"), {
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setFilteredOptions(data); // Set the available color options
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <div className={`w-72 relative ${className}`}>
        <div className="flex flex-wrap gap-2 mb-2">
          {colors.map((item, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center">
              {item.color}
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={(e) => handleRemove(e, item)} // Pass the whole item for removal
              >
                ×
              </button>
            </span>
          ))}
        </div>
  
        {filteredOptions.length > 0 && (
          <Dropdown className="absolute mt-1 w-full max-h-40 overflow-y-auto bg-white border rounded-md shadow-lg z-10">
            <Dropdown.Trigger>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
              >
                Select Color
              </button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(option)} // Pass selected color to handleSelect
                >
                  {option.color}
                </div>
              ))}
            </Dropdown.Content>
          </Dropdown>
        )}
      </div>
    );
  };
  
const EditColors = ({ className = "", handleSelectedColor, handleRemoveColor, fetchSelectedColors, fetchSelectionColors, filteredOptions, selectedColors, colors = [], product_id=0, handleUpdateOrderTypes, ...props }) => {

    return (
        <div className={`w-72 relative ${className}`}>
            <div className="flex flex-wrap gap-2 mb-2">
                {selectedColors.map((item, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center">
                        
                        <button onClick={() => handleUpdateOrderTypes(item)}>
                          {item.color}
                        </button>
                        
                        
                        <button
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveColor(item)} // Pass the whole item for removal
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
                              Select Color
                          </button>
                      </Dropdown.Trigger>
                      <Dropdown.Content>
                      {filteredOptions
                          .filter((option) => !selectedColors.some((selected) => selected.color_id === option.id)) // Exclude selected options
                          .map((option, index) => (
                              <div
                                  key={index}
                                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleSelectedColor({ color_id: option.id, product_id })}
                              >
                                  {option.color}
                              </div>
                          ))}
                      </Dropdown.Content>
                  </Dropdown>
              )}
            </div>
            
        </div>
    );
};

const OrderTypes = ({ className = '', handleSelectedOrderTypes, colorName='', colorValueIds=0, selectedOrderTypes, filteredOptions, isHidden=Boolean, ...props }) => {

  return (
      <div 
          {...props}
          className={`items-center justify-center w-full` + className}
      >
        <h1>Choose Color - Order Type</h1>
        <div className="flex flex-wrap gap-2 mb-2">
                {selectedOrderTypes.name === null ? <h1>None</h1> : (
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center">

                          {selectedOrderTypes.name}
                        {/* <button
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveColor(item)} // Pass the whole item for removal
                        >
                            ×
                        </button> */}
                    </span>
                )}
            </div>
        {filteredOptions?.length > 0 && (
          <Dropdown className="absolute mt-1 w-full max-h-40 overflow-y-auto bg-white border rounded-md shadow-lg z-10">
              <Dropdown.Trigger>
                  <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                  >
                      Select Order Type
                  </button>
              </Dropdown.Trigger>
              <Dropdown.Content>
              {filteredOptions// Exclude selected options
                  .map((option, index) => (
                      <div
                          key={index}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectedOrderTypes(option.id)}
                      >
                          {option.name}
                      </div>
                  ))}
              </Dropdown.Content>
          </Dropdown>
        )}

      </div>
  );
}


const AdvancedDropdown = () => {
    const [options] = useState(["Option 1", "Option 2", "Option 3", "Option 4"]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
  
      // Filter options based on input
      setFilteredOptions(
        options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      );
    };
  
    const handleSelect = (option) => {
      if (!selectedItems.includes(option)) {
        setSelectedItems([...selectedItems, option]);
      }
      setInputValue(""); // Clear input after selection
      setFilteredOptions(options); // Reset options
    };
  
    const handleRemove = (item) => {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    };
  
    return (
      <div className="w-72 relative">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedItems.map((item, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center"
            >
              {item}
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemove(item)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type to search or select"
          value={inputValue}
          onChange={handleInputChange}
        />
        <ul className="absolute mt-1 w-full max-h-40 overflow-y-auto bg-white border rounded-md shadow-lg z-10">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  };

ColorsCheckBox.Colors = Colors;
ColorsCheckBox.OrderTypes = OrderTypes;
ColorsCheckBox.EditColors = EditColors;
ColorsCheckBox.Advance = AdvancedDropdown;

export default ColorsCheckBox;
