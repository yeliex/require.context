/**
 * Creator: yeliex
 * Project: EagleServer
 * Description:
 */

const
  fs = require("fs"),
  path = require("path");

module.exports = function(callerPath, useSubdirs, regexpression) {
  const rootpath = module.parent.paths[0].replace(/\/node_modules/, "/");

  callerPath = path.join(rootpath, callerPath);

  const reg = new RegExp(regexpression);

  var that = {};

  const getRequire = function(p) {

    p = path.normalize(p);

    if (!fs.statSync(p).isDirectory()) {
      return require(p);
    }

    if (useSubdirs) {
      return getList(p);
    }

    return null;
  };

  const getList = function(p) {

    var that = {};

    const list = fs.readdirSync(p);

    for (let item of list) {
      // if (reg.test(item)) {
      let current = path.normalize(p + "/" + item);
      that[item] = getRequire(current);
      // }
    }

    return that;
  };
  
  return getList(callerPath);
};