import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const STAR_REPOSITORY = gql`
    query Search($query: String = "corn", $first: Int = 5) {
        search(type:REPOSITORY, query: $query, first: $first) {
        edges {
            node {
            ... on Repository {
                name
                url
                stargazers(first:5) {
                totalCount
                edges {
                    node {
                    name
                    }
                }
                }
            }
            }
        }
        }
    }
`;

class Github2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: 10,
            category: "corn"
        };
    }

    render () {

        const vars = { first: Number(this.state.listings), query: this.state.category }

        return (
            <div>
                <label> Num of Listings: </label>
                <input type="number" value={this.state.listings} onChange={e => this.setState({listings: e.target.value})} />
                <label> Category: </label>
                <input type="text" value={this.state.category} onChange={e => this.setState({category: e.target.value})} />

                <Query query={STAR_REPOSITORY} variables={vars}>
                    {({data, loading, error}) => {
                        if (loading) {
                            return <div>Loading ...</div>;
                        } else if (error) {
                            return <p>Error: {error.message}</p>
                        }
                        console.log(data)

                        return (
                            <div>
                                <h1>SUCCESS</h1>
                                {data.search.edges.map((item) => 
                                    <div key={item.node.url}>
                                        <h3>Name: {item.node.name}</h3> 
                                        <p>Total Star: {item.node.stargazers.totalCount}</p>
                                    </div>
                                )}
                            </div>
                        );
                    }}
                </Query>

            </div>
        )
    }
}

export default Github2;