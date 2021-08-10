import { FunctionComponent, createContext, h } from 'preact';

import Categories from './components/categories/categories';
import Confetti from './components/categories/confetti';
import Food from './components/categories/food';
import Languageinput from "./components/language_input";
import LanguageinputComp from "./components/language_input_main";
import MoviesAndTv from './components/categories/movies&TV';
import NationalNews from './components/categories/nationalNews';
import News from './components/categories/nationalNews';
import Router from 'preact-router';
import Screen1 from "./components/onboarding_screen_1";
import SelectedCategories from './components/categories/category_summary';
import Sports from './components/categories/sports';
import { getCategorySubscriptions } from './scripts/glanceJsBridge';
import { useState } from 'preact/hooks';

// export const CatgData = createContext();
// const data = JSON.parse(getCategorySubscriptions());
// console.log("Data: ", data)

const App: FunctionComponent = () => {

  // const [currentScreen, setCurrentScreen] = useState('categories');

  // if (currentScreen === 'categories') {
  //   return <Categories setCurrentScreen={setCurrentScreen} />
  // } else if (currentScreen === 'entertainment') {
  //   return <MoviesAndTv setCurrentScreen={setCurrentScreen} />
  // } else if (currentScreen === 'food') {
  //   return <Food setCurrentScreen={setCurrentScreen} />
  // } else if (currentScreen === 'news') {
  //   return <NationalNews setCurrentScreen={setCurrentScreen} />
  // } else if (currentScreen === 'sports') {
  //   return <Sports setCurrentScreen={setCurrentScreen} />
  // } else if (currentScreen === 'confetti') {
  //   return <Confetti setCurrentScreen={setCurrentScreen} />
  // } else if (currentScreen === 'selected') {
  //   return <SelectedCategories />
  // }

  // return <Categories />
  return <LanguageinputComp />

};

export default App;


{/* <Screen1 path="/" />
    <Languageinput path="/lang" /> */}

{/* // return < CatgData.Provider value={data} >
  //   <Router>
  //     <LanguageinputComp path="/" /> 
  //     <Categories path="/" />
  //     <MoviesAndTv path="/moviesandtv" />
  //     <NationalNews path="/news" />
  //     <Sports path="/sports" />
  //     <Food path="/food" />
  //     <SelectedCategories path="/selected" />
  //     <Confetti path="/confetti" />
  //   </Router>
  // </CatgData.Provider> */}