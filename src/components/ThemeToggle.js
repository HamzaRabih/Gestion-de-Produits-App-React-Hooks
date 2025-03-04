import React, { useContext } from 'react';
import { LanguageContext, ThemeContext } from '../App';
import translations from '../translations';

const ThemeToggle = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <button
      onClick={() => setIsDarkTheme(!isDarkTheme)}
      className={`px-5 py-2 rounded ${
        isDarkTheme 
          ? 'bg-dark text-light border border-light'  
          : 'bg-light text-dark border border-dark'   
      }`}
    >
      {isDarkTheme ? t.lightMode : t.darkMode}
    </button>
  );
};

export default ThemeToggle;