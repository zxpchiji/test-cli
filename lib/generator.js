const ora = require('ora');
const symbols = require('log-symbols');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const downloadGitRepo = require('download-git-repo');
const chalk = require('chalk');
const handlebar = require('handlebars');

class Generator {
    constructor(name, targetDir, res) {
        this.name = name;
        this.targetDir = targetDir;
        this.res = res;
    }

    async download() {
        // 1）拼接下载地址
        const requestUrl = `github.com:Paulinho89/webpack5-single-template#master`;
        const spinner = ora(`正在下载模板，源地址：${requestUrl}`);
        spinner.start();
        // 2）调用下载方法
        await downloadGitRepo(
            // 直连下载，默认下载master
            requestUrl,
            this.targetDir,
            (error) => {
                if (error) {
                    spinner.fail();
                   // 下载失败给出友情提示 console.log(symbols.error, chalk.red(error));
                } else {
                    spinner.succeed();
                    const fileName =  `${this.name}/package.json`;
                    // 下载成功后获取命令行输入的提示信息
                    const meta = {
                        name: this.name,
                        version: this.res.version,
                        description: this.res.description,
                        author: this.res.author
                    }
                    // {{name}}/package.json路径存在时
                    if (fs.existsSync(fileName)) {
                    // 读取提示信息
                    const content = fs.readFileSync(fileName).toString();
                    const resultContent = handlebar.compile(content)(meta); //写入提示信息到模板项目的package.json文中 
                    fs.writeFileSync(fileName, resultContent);
                    }
                    console.log(symbols.success, chalk.green('项目初始化成功'))
                    console.log(symbols.info, `\r\n  cd ${chalk.cyan(this.name)}`)
                    console.log(symbols.info, `\r\n  npm install`)
                    console.log(symbols.info, 'npm run start\r\n')
                }
            }
        )
    }
}

module.exports = Generator;
