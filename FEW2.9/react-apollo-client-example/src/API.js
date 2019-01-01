import React, { Component } from 'react';

// const fetchData = () => {
//     fetch('https://randomuser.me/api/?results=500')
//     .then(result => {
//         return result.json();
//     }).then(data => {
//         let pictures = data.results.map((pics) => {
//             return(
//                 <div key={pics.results}>
//                     <img src={pics.pictures.medium} />
//                 </div>
//             )
//         })
//         this.setState({pictures: pictures});
//     })
// }

class API extends Component {
    constructor() {
        super();
        this.state = {
            abilities: [],
        }
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/ability?offset=10&limit=10')
        .then(result => {
            return result.json();
        }).then(data => {
            let abilities = data.results.map((ability) => {
                return(
                    <div>
                        <h1>{ability.name}</h1>
                        <p>{ability.url}</p>
                    </div>
                )
                // console.log(ability)
            })
            this.setState({abilities: abilities});
            // console.log(data)
        })
    }

    render() {
        return (
            <div>
                {this.state.abilities}
            </div>
        )
    }
}

export default API;