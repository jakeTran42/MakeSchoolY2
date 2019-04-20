import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

export default class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isLoaded: false,
        data: []
     };
  }

  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {data.map(item => (
            <li key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      );
    }
  }
}