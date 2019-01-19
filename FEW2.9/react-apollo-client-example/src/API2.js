import React, { Component } from 'react';
import axios from 'axios';

class API2 extends Component {
    constructor() {
        super();
        this.state = {
            search: 'witcher',
            games: [],
        }
    }

    componentDidMount() {
        let url = `https://api-v3.igdb.com/games/?search=${this.state.search}`
        console.log(url)
        axios({
            url: url,
            method: 'get',
            headers: {
                'X-Id-Token': 'abc123abc123',
                'Content-Type': 'application/json',
                'user-key': '462843eb01e2e3eb1d654648e7159dda'
            }
         })
        .then(result => {
            return result.json();
        }).then(data => {
            let games = data.results.map((game) => {
                return(
                    <div>
                        <h1>{game.name}</h1>
                        <p>{game.url}</p>
                    </div>
                )
                // console.log(games)
            })
            this.setState({games: games});
            // console.log(data)
        })
    }

    render() {
        return (
            <div>
                {this.state.games}
            </div>
        )
    }
}

export default API2;