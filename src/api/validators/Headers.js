'use strict'

import Joi from 'joi'

const JoiAuthHeaders = Joi.object({
  authorization: Joi.string().required()
})

export { JoiAuthHeaders }
