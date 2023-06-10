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
  try {
    const result: postsResult = await request(graphqlAPI, query)
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting Posts ----> ' + err)
  }
  return []
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

  try {
    const result: recentPosts = await request(graphqlAPI, query)
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting Recent Posts ----> ' + err)
  }
  return []
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

  try {
    const result: recentPosts = await request(graphqlAPI, query)
    return result.posts
  } catch (err) {
    console.log('ERROR Extracting Similar Posts ----> ' + err)
  }
  return []
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories() {
      categories {
        name
        slug
        shortName
      }
    }
  `

  try {
    const result: categories = await request(graphqlAPI, query)
    return result.categories
  } catch (err) {
    console.log('ERROR Extracting Categories ----> ' + err)
  }
  return []
}

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          text
        }
        markdown
      }
    }
  `

  try {
    const result: postDetailsResult = await request(graphqlAPI, query, {
      slug,
    })
    return result?.post
  } catch (err) {
    console.log('ERROR Extracting Post Details ----> ' + err)
  }
}

// interfaces
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
export interface postDetailsResult {
  post: {
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
    content: {
      text: string
    }
    markdown: string
  }
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

export interface categories {
  categories: [
    {
      name: string
      slug: string
      shortName: string
    }
  ]
}
