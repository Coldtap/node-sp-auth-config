"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOnPrem = exports.getHiddenPropertyName = exports.defaultPasswordMask = exports.saveConfigOnDisk = exports.convertSettingsToAuthContext = exports.convertAuthContextToSettings = void 0;
var mkdirp = require("mkdirp");
var path = require("path");
var fs = require("fs");
var url = require("url");
var convertAuthContextToSettings = function (authContext, settings) {
    if (settings === void 0) { settings = {}; }
    var passwordPropertyName = (0, exports.getHiddenPropertyName)(authContext.authOptions);
    var password = authContext.authOptions[passwordPropertyName];
    var plainContext = __assign(__assign({ siteUrl: authContext.siteUrl, strategy: authContext.strategy }, authContext.authOptions), { custom: authContext.custom });
    return plainContext;
};
exports.convertAuthContextToSettings = convertAuthContextToSettings;
var convertSettingsToAuthContext = function (configObject, settings) {
    if (settings === void 0) { settings = {}; }
    var formattedContext = {
        siteUrl: ((configObject === null || configObject === void 0 ? void 0 : configObject.siteUrl) || '').split('#')[0] || '',
        strategy: configObject.strategy,
        authOptions: __assign({}, configObject),
        settings: settings,
        custom: configObject.custom,
    };
    if (typeof formattedContext.custom === 'undefined') {
        delete formattedContext.custom;
    }
    delete formattedContext.authOptions.siteUrl;
    delete formattedContext.authOptions.strategy;
    delete formattedContext.authOptions.custom;
    return formattedContext;
};
exports.convertSettingsToAuthContext = convertSettingsToAuthContext;
var saveConfigOnDisk = function (authContext, settings) {
    return new Promise(function (resolve, reject) {
        var configDataJson = (0, exports.convertAuthContextToSettings)(authContext, settings);
        var saveFolderPath = path.dirname(settings.configPath);
        mkdirp(saveFolderPath)
            .then(function () {
            var data = JSON.stringify(configDataJson, null, 2);
            fs.writeFile(settings.configPath, data, 'utf8', function (err) {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                resolve();
            });
        })
            .catch(function (ex) {
            console.error("Error creating folder \"".concat(saveFolderPath, "\""), ex);
        });
    });
};
exports.saveConfigOnDisk = saveConfigOnDisk;
exports.defaultPasswordMask = '********';
var getHiddenPropertyName = function (data) {
    if (data.password) {
        return 'password';
    }
    if (data.clientSecret) {
        return 'clientSecret';
    }
    return undefined;
};
exports.getHiddenPropertyName = getHiddenPropertyName;
var isOnPrem = function (siteUrl) {
    if (siteUrl.toLocaleLowerCase().indexOf('#spo') !== -1) {
        return false;
    }
    var host = url.parse(siteUrl.toLocaleLowerCase()).host || '';
    return (['.sharepoint.com', '.sharepoint.cn', '.sharepoint.de', '.sharepoint-mil.us', '.sharepoint.us'].filter(function (uri) { return host.indexOf(uri) !== -1; }).length === 0);
};
exports.isOnPrem = isOnPrem;
//# sourceMappingURL=index.js.map