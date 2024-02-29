const path = require('path');
const fs = require('fs-extra');
const symbols = require('log-symbols');
const inquirer = require('inquirer');
const Generator = require('./generator');

module.exports = async function(name, options) {
    const cwd = process.cwd();
    // 需要创建的目录地址
    const targetAir = path.join(cwd, name);
    // 判断目录是否已经存在
    if (!fs.existsSync(targetAir)) {
        // 创建新的目录
        fn(name, targetAir);
    } else {
        console.log(symbols.error, chalk.red('项目已存在'));
        // 是否要强制创建
        if (options.force) {
            await fs.remove(targetAir);
            // 创建新的目录
            fn(name, targetAir);
        }
    }
}

const fn = (name, targetAir) => {
  // 自定义模板项目信息
  inquirer.prompt([
      {
          name: 'version',
          message: '请输入项目版本',
          default: '1.0.0'
      },
      {
          name: 'description',
          message: '请输入项目描述信息',
          default: '这是一个自定义脚手架生成的项目'
      },
      {
          name: 'author',
          message: '请输入作者名称',
          default: ''
      }
  ]).then(res => {
      // TODO 下载github模板
      const generator = new Generator(name, targetAir, res);
      generator.download();
  })
}
