import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

// function ItemRow({ item }) {
//   return (
//     <tr>
//       <td>{item.name}</td>
//       <td>{item.price}</td>
//     </tr>
//   );
// }

// function ItemTable({ items }) {
//   const rows = [];

//   items.forEach((item) => {
//     rows.push(
//       <ItemRow item={item} key={item.name} />
//     );
//   });

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Price</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows}
//       </tbody>
//     </table>
//   );
// }

// const ITEMS = [
//   {name: "Cheerios", price: "5$"},
//   {name: "Apple", price: "1$"},
//   {name: "Milk", price: "4$"}
// ];



function App() {
  const [searchInput, setSearchInput] = useState("");
  const [recipeData, setRecipeData] = useState({'results': []});
  const [recipeNumber, setRecipeNumber] = useState(0);
  const [recipeNumRes, setRecipeNumRes] = useState(0);
  const [recipeOffset, setRecipeOffset] = useState(0);
  const [savedSearch, setSavedSearch] = useState(0);
  const [currTab, setCurrTab] = useState(0);

  const animDuration = 500;
  const animDelay = 100;

  function searchRecipes(){
    setRecipeData({'results': []});
    fetch(
      'https://api.spoonacular.com/recipes/complexSearch?apiKey=943dbaebed0b4e34b6e70ebf3284efbb&query=' + searchInput + '&addRecipeInformation=true'
    )
    .then(response => response.json())
    .then(data => {
      setRecipeData(data);
      setRecipeNumber(data['number']);
      setRecipeNumRes(data['totalResults']);
      setRecipeOffset(data['offset']);
      setSavedSearch(searchInput);
      setCurrTab(0);
      console.log(data);
    })
    .catch(() => {
      console.log("error getting recipe data")
    });
  }

  function onTab(tabIndex){
    if(tabIndex != currTab){
      setCurrTab(tabIndex);
      setRecipeData({'results': []});
      fetch(
        'https://api.spoonacular.com/recipes/complexSearch?apiKey=943dbaebed0b4e34b6e70ebf3284efbb&query=' + savedSearch + '&addRecipeInformation=true&offset=' + (tabIndex * 10)
      )
      .then(response => response.json())
      .then(data => {
        setRecipeData(data);
        setRecipeNumber(data['number']);
        setRecipeNumRes(data['totalResults']);
        setRecipeOffset(data['offset']);
        setSavedSearch(searchInput);
        console.log(data);
      })
      .catch(() => {
        console.log("error getting recipe data")
      });
    }
  }

  const onSearchChange = (e) => {
    setSearchInput(e.target.value);
  }

  const animString = (i) => `fadeIn ${animDuration}ms ease-out ${animDelay * (i + 1)}ms forwards`;

  const tabs = [];
  for(let i = 0; i < (recipeNumRes / recipeNumber); i++){
    tabs.push(
      <div className='tab'>
        <Button className='tab-button' variant={i === currTab ? 'primary' : 'light'} onClick={() => onTab(i)}>{i + 1}</Button>
      </div>
    )
  }

  return (
      <>
        <div className='search-bar-container'>
          <InputGroup className='search-bar'>
            <Form.Control placeholder='Recipe Search' aria-label='Recipe Search' onChange={onSearchChange}/>
            <Button variant='outline-primary' onClick={searchRecipes}>Search</Button>
          </InputGroup>
        </div>
        
        <div className='tabs-container'>
          {tabs}
        </div>

        <div className='recipe-results-container'>
          <div className='recipe-results'>
            {recipeData['results'].map((recipe, i) => (
              <div key={i} className='recipe-result' style={{ animation: animString(i) }}>
                <Card className='recipe-card'>
                  <Card.Header>{recipe['title']}</Card.Header>
                  <Card.Img src={recipe['image']}></Card.Img>
                  <Card.Body>
                    <Card.Text dangerouslySetInnerHTML={{ __html: recipe['summary'] }}>
                    </Card.Text>
                    <a href={recipe['sourceUrl']} target='_blank'>
                      <Button variant='primary'>Link</Button>
                    </a>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </>
  )
}

export default App;
