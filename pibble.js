const fetch = require('node-fetch')
const url = 'https://api.tumblr.com/v2/tagged?tag=pitbull&api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4'

module.exports = (pluginContext) => {
  return {
    respondsTo: (query) => {
      return query === 'pibble'
    },
    search: (query, env = {}) => {
      return fetch(url).then((res) => {
        return res.json()
      }).then((data) => {
        return data.response.filter((post) => {
          return post.type === 'photo' // Just photo posts
        }).sort(() => {
          return Math.floor(Math.random() * 2) || -1 // Randomize Sort
        }).map((post) => {
          return {
            icon: 'fa-camera',
            title: 'Can i haz pibble!?',
            subtitle: post.summary,
            preview: `<img src='${post.photos[0].original_size.url}' />`,
            value: post.post_url,
          }
        })
      })
    },
  }
}
