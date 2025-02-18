"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStrategies = exports.getTargetsTypes = void 0;
var spauth = require("node-sp-auth");
var getTargetsTypes = function () {
    return ['Online', 'OnPremise'];
};
exports.getTargetsTypes = getTargetsTypes;
var getStrategies = function () {
    var strategies = [
        {
            id: 'OnpremiseUserCredentials',
            name: 'User credentials (NTLM)',
            withPassword: true,
            target: ['OnPremise'],
            verifyCallback: spauth.isUserCredentialsOnpremise,
        },
        {
            id: 'AdfsUserCredentials',
            name: 'ADFS user credentials (On-Prem)',
            withPassword: true,
            target: ['OnPremise'],
            verifyCallback: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return spauth.isAdfsCredentials(args[1]);
            },
        },
        {
            id: 'OnpremiseFbaCredentials',
            name: 'Form-based authentication (FBA)',
            withPassword: true,
            target: ['OnPremise'],
            verifyCallback: spauth.isFbaCredentialsOnpremise,
        },
        {
            id: 'OnpremiseTmgCredentials',
            name: 'Form-based authentication (Forefront TMG)',
            withPassword: true,
            target: ['OnPremise'],
            verifyCallback: spauth.isTmgCredentialsOnpremise,
        },
        {
            id: 'OnPremiseAddinCredentials',
            name: 'Add-In Only permissions (On-Prem)',
            withPassword: false,
            target: ['OnPremise'],
            verifyCallback: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return spauth.isAddinOnlyOnpremise(args[1]);
            },
        },
        {
            id: 'UserCredentials',
            name: 'User credentials (SAML/ADFS)',
            withPassword: true,
            target: ['Online'],
            verifyCallback: spauth.isUserCredentialsOnline,
        },
        {
            id: 'OnlineAddinCredentials',
            name: 'Add-In Only permissions',
            withPassword: true,
            target: ['Online'],
            verifyCallback: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return spauth.isAddinOnlyOnline(args[1]);
            },
        },
        {
            id: 'OnDemandCredentials',
            name: 'On-Demand credentials (Electron@8 is required, not compatible with NTLM)',
            withPassword: false,
            target: ['Online', 'OnPremise'],
            verifyCallback: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return spauth.isOndemandCredentials(args[1]);
            },
        },
        {
            id: 'UserCredentials',
            name: 'User credentials - SAML/ADFS (SPO, O365 Dedicated)',
            withPassword: true,
            target: ['O365Dedicated'],
            verifyCallback: spauth.isUserCredentialsOnline,
            withSeparator: true,
        },
        {
            id: 'OnlineAddinCredentials',
            name: 'Add-In Only permissions (SPO, O365 Dedicated)',
            withPassword: true,
            target: ['O365Dedicated'],
            verifyCallback: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return spauth.isAddinOnlyOnline(args[1]);
            },
        },
    ];
    return strategies;
};
exports.getStrategies = getStrategies;
//# sourceMappingURL=index.js.map