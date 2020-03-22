import React, { Component } from 'react'
import axios from 'axios' 
import { URL_TEAMS } from '../Utils/paths'


class Poll extends Component {

    // teams with poll allowed
    state = {
        pollTeams: []
    }

    getPoll = () => {
        axios.get(`${URL_TEAMS}?poll=true&_sort=count&_order=desc`)
        .then( response => {
            this.setState({ pollTeams: response.data })
        })
    }

    componentDidMount() {
        this.getPoll()
    }

    renderPoll() {
        
        const positions = ['1st','2nd', '3rd']

        return this.state.pollTeams.map( (item, index)=>(
            <div key={index} className='poll_item'>
                <img alt={item.team} src={`/images/teams/${item.logo}`} />
                <h4>{positions[index]}</h4>
                <div>
                    {item.count} Votes
                </div>
            </div>
        ) )
    }


    render() {
        console.log('poll this.state', this.state)
        return(
            <>
                <div className='home_poll'>
                    <h3>Who will be the next champion ?</h3>
                    <div className='poll_container'>
                        {this.renderPoll()}
                    </div>
                </div>
            </>
        )
    }
}

export default Poll