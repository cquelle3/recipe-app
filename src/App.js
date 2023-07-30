import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { Accordion, Alert, Form, InputGroup, Spinner } from 'react-bootstrap';
import { BiChevronDown, BiRestaurant, BiFoodMenu } from "react-icons/bi";
import DOMPurify from 'dompurify';

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
            <Card.Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipe['summary']) }}>
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

  const [minCalories, setMinCalories] = useState(NaN);
  const [maxCalories, setMaxCalories] = useState(NaN);
  const [minCarbs, setMinCarbs] = useState(NaN);
  const [maxCarbs, setMaxCarbs] = useState(NaN);
  const [minProtein, setMinProtein] = useState(NaN);
  const [maxProtein, setMaxProtein] = useState(NaN);
  const [minFat, setMinFat] = useState(NaN);
  const [maxFat, setMaxFat] = useState(NaN);
  const [savedOptionsStr, setSavedOptionsStr] = useState("");

  const [loading, setLoading] = useState(false);

  const addRecipeInformation = true;

  function searchRecipes(){
    setLoading(true);
    setMoreResCount(0);
    setRecipeData([]);
    setShowMoreRes(false);

    let options = "";
    if(!isNaN(minCalories)) options += '&minCalories=' + minCalories;
    if(!isNaN(maxCalories)) options += '&maxCalories=' + maxCalories;
    if(!isNaN(minCarbs)) options += '&minCarbs=' + minCarbs;
    if(!isNaN(maxCarbs)) options += '&maxCarbs=' + maxCarbs;
    if(!isNaN(minProtein)) options += '&minProtein=' + minProtein;
    if(!isNaN(maxProtein)) options += '&maxProtein=' + maxProtein;
    if(!isNaN(minFat)) options += '&minFat=' + minFat;
    if(!isNaN(maxFat)) options += '&maxFat=' + maxFat; 

    setSavedOptionsStr(options);

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}&query=${searchInput}&addRecipeInformation=${addRecipeInformation}&number=${recipeNumber}${options}`
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
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      console.log("error getting recipe data")
      setLoading(false);
    });
  }

  function moreResults(){
    setLoading(true);

    let offset = recipeNumber * (moreResCount + 1); 
    let number = recipeNumber;
    if(recipeNumRes - recipeData.length < recipeNumber){
      number = recipeNumRes - recipeData.length;
    }

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}&query=${savedSearch}&addRecipeInformation=${addRecipeInformation}&number=${number}&offset=${offset}${savedOptionsStr}`
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
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      console.log("error getting recipe data")
      setLoading(false);
    });
  }

  function searchKeyPress(key){
    if(key.code === "Enter"){
      searchRecipes();
    }
  }

  let showMore = null;
  if(showMoreRes && !loading){
    showMore = <div className='more-results'>
                  <p>{recipeData.length} of {recipeNumRes}</p>
                  <Button className='more-results-button' variant='light' onClick={moreResults}>More results <BiChevronDown/></Button>
                </div>
  }
  else if(!showMoreRes && recipeData.length > 0){
    showMore = <div className='more-results'>
                  <p>{recipeData.length} of {recipeNumRes}</p>
               </div>
  }

  let loadIcon = null;
  if(loading){
    loadIcon = <div className='load-spinner'>
                  <Spinner animation="border" variant="primary" />
                </div>
  }

  const onSearchChange = (e) => {
    setSearchInput(e.target.value);
  }

  const onMinCalories = (e) => {
    setMinCalories(parseFloat(e.target.value));
  }

  const onMaxCalories = (e) => {
    setMaxCalories(parseFloat(e.target.value));
  }

  const onMinCarbs = (e) => {
    setMinCarbs(parseFloat(e.target.value));
  }

  const onMaxCarbs = (e) => {
    setMaxCarbs(parseFloat(e.target.value));
  }

  const onMinProtein = (e) => {
    setMinProtein(parseFloat(e.target.value));
  }

  const onMaxProtein = (e) => {
    setMaxProtein(parseFloat(e.target.value));
  }

  const onMinFat = (e) => {
    setMinFat(parseFloat(e.target.value));
  }

  const onMaxFat = (e) => {
    setMaxFat(parseFloat(e.target.value));
  }

  //used to check if we scroll past the title
  //triggers box shadow for header is css
  useEffect(() => {
    const header = document.getElementById('header');
    const intercept = document.getElementById('title');
    const observer = new IntersectionObserver(([entry]) => {
      header.classList.toggle('active', !entry.isIntersecting);
    });
    observer.observe(intercept);
  });

  return (
      <>
        <div className='title-container' id='title'>
          <h1 className='app-title'>Recipe Search</h1>
        </div>
        <div className='search-bar-container' id='header'>
          <div className='search-bar'>
            <InputGroup className='search'>
              <Form.Control placeholder='Recipe Search' aria-label='Recipe Search' onChange={onSearchChange} onKeyUp={(key) => searchKeyPress(key)}/>
              <Button variant='outline-primary' onClick={searchRecipes}><BiRestaurant/> Search</Button>
            </InputGroup>
          </div>

          <div className='options'>
            <Accordion className='options-accordion'>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Options</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Minimum Calories</Form.Label>
                      <Form.Control type='number' onChange={onMinCalories}/>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Maximum Calories</Form.Label>
                      <Form.Control type='number' onChange={onMaxCalories}/>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Minimum Carbs</Form.Label>
                      <InputGroup>
                        <Form.Control type='number' onChange={onMinCarbs}/>
                        <InputGroup.Text>grams</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Maximum Carbs</Form.Label>
                      <InputGroup>
                        <Form.Control type='number' onChange={onMaxCarbs}/>
                        <InputGroup.Text>grams</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Minimum Protein</Form.Label>
                      <InputGroup>
                        <Form.Control type='number' onChange={onMinProtein}/>
                        <InputGroup.Text>grams</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Maximum Protein</Form.Label>
                      <InputGroup>
                        <Form.Control type='number' onChange={onMaxProtein}/>
                        <InputGroup.Text>grams</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Minimum Fat</Form.Label>
                      <InputGroup>
                        <Form.Control type='number' onChange={onMinFat}/>
                        <InputGroup.Text>grams</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Maximum Fat</Form.Label>
                      <InputGroup>
                        <Form.Control type='number' onChange={onMaxFat}/>
                        <InputGroup.Text>grams</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <div className='api-alert'>
            <Alert variant='primary' show={apiLimitReached}>The Recipe API has exceeded it's maximum number of requests today. Sorry!</Alert>
          </div>
        </div>

        <RecipeResults recipeData={recipeData} recipeNumber={recipeNumber}/>

        {loadIcon}        
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
