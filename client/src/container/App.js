import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Logo from '../components/logo/Logo';
import Signin from '../components/signin/Signin';
import Register from '../components/register/Register';
import Navigation from '../components/navigation/Navigation';
import ImageLinkForm from '../components/imagelink/ImageLinkForm';
import Rank from '../components/rank/Rank'
import FaceRecognition from '../components/face/faceRecognition';


const app = new Clarifai.App({
  apiKey: '703a65b9096c4b91a53a4eb4667b60f0'
});

const particlesContent = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}

class App extends Component {
  state = {
    input: '',
    imageUrl: '',
    box: {},
    route: "signin",
    isSignedIn: false
  }
  calculatefaceLocation = (data) => {
    const clarifiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifiFace.left_col * width,
      topRow: clarifiFace.top_row * height,
      rightCol: width - (clarifiFace.right_col * width),
      bottomRow: height - (clarifiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    // console.log(box)
    this.setState({ box: box })
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value })
  }
  onBtnSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculatefaceLocation(response))
        .catch(err => console.log(err))
        // there was an error
      );
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }
  render() {
    return (
      <div className='App'>
        <Particles className='particles'
          params={particlesContent}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === "home"
          ? <>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </>
          : (
            this.state.route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
