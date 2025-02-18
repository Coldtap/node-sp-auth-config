#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var path = require("path");
var init_1 = require("./cli/init");
var read_1 = require("./cli/read");
var version = require(path.join(__dirname, '..', 'package.json')).version;
commander_1.program
    .version(version)
    .name('sp-auth')
    .usage('[command]')
    .description('Command line config options builder for node-sp-auth (SharePoint Authentication in Node.js)');
commander_1.program
    .command('init')
    .description('writes new file with node-sp-auth credentials into the file system')
    .option('-p, --path [value]', "relative path to file which will store your credentials (default: './config/private.json')", './config/private.json')
    .option('-e, --encrypt [true, false]', "specify false if you don't need to encrypt password in the file (default: true)", true)
    .option('-k, --masterkey [value]', 'optional key used to encrypt and decrypt passwords (default: unique machine id)', null)
    .action(init_1.init);
commander_1.program
    .command('read')
    .description('reads credentials from a private.json file')
    .option('-p, --path [value]', "relative path to file which will store your credentials (default: './config/private.json')", './config/private.json')
    .option('-e, --encrypt [true, false]', "specify false if you don't need to encrypt password in the file, optional (default: true)", true)
    .option('-k, --masterkey [value]', 'optional key used to encrypt and decrypt passwords (default: unique machine id)', null)
    .option('-f, --format', 'optional key used configure formatted output', false)
    .action(read_1.read);
commander_1.program.parse(process.argv);
if (commander_1.program.args.length === 0) {
    commander_1.program.help();
}
//# sourceMappingURL=cli.js.map