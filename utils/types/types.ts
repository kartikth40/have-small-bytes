// interfaces

export interface authorURL {
  author: {
    websiteUrl: string
  }
}
export interface posts {
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
export interface postsType {
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

export interface postDetailsType {
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

export interface postType {
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

export interface recentPostsType {
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

export interface categoriesType {
  categories: [
    {
      name: string
      slug: string
      shortName: string
    }
  ]
}

export interface loginType {
  reader: {
    id: string
    email: string
    password: string
  }
}

export interface userAddedType {
  reader: {
    id: string
    name: string
    email: string
  }
}

export interface readerIdReturnType {
  reader: {
    id: string | null
  }
}

export interface profileAvatarsType {
  assets: [
    {
      id: string
      filename: string
      url: string
    }
  ]
}
