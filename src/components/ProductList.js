import React, { useContext } from 'react';
import { LanguageContext, ThemeContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';
import translations from '../translations';

const ProductList = ({searchTerm}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  //2.1 - Utiliser le LanguageContext pour les traductions
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  var filtredProducts;
  const { 
    products, 
    loading, 
    error,
    // 4.1 - Récupérer la fonction de rechargement
    reload,
    previousPage,
    nextPage,
    currentPage,
    totalPages,
    itemsPerPage,
    //4.2 - Récupérer les fonctions et états de pagination
  } = useProductSearch();
  
  if(searchTerm!=''){
     filtredProducts=products.filter(
      (p)=>p.title.toUpperCase().includes(searchTerm.toUpperCase())
      || p.description.toUpperCase().includes(searchTerm.toUpperCase())
      || p.price.toString().toUpperCase().includes(searchTerm.toUpperCase())
    )
  }else{
    filtredProducts=products;
  }
  
  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{t.loading}...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger" role="alert">
      {language=="FR"?"Erreur":"Error"}: {error}
    </div>
  );

  // Filtrage et pagination
   filtredProducts = products
  .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div class="d-flex justify-content-between">
         {/* Bouton de rechargement */}
          <div >
            <button className="btn btn-primary btn-sm" onClick={reload}>
              🔄 {t.reload}
            </button>
          </div>

        {/*4.2 - Ajouter les contrôles de pagination */}
        <nav >
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={previousPage} disabled={currentPage === 1}>
                {t.previousPage}
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">
                {t.page} {currentPage}  {t.of } {totalPages}
              </span>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
                {t.nextPage} 
              </button>
            </li>
          </ul>
        </nav>
 
      </div>

     
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filtredProducts.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>{t.price} :</strong>
                  {product.price} €
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductList;