import React, { Component } from 'react'
import axios from 'axios'
import  { URL_EMAIL} from './paths'


class Subscriptions extends Component {

  state = {
    email: '',
    error: false,
    success: false,
    alreadyIn: false
  }

  clearMessages = () => {
    setTimeout(()=>{
      this.setState({
        error: false,
        success: false,
        alreadyIn: false
      })
    }, 3000)
  }

  saveSubscription = (email) => {
    console.log('email', email)


    // get email and check if its already in there
    axios.get(`${ URL_EMAIL}?email=${email}`)
    .then (response => {
      if(!response.data.length) {

        // post request to store emailk
        axios(URL_EMAIL,{
          method: 'POST',
          headers: {
            'Accept' : 'application/json',
            'Content-Type' :'application/json'
          },
          data: JSON.stringify({email})
        }).then( response => {
          this.setState({
            email: '',
            success: true
          })
          this.clearMessages()
        })
      } else {
        // user is already on the list
        this.setState({
          email: '',
          alreadyIn: true
        })
        this.clearMessages()
      }
    })
  }

  handleSubmit = (event) => {
    console.log('event', event)
    event.preventDefault();
    let email = this.state.email
    let regex = /^\S+@\S+\.\S+$/

    if(regex.test(email)) {
      this.saveSubscription(email)
    } else {
      // trugger error
      this.setState({error: true})
    }
    this.clearMessages()
  }


  onChangeInput = (event) => {
    this.setState({
      email: event.target.value
    })

  }

  render () {
    const state= this.state;
    return (
      <div className="subcribe_panel">
        <h3>subscriptions to this nba project</h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              value={state.email}
              placeholder='youremail@gmail.com'
              onChange={this.onChangeInput}
              />
            <div className={state.error ? 'error show': 'error'}>Check your email</div>
            <div className={state.success ? 'success show' : 'success'}>Thank you</div>
            <div className={state.alreadyIn ? 'alreadyIn show' : 'alreadyIn'}>You are already on the DB</div>
          </form>
        </div>
        <small>
          dummy text lorem ipsum dolor sit amet, concectetur didpiscicng elit, sed do eisumod
        </small>
      </div>
    )
  }
}

export default Subscriptions
