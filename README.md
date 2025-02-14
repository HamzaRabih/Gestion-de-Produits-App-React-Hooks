### Exercice 1 : État et Effets 
#### Objectif : Implémenter une recherche en temps réel

- [ ] 1.1 Modifier le composant ProductSearch pour utiliser la recherche

#### Problématique  :
Le probléme principale c'est comment envoyer la valeur 'searchTerm' dans le composant ProductSearch vers le composant ProductListe pour filtrer les produit par 'searchTerm'
#### Solution :
pour envoyer la valeur searchTerm dans le composant ProductSearch vers le composant ProductListe , j'ai deplacé le hook 
puis j'ai envoiée la référence de setSearchTerm au composant ProductSearch, comme ça quand l utilisateur tapez sur l'input le composant App reçois la valeur setSearchTerm et l envoyé au composant ProductListe dans le props 
Afin de ProductListe filtré par searchTerm   */

```
 [searchTerm, setSearchTerm] = useState("");
```
 
_Réponse pour l'exercice 1 :_

_App.js:_
```

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
   ....
  return (
    ....
        <ProductSearch setSearchTerm={setSearchTerm} />
        <ProductList searchTerm={searchTerm} />
    ....
  );
};

```

ProductList.js:_
```
const ProductList = ({searchTerm}) => {  
  const { 
    products, 
    loading, 
    error,
  } = useProductSearch();
  
  if(searchTerm!=''){
    var filtredProducts=products.filter(
      (p)=>p.title.toUpperCase().includes(searchTerm.toUpperCase())
      || p.description.toUpperCase().includes(searchTerm.toUpperCase())
      || p.price.toString().toUpperCase().includes(searchTerm.toUpperCase())
    )
  }else{
    filtredProducts=products;
  }
  ....
  return (
    <div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filtredProducts.map(product => (
          <div key={product.id} className="col">
            .....
          </div>
        ))}
      </div>
    </div>
  );
};

```
_ProductList.js:_
```
const ProductSearch = ({setSearchTerm}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        ...
      />
    </div>
  );
};

```
Captures d'écran:
<img src="Capture/1.png">
