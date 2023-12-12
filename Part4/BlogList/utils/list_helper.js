const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const favorite = blogs.reduce((favoriteBlog, currentBlog) => {
    return currentBlog.likes > favoriteBlog.likes ? currentBlog : favoriteBlog;
  }, blogs[0]);

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return;

  const blogCounts = {};

  blogs.forEach((blog) => {
    if (blog.author in blogCounts) {
      blogCounts[blog.author]++;
    } else {
      blogCounts[blog.author] = 1;
    }
  });

  const highestCount = Object.keys(blogCounts).reduce((a, b) =>
    blogCounts[a] > blogCounts[b] ? a : b
  );

  return {
    author: highestCount,
    blogs: blogCounts[highestCount],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
