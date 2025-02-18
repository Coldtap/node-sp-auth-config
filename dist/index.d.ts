import { IAuthContext, IAuthConfigSettings } from './interfaces';
export declare class AuthConfig {
    private settings;
    private strategies;
    private context;
    private customData;
    constructor(settings?: IAuthConfigSettings);
    getContext: () => Promise<IAuthContext>;
    private tryAuth;
    private checkForPrompts;
    private runCheckForPrompts;
    private getJsonContent;
}
export { IAuthContext, IAuthConfigSettings } from './interfaces';
export { IAuthOptions } from 'node-sp-auth';
