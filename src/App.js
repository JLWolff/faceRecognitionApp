import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/register/Register';

// PARTICLES JS parametres
const particlesOptions = {
  "particles": {
        number: { 
          value: 110, 
          density: { 
            enable: true, 
            value_area: 1000, 
          } 
        }, 
      },
    "interactivity": {
          "detect_on": "window",
          "events": {
              "onclick": {
                  "enable": true,
                  "mode": "push"
              }
          }
      }  
  }

const initialState = {
    input: '',
    imageUrl: '',
    boxes: [],
    route: 'Signin',
    isSignedIn: false,
    user: {
      id: '',
      name:'' ,
      email: '',
      entries: 0,
      joined: ''
    }
  }

class App extends React.Component {

  constructor(){
    super();
    //the states of the app
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
 }     
  //maps the arrays of the reponses,
  //then map the maped array to adjust it with the width and height of the image thats beeing analized
  calculateFaceLocation = (data) =>{
   const clarifaiFaces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
   const image = document.getElementById('inputImage');
   const width = Number(image.width);
   const height = Number(image.height); 

   return clarifaiFaces.map( face => {
    return({
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height),
      })
   });
 } 

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  //this change the input to be the eventtarget value
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

//when button is submited this all happen
//first the state of imgurl is now the input and then the appmodel stuff
//the api stuff makes the request and tkes care of the responses
//displayfacebox changes the state of the the boxes state with the response obj paramenter
//after passing by the calculateFaceLocation with the response of the API
  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input});
      fetch('https://serene-shore-29568.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
             input: this.state.input
          }) 
        })
      .then(response => response.json())
      //here we are taking the response and selectin the boxes that we will ned
      .then(response => {
        if(response) {
          fetch('https://serene-shore-29568.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
             id: this.state.user.id
          }) 
        })
          .then(response => response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => alert('This pic failed, try another one'));
    }
//this is the funciton to change the page that will be shown, changing the router state
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState(initialState)
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      //itens of the app in the div
      //and particles with a class that makes in full screen.
      //after the navbar there is a ternary operator to select was will appear on the screen
      //depending on the state of the route, and putting in the page you must be
      <div className="App"> 
        <Particles className="particles" params={particlesOptions} />
         <Navigation isSignedIn={isSignedIn}onRouteChange={this.onRouteChange}/>
        { route === 'home'
           ?  <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm boxes={boxes} onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> 
                 <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
              </div>
           :(
              route === 'Signin' 
              ?  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            ) 
        }
      </div>
    );
  }
}
  

export default App;
