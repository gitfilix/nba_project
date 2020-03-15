import React, { Component } from 'react'
import Axios from 'axios'
import SliderWidget from '../Utils/Slider'
import  { URL_HOME } from '../Utils/paths'


class Home extends Component {

  state = {
    home: ''
  }

  componentDidMount() {
    Axios.get(URL_HOME)
    .then(response => {
      console.log('response.data', response.data);
      this.setState({
        home: response.data
      })
    })
  }

  render() {
    return (
      <>
        <SliderWidget slides={this.state.home.slider} />
      </>
    )
  }
}

export default Home
