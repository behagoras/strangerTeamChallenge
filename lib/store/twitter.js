const config = require('../../config')
const TwitterConnection = require('twitter')

class Twitter {
  constructor () {
    this.connection = new TwitterConnection({
      consumer_key: config.consumerKey,
      consumer_secret: config.consumerSecret,
      access_token_key: config.accessTokenKey,
      access_token_secret: config.accessTokenSecret
    })
  }

  async getTweets (term) {
    // eslint-disable-next-line no-useless-catch
    try {
      const tweet = await this.connection.get('search/tweets', { q: `${term}` })
      return Promise.resolve(tweet)
    } catch (error) {
      throw error
    }
  }
}

module.exports = Twitter
