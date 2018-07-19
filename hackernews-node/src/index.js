const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tuturial for GraphQL"
  }
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: id => links.find(e => e.id === id)
  },
  Mutation: {
    post: (root, { url, description }) => {
      const link = {
        id: `link-${idCount++}`,
        description,
        url
      };
      links.push(link);
      return link;
    },
    updateLink: (root, args) => {
      const i = links.findIndex(e => e.id === args.id);
      return i === -1 ? null : (links[i] = args);
    },
    deleteLink: (root, { id }) => {
      const oldLinks = links;
      links = links.filter(e => e.id !== id);
      return oldLinks.find(e => e.id === id);
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
