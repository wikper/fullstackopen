const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes))
  const favBlog = blogs.find((blog) => blog.likes === maxLikes)
  if (!favBlog) {
    return null
  }
  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
