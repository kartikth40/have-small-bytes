import { request, gql } from 'graphql-request'

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!

export const getPosts = async () => {
  const query = gql`
    query GetPosts {
      posts {
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        createdAt
        slug
        title
        summary
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
      }
    }
  `

  interface postResult {
    posts: [
      {
        author: {
          bio: string
          id: string
          name: string
          photo: {
            url: string
          }
        }
        createdAt: string
        slug: string
        title: string
        summary: string
        featuredImage: {
          url: string
        }
        categories: [
          {
            name: string
            slug: string
          }
        ]
      }
    ]
  }

  const result: postResult = await request(graphqlAPI, query)
  console.log(result)
  return result.posts
}
