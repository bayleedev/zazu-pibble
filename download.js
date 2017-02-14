const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const url = 'https://api.tumblr.com/v2/tagged?tag=pitbull&api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4'

module.exports = ({ cwd }) => {
  const local = path.join(cwd, 'pibble.jpg')
  return () => {
    return fetch(url).then((res) => {
      return res.json()
    }).then((data) => {
      return data.response.filter((post) => {
        return post.type === 'photo' // Just photo posts
      }).map((post) => {
        return post.photos[0].original_size.url // Actual photos
      }).sort(() => {
        return Math.floor(Math.random() * 2) || -1 // Randomize Sort
      }).find(() => {
        return true // Get first item
      })
    }).then((photoUrl) => {
      return fetch(photoUrl)
    }).then((res) => {
      const dest = fs.createWriteStream(local)
      res.body.pipe(dest)
      return local
    })
  }
}
