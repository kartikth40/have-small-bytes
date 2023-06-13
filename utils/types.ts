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
    content: string
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
