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
        // let url = `https://api-v3.igdb.com/games/?search=${this.state.search}`
        let url = `/games/?search=${this.state.search}`
        console.log(url)
        axios({
            url: url,
            method: 'get',
            headers: {
                'X-Id-Token': 'abc123abc123',
                'Content-Type': 'application/json',
                'user-key': '462843eb01e2e3eb1d654648e7159dda',
            }
         })
         // .then(res => res.json())
        .then(result => {
            return JSON.parse(result.data);
        })
        .then(data => {
            let games = data.map((game) => {
                return(
                    <div key={game.id}>
                        <h1>{game.name}</h1>
                        <h2>{game.category}</h2>
                    </div>
                )
                // console.log(games)
            })
            this.setState({games: games});

            // console.log(JSON.parse(data)[0])

            console.log(data)
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