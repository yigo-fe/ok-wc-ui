var shell = require('shelljs')
var package = require('./package.json')
var packageName = package.name
var version = package.version

// 检查控制台是否可以运行`ego-fe-oss-client`的命令
if (!shell.which('ego-fe-oss-client')) {
  //在控制台输出内容
  shell.echo('Sorry, this script requires ego-fe-oss-client')
  shell.exit(1)
}

if (
  shell.exec(
    `ego-fe-oss-client -d ./dist -s LIB -p ${packageName}/${version}/dist`
  ).code !== 0
) {
  shell.echo('Error: Git commit failed')
  shell.exit(1)
}
