// - Créer le hook useDebounce et useLocalStorage
import { useState, useEffect } from 'react';

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
  const [totalPages, setTotalPage] = useState(0);  
  const [currentPage, setCurrentPage] = useState(1);  
  const itemsPerPage=10;

  //4.2 - Ajouter l'état pour la pagination
  useEffect(() => {
    fetchProducts();
  }, []); 
  
  //4.2 - Ajouter les dépendances pour la pagination

  //4.1 - Ajouter la fonction de rechargement
  const fetchProducts = async () => {
    try {
      //4.2 - Modifier l'URL pour inclure les paramètres de pagination
      const response = await fetch('https://api.daaif.net/products?delay=1000');
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setTotalPage(data.products.length/itemsPerPage);
      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  

  //4.1 - Ajouter la fonction de rechargement
  const reload = async () => {
    setLoading(true);
    setError(null);
    await fetchProducts();
  };

  // 4.2 - Ajouter les fonctions pour la pagination
  function nextPage() {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  }
  
  function previousPage() {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  }
  //....
  return { 
    products, 
    loading, 
    error,
    // 4.1 - Retourner la fonction de rechargement
    reload,
    //4.2 - Retourner les fonctions et états de pagination
    previousPage,
    nextPage,
    totalPages,
    currentPage,
    itemsPerPage,
  };
};

export default useProductSearch;