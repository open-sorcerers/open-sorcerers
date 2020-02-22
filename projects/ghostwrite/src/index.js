import "core-js" // es2015 polyfill
import nodePlop from "./node-skeletal"

/**
 * Main node-skeletal module
 *
 * @param {string} bonefilePath - The absolute path to the bonefile we are interested in working with
 * @param {object} skeletalCfg - A config object to be passed into the bonefile when it's executed
 * @returns {object} the node-skeletal API for the bonefile requested
 */
module.exports = nodePlop
