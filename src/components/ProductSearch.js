import React, { useState, useContext ,useEffect} from 'react';
import { useDebounce  } from "use-debounce";
import { ThemeContext } from '../App';

const ProductSearch = ({setSearchTerm}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  // 2.1 - Utiliser le LanguageContext
  const [inputValue, setInputValue] = useState("");

  //1.2 - Utiliser le hook useDebounce
  const [debouncedSearchTerm] = useDebounce(inputValue, 1000);


  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);


  return (
    <div className="mb-4">
      <input
        type="text"
        input={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;