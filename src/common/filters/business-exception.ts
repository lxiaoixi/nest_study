import { HttpException, HttpStatus } from '@nestjs/common';

interface Error {
    status: number;
    code: number;
    message: string;
}

export const errorType = {
    NO_AUTH: { status: 401, code: 1000, message: 'token无效' },
    VALITATION_ERROR: { status: 200, code: 1002, message: 'Valitation failed!' },
    SERVER_ERROR: { status: HttpStatus.INTERNAL_SERVER_ERROR, code: 1001, message: '系统开小差' },
    ACCESS_DENIED: { status: 403, code: 4003, message: 'access denied' },
    NO_RESPONSE: { status: 504, code: 504, message: 'Response Timeout' },

    USER_SEND_SMS_ERROR: { status: 200, code: 3000, message: '发送验证码错误' },
    USER_SEND_SMS_TOO_MANY: { status: 200, code: 3001, message: '' },
    USER_LOGIN_ERROR: { status: 200, code: 3002, message: '登录失败' },
    USER_SEND_SMS_WITH_CAPTCHA: { status: 200, code: 3003, message: '请验证滑动验证码' },

    UPLOAD_ERROR: { status: 200, code: 4000, message: '上传文件失败' },
    JAVA_SERVICE_ERROR: { status: 200, code: 4001, message: 'java API 异常' },
};

export class BusinessException extends HttpException {
    constructor(error: Error, description?: string) {
        if (description) {
            error.message = description;
        }
        super(error, error.status);
    }
}


