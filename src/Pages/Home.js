import React from 'react';
import NavigationBar from '../Components/NavigationBar'
import '../Styles/Home.css';


function Home() {
  return (
    <div className="App">
      <div className="NavBarContainer"> <NavigationBar/> </div>
      <div className="Image"> <img src='/Home.jpg' alt="Home"/></div>
    </div>
  );
}

export default Home