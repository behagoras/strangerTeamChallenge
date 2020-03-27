// const productsMocks = require('../utils/mocks/products')
const MongoLib = require('../store/mongo')
const TwitterApiService = require('./twitter')

const twitterApiService = new TwitterApiService()

class HashtagsService {
  constructor () {
    this.collection = 'hashtags'
    this.mongoDB = new MongoLib()
  }

  async getHashtags ({ tags }) {
    const query = tags && { tags: { $in: tags } }
    const hashtags = await this.mongoDB.getAll(this.collection, query)

    return hashtags || []
  }

  async getHashtag ({ hashtag }) {
    const data = await this.mongoDB.getAll(this.collection, { hashtag })
    return data || {}
  }

  async createHashtag ({ hashtag }) {
    const hashtagObject = await this.getHashtag({ hashtag })
    if (hashtagObject) {
      hashtagObject.forEach(({ _id }) => {
        this.deleteHashtag({ _id })
      })
    }

    const data = await twitterApiService.getData(hashtag)
    const _id = await this.mongoDB.create(this.collection, { data: data.statuses, hashtag })
    return { ...data, _id }
  }

  async updateProduct ({ productId, product }) {
    const updateProductId = await this.mongoDB.update(
      this.collection,
      productId,
      product
    )

    return updateProductId
  }

  async deleteHashtag ({ hashtagId, hashtag }) {
    if (hashtagId) {
      const deletedHashtagId = await this.mongoDB.delete(
        this.collection,
        hashtagId
      )
      return deletedHashtagId
    }

    const hashtags = await this.getHashtag({ hashtag })
    const { _id } = hashtags[0]
    const deletedHashtagId = await this.mongoDB.delete(
      this.collection,
      _id
    )
    return deletedHashtagId
  }
}

module.exports = HashtagsService
