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
  const [recipeData, setRecipeData] = useState(null);

  function searchRecipes(){
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=943dbaebed0b4e34b6e70ebf3284efbb&query=pasta&addRecipeInformation=true`
    )
    .then(response => response.json())
    .then(data => {
      setRecipeData(data);
      console.log(data);
    })
    .catch(() => {
      console.log("error getting recipe data")
    });
  }


  return (
      <InputGroup>
        <Form.Control placeholder='Recipe Search' aria-label='Recipe Search'/>
        <Button variant='outline-primary'>Search</Button>
      </InputGroup>
      /* <Card className='recipe-card'>
        <Card.Header>Recipe</Card.Header>
        <Card.Img src=''></Card.Img>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>Card Subtitle</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant='primary' onClick={searchRecipes}>Recipe Search</Button>
        </Card.Body>
      </Card> */
  )
}

export default App;
