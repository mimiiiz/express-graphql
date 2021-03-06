const { GraphQLServer } = require('graphql-yoga')


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            let found = links.find((element) => element.id === args.id);
            let foundIndex = links.findIndex((element) => element.id === args.id);
            found.url = args.url
            found.description = args.description
            links[foundIndex] = found
            return found
        },
        deleteLink: (parent, args) => {
            let foundIndex = links.findIndex((element) => element.id === args.id);
            links.splice(foundIndex, 1)
            return
        }

    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))