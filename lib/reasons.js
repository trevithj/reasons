//  Reasons.js by Dave Kinkead
//  Copyright 2017-2019 University of Queensland
//  Available under the MIT license

/**
 * The Reasons.js API.  This module forms the top level wrapper
 */
const Mapper = require('./mapper')
const Highlighter = require('./highlighter')

module.exports = {
  mapper: function (dom) {
    return new Mapper(dom)
  },

  highlighter: function (dom) {
    return new Highlighter(dom)
  }
}