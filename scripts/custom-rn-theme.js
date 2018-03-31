/**
 * Created by yangyang on 2018/3/31.
 */
const path = require('path');
const fs = require('fs');
// for 1.x
// const defaultVars = require('antd-mobile/lib/style/themes/default');
// for 2.x
const defaultVars = require('antd-mobile/lib/style/themes/default.native');
const customVars = require('../theme');
// for 1.x
// const themePath = path.resolve(require.resolve('antd-mobile'), '../style/themes/default.js');
// for 2.x
const themePath = path.resolve(require.resolve('antd-mobile'), '../style/themes/default.native.js');
const themeVars = Object.assign({}, defaultVars, customVars);

if (fs.statSync(themePath).isFile()) {
  fs.writeFileSync(
    themePath,
    'var brandPrimary = "#0B9389"; var brandPrimaryTap = "#7AEBE9";module.exports = ' + JSON.stringify(themeVars)
  );
}