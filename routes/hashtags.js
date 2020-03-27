const express = require('express')
const router = express.Router()

const HashtagsService = require('../lib/services/hashtags')
const hashtagsService = new HashtagsService()

// const validation = require('../utils/middlewares/validationHandler')
// const {
// hashtagIdSchema,
// hashtagTagSchema,
// createHashtagSchema
// updateHashtagSchema
// } = require('../utils/schemas/hashtags')

// Get all hashtags from mongo
router.get('/', async (req, res, next) => {
  const { tags } = req.query
  try {
    const hashtags = await hashtagsService.getHashtags({ tags })
    res.json(hashtags)
  } catch (error) {
    next(error)
  }
})

// Get specific hashtag from mongo
router.get('/:hashtag', async (req, res, next) => {
  try {
    const { hashtag } = req.params
    const data = await hashtagsService.getHashtag({ hashtag })

    res.status(201).json({
      hashtag,
      data
    })
  } catch (err) {
    next(err)
  }
})

// Get specific hashtag from twitter and insert to mongo
router.post(
  '/:hashtag',
  // validation(createHashtagSchema),
  async (req, res, next) => {
    try {
      const { hashtag } = req.params
      const data = await hashtagsService.createHashtag({ hashtag })
      res.status(201).json({
        hashtag,
        data
      })
    } catch (err) {
      next(err)
    }
  })

// Delete specific hashtag and every duplication
router.delete('/:hashtag', async (req, res, next) => {
  try {
    const { hashtag } = req.params
    const deletedHashtagId = await hashtagsService.deleteHashtag({ hashtag })
    res.status(200).json({
      action: 'delete',
      hashtag,
      deletedHashtagId
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
