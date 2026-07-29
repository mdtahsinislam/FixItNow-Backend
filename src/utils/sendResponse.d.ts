import { Response } from "express";
interface IResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
}
declare const sendResponse: <T>(res: Response, data: IResponse<T>) => Response<any, Record<string, any>>;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map