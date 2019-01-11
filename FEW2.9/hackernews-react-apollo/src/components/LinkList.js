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
    const linksToRender = [
      {
        id: '1',
        description: 'Prisma turns your database into a GraphQL API 😎',
        url: 'https://www.prismagraphql.com',
      },
      {
        id: '2',
        description: 'The best GraphQL client',
        url: 'https://www.apollographql.com/docs/react/',
      },
    ]

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