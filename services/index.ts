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

  const result: postsResult = await request(graphqlAPI, query)
  return result.posts
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(orderBy: createdAt_DESC, first: 3){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
    }
  `

  const result: recentPosts = await request(graphqlAPI, query)
  return result.posts
}

export const getSimilarPosts = async () => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}, first: 3}
      ) {
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
      }
    }
  `

  const result: recentPosts = await request(graphqlAPI, query)
  return result.posts
}

export interface postsResult {
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

export interface post {
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

export interface recentPosts {
  posts: [
    {
      title: string
      createdAt: string
      slug: string
      featuredImage: {
        url: string
      }
    }
  ]
}

export interface widgetPost {
  title: string
  createdAt: string
  slug: string
  featuredImage: {
    url: string
  }
}
