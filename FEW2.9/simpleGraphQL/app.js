const express = require('express');
const graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const app = express();

// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
        getDate(region: String): Date
        rollDice(numDice: Int!, numSides: Int): rolls
    }  

    type Date {
        fullDate: String
        time: String
    }

    type rolls {
        allRolls: [Int!]!
        total: Int!
    }
`);

// Root resolver
var root = {
    message: () => 'Hello World!',
    
    getDate: ({ region }) => { 
        // console.log(region)
        const today = new Date()
        return { 
            fullDate: today.toLocaleDateString(region), 
            time: today.toLocaleTimeString(region) 
        }
    },

    rollDice: function ({numDice, numSides}) {
        var output = [];
        var totalOutput = 0 

        for (var i = 0; i < numDice; i++) {
          var currentDice = 1 + Math.floor(Math.random() * (numSides || 6));
          output.push(currentDice)
          totalOutput += currentDice
        }
 

        return { allRolls: output, total: totalOutput };
      }
};
// Create an express server and a GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));