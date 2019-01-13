import React, { Component } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// Component imports
import Link from './Link';

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

class LinkList extends Component {
  render() {
    return (
        <Query query={FEED_QUERY}>
          {({data, loading, error}) => {
              if (loading) {
                  return <div>Loading.....</div>
              } else if (error) {
                  return <div>{error}</div>
              }

              const linksToRender = data.feed.links

              return (
                <div>
                  {linksToRender.map(link => <Link key={link.id} link={link} />)}
                </div>
              )
          }}
        </Query>
    )

  }
}

export default LinkList