// Base schema import
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from "graphql";

// This happens to conform to struct 1! So we can use
// our local structures or conform external to our local
function getPersonByURL(relativeURL) {
  console.log("my rel url .." + relativeURL);
  return {
    fullURL: "bassse" + relativeURL,
    firstName: "Andrew"
  }; // could have got this object from anywhere!
  // e.g. fetch(url).then() etc
}

// GraphQL Schema basically creates a sane mapping
// fields need a type - imported or defined!
// our Struct type.. a Class really (methods and attributes)

// Struct 1
const PersonType = new GraphQLObjectType({
  name: "Person",
  description: "...my Person type",
  fields: () => ({
    firstName: {
      type: GraphQLString,
      resolve: person => person.firstName
      // its funny - you dont access the field directly like a
      // tyical object. Instead, you must RESOLVE it..
    },
    friends: {
      type: new GraphQLList(PersonType), // normally just a list of URLS
      resolve: person => person.friends(args)
      // resolve is cool because it can map over those
      // lists of URLs (GraphQLLIST) and give me better stuff :)
    }
  })
});

// Struct 2 (using Struct 1)
const myQueryType = new GraphQLObjectType({
  name: "Query",
  description: "myCoolQuery",
  fields: () => ({
    person: {
      type: PersonType, // Defined earlier
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args) => getPersonByURL("/blah/${args.id}/")
      // args could be formed into a relative URL
      // could do fetch.thens etc here
      // root & args passed into the resolve func ..
    }
  })
});

// export the new schema so it is accessible in index.js
export default new GraphQLSchema({
  query: myQueryType
});
