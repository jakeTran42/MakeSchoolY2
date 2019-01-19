import React, { Component } from 'react';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

class API3 extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        }
    }

    render() {
        let url = ''
        if (this.state.search) {
            url = `https://pokeapi.co/api/v2/pokemon/${this.state.search}`
        }
        return (
          <div>
            <input type="text" value={this.state.search} onChange={e => this.setState({search: e.target.value})} />
            <Get url={url}>
              {(error, response, isLoading, makeRequest, axios) => {
                if(error) {
                  return (<div>Cannot find this Pokemon: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
                }
                else if(isLoading) {
                  return (<div>Loading...</div>)
                }
                else if(response !== null) {
                    let data = response.data
                    console.log(response)
                    return (<div>
                        <h2>{data.name}</h2>
                        {data.abilities.map((ability) => {
                            return(<h3 key={ability.ability.url}>Ability: {ability.ability.name}</h3>)
                        })}
                        {data.types.map((type) => {
                            return (
                                <div>
                                    <h4>No. {type.slot}</h4>
                                    <h4 key={type.type.url}>Type: {type.type.name} </h4>
                                </div>)
                            // console.log(type)
                        })}
                        <img src={data.sprites.front_default} />
                        <img src={data.sprites.back_default} />
                        <img src={data.sprites.front_shiny} />
                    </div>)
                }
                return (<div>Default message before request is made.</div>)
              }}
            </Get>
          </div>
        )
      }
}

export default API3;