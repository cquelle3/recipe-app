import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { Alert, Form, InputGroup } from 'react-bootstrap';
import { BiChevronDown, BiRestaurant, BiFoodMenu } from "react-icons/bi";

function RecipeCard({ recipe, index, recipeNumber }) {
  const animDuration = 500;
  const animDelay = 100;

  const animString = (i) => {
    if(i >= recipeNumber){
      i = i % recipeNumber;
    }
    return `fadeIn ${animDuration}ms ease-out ${animDelay * (i + 1)}ms forwards`;
  }

  return (
      <div className='recipe-result' style={{ animation: animString(index) }}>
        <Card className='recipe-card'>
          <Card.Header>{recipe['title']}</Card.Header>
          <Card.Img src={recipe['image']}></Card.Img>
          <Card.Body>
            <Card.Text dangerouslySetInnerHTML={{ __html: recipe['summary'] }}>
            </Card.Text>
            <a href={recipe['sourceUrl']} target='_blank' rel='noreferrer'>
              <Button variant='primary'>Recipe <BiFoodMenu/></Button>
            </a>
          </Card.Body>
        </Card>
      </div>
  );
}

function RecipeResults({ recipeData, recipeNumber }) {
  const recipeCards = [];

  recipeData.forEach((recipe, i) => {
    recipeCards.push(
      <RecipeCard recipe={recipe} index={i} recipeNumber={recipeNumber} key={recipe['title']}/>
    );
  })

  return (
    <div className='recipe-results-container'>
      <div className='recipe-results'>
        {recipeCards}
      </div>
    </div>
  )
}

function RecipeSearch() {
  const [searchInput, setSearchInput] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const [recipeNumber, setRecipeNumber] = useState(25);
  const [recipeNumRes, setRecipeNumRes] = useState(0);
  const [savedSearch, setSavedSearch] = useState(0);
  const [moreResCount, setMoreResCount] = useState(0);
  const [showMoreRes, setShowMoreRes] = useState(false);
  const [apiLimitReached, setApiLimitReached] = useState(false);

  const addRecipeInformation = true;

  function searchRecipes(){
    setRecipeData([]);
    setShowMoreRes(false);
    fetch(
      'https://api.spoonacular.com/recipes/complexSearch?apiKey=943dbaebed0b4e34b6e70ebf3284efbb&query=' + searchInput + '&addRecipeInformation=' + addRecipeInformation + '&number=' + recipeNumber
    )
    .then(response => response.json())
    .then(data => {
      if(data['code'] !== 402){
        setRecipeData(data['results']);
        setRecipeNumber(data['number']);
        setRecipeNumRes(data['totalResults']);
        setSavedSearch(searchInput);
        setApiLimitReached(false);

        if(data['results'].length < data['totalResults']){
          setShowMoreRes(true);
        }
      }
      else{
        setApiLimitReached(true);
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("error getting recipe data")
    });
  }

  function moreResults(){
    let offset = recipeNumber * (moreResCount + 1); 
    let number = recipeNumber;
    if(recipeNumRes - recipeData.length < recipeNumber){
      number = recipeNumRes - recipeData.length;
    }
    fetch(
      'https://api.spoonacular.com/recipes/complexSearch?apiKey=943dbaebed0b4e34b6e70ebf3284efbb&query=' + savedSearch + '&addRecipeInformation=' + addRecipeInformation + '&number=' + number + '&offset=' + offset
    )
    .then(response => response.json())
    .then(data => {
      if(data['code'] !== 402){
        let newData = recipeData.concat(data['results']); 
        setRecipeData(newData);
        setSavedSearch(searchInput);
        setApiLimitReached(false);
        setMoreResCount(moreResCount + 1);

        if(newData.length < recipeNumRes){
          setShowMoreRes(true);
        }
        else{
          setShowMoreRes(false);
        }
      }
      else{
        setApiLimitReached(true);
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("error getting recipe data")
    });
  }

  function searchKeyPress(key){
    if(key.code === "Enter"){
      searchRecipes();
    }
  }

  const onSearchChange = (e) => {
    setSearchInput(e.target.value);
  }

  let showMore = null;
  if(showMoreRes){
    showMore = <div className='more-results'>
                  <Button className='more-results-button' variant='light' onClick={moreResults}>More results <BiChevronDown/></Button>
                </div>
  }

  return (
      <>
        <div className='search-bar-container'>
          <div className='search-bar'>
            <InputGroup className='search'>
              <Form.Control placeholder='Recipe Search' aria-label='Recipe Search' onChange={onSearchChange} onKeyUp={(key) => searchKeyPress(key)}/>
              <Button variant='outline-primary' onClick={searchRecipes}><BiRestaurant/> Search</Button>
            </InputGroup>
          </div>
          <div className='api-alert'>
            <Alert variant='primary' show={apiLimitReached}>The Recipe API has exceeded it's maximum number of requests today. Sorry!</Alert>
          </div>
        </div>

        <RecipeResults recipeData={recipeData} recipeNumber={recipeNumber}/>

        {showMore}
      </>
  )
}

function App() {
  return (
    <RecipeSearch/>
  )
}

export default App;
