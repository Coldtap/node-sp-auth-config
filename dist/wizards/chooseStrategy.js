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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var url_1 = require("url");
var hooks_1 = require("../utils/hooks");
var config_1 = require("../config");
var utils_1 = require("../utils");
var wizard = function (authContext, settings, answersAll) {
    if (answersAll === void 0) { answersAll = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var target, _a, protocol, host, strategies, defaultStrategy, promptFor, answers, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (answersAll.online && (0, utils_1.isOnPrem)(answersAll.siteUrl)) {
                        answersAll.siteUrl = answersAll.siteUrl + '#spo';
                    }
                    target = (0, utils_1.isOnPrem)(answersAll.siteUrl) ? 'OnPremise' : 'Online';
                    _a = (0, url_1.parse)(answersAll.siteUrl), protocol = _a.protocol, host = _a.host;
                    strategies = (0, config_1.getStrategies)().filter(function (strategy) {
                        if (target === 'OnPremise' &&
                            protocol === 'https:' &&
                            host.indexOf('.') !== -1 &&
                            strategy.target.indexOf('O365Dedicated') !== -1) {
                            return true;
                        }
                        return strategy.target.indexOf(target) !== -1;
                    });
                    defaultStrategy = strategies.reduce(function (position, strategy, index) {
                        if (authContext.strategy === strategy.id) {
                            position = index;
                        }
                        return position;
                    }, 0);
                    promptFor = [{
                            name: 'strategy',
                            message: 'Authentication strategy',
                            type: 'list',
                            choices: strategies.reduce(function (choices, strategy) {
                                if (strategy.withSeparator && choices.length > 0) {
                                    choices.push(new inquirer_1.Separator());
                                }
                                var choice = {
                                    name: strategy.name,
                                    value: strategy.id,
                                    short: strategy.name
                                };
                                choices.push(choice);
                                return choices;
                            }, []),
                            default: defaultStrategy
                        }];
                    answersAll = __assign(__assign({}, answersAll), promptFor.reduce(function (r, q) {
                        if (typeof q.default !== 'undefined') {
                            r[q.name] = q.choices[q.default].value;
                        }
                        return r;
                    }, {}));
                    _b = inquirer_1.prompt;
                    return [4, (0, hooks_1.shouldSkipQuestionPromptMapper)(promptFor, authContext, settings, answersAll)];
                case 1: return [4, _b.apply(void 0, [_c.sent()])];
                case 2:
                    answers = _c.sent();
                    return [2, __assign(__assign({}, answersAll), answers)];
            }
        });
    });
};
exports.default = wizard;
//# sourceMappingURL=chooseStrategy.js.map