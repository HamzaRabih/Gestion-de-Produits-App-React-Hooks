import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import translations from './translations';

// TODO: Exercice 2.1 - Créer le LanguageContext
export const LanguageContext = createContext();
export const ThemeContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
    // TODO: Exercice 2.2 - Ajouter l'état pour la langue
  const [language, setLanguage] = useState("FR");
  const t = translations[language];
  
  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      
      {/* TODO: Exercice 2.1 - Wrapper avec LanguageContext.Provider */
      <LanguageContext.Provider value={{language, setLanguage }} >

      <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
        <header className="my-4">
          <h1 className="text-center">{t.title}</h1>
          <div className="d-flex justify-content-end gap-2">
            <ThemeToggle />
            {/* TODO: Exercice 2.2 - Ajouter le sélecteur de langue */
            <select onChange={(e) => setLanguage(e.target.value)} className={`form-select-sm ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              <option value="FR">{language=="FR"?"Français":"French"}</option>
              <option value="EN">{language=="FR"?"Anglais":"English"}</option>
            </select>
            }
          </div>
        </header>
        <main>
        <ProductSearch setSearchTerm={setSearchTerm}  />
        <ProductList searchTerm={searchTerm} />
        </main>
      </div>  
      </LanguageContext.Provider>}
    
    </ThemeContext.Provider>
  );
};

export default App