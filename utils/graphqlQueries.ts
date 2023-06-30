import { gql } from 'graphql-request'

export const authorUrlQuery = gql`
  query GetauthorUrl($authorId: ID!) {
    author(where: { id: $authorId }) {
      websiteUrl
    }
  }
`

export const PostsQuery = gql`
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

export const FeaturedPostsQuery = gql`
  query GetPosts {
    posts(where: { featuredPost: true }) {
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

export const FeaturedCategoryPostsQuery = gql`
  query GetPosts($category: String!) {
    posts(where: { featuredPost: true, categories_some: { slug: $category } }) {
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
    }
  }
`

export const CategoryPostsQuery = gql`
  query GetPosts($category: String!) {
    posts(where: { categories_some: { slug: $category } }) {
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

export const PostDetailsQuery = gql`
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
      content
    }
  }
`

export const RecentPostsQuery = gql`
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

export const SimilarPostsQuery = gql`
  query GetPostDetails($slug: String!, $categories: [String!]) {
    posts(
      where: {
        slug_not: $slug
        AND: { categories_some: { slug_in: $categories } }
      }
      first: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
`

export const CategoriesQuery = gql`
query GetCategories() {
  categories {
    name
    slug
    shortName
  }
}
`

export const loginQuery = gql`
  query Login($email: String!) {
    reader(where: { email: $email }) {
      id
      name
      email
      password
      photo {
        url
      }
    }
  }
`

export const newUserQuery = gql`
  mutation NewUser(
    $name: String!
    $email: String!
    $password: String!
    $photoId: ID!
  ) {
    createReader(
      data: {
        name: $name
        email: $email
        password: $password
        photo: { connect: { id: $photoId } }
      }
    ) {
      id
      name
      email
    }
    publishReader(where: { email: $email }) {
      id
      name
      email
    }
  }
`

export const checkEmailQuery = gql`
  query CheckEmail($email: String!) {
    reader(where: { email: $email }) {
      id
    }
  }
`
export const updateUserQuery = gql`
  mutation UpdateUser($userId: ID!, $name: String!, $email: String!, $photoId: ID!) {
    updateReader(
      data: {photo: {connect: {id: $photoId}}, email: $email, name: $name}
      where: {id: $userId}
    ) {
      id
    }
`

export const getAllProfileAvatarQuery = gql`
    query GetProfileAvatar(){
      assets(orderBy: fileName_ASC, where: {fileName_contains: "avatar"}, first: 12) {
        fileName
        url
      }
    }
`
