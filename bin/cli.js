#! /usr/bin/env node

const program = require('commander').program
const packageV = require("../package.json");
const { version } = packageV;
// 
const figlet = require('figlet');
const chalk = require('chalk');


program
  // 定义命令和参数
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
     // 在 create.js 中执行创建任务
     require('../lib/create.js')(name, options)
  })

program
  .on('--help', () => {
    console.log('\r\n' + figlet.textSync('zxpchiji', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    console.log(`\r\nRun ${chalk.cyan(`zxpchiji <command> --help`)} for detailed usage of given command\r\n`)
  })

program
   // 配置版本号信息
  .version(
    `zxpchiji:${version}`,
    "-v,-version",
    "output the current zxpchiji version"
    )
  .usage('<command> [option]')
  
// 解析用户执行命令传入参数
program.parse(process.argv);
