import { IAuthContext, IAuthConfigSettings } from "../interfaces";
export declare const shouldSkipQuestionPromptMapper: <T = string>(questions: T[], authContext: IAuthContext, settings: IAuthConfigSettings, answersAll: any) => Promise<T[]>;
