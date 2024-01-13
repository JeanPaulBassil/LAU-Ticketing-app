interface LoginData {
    name: string;
    password: string;
}

interface LoginResponse {
    message: string;
    statusCode: number;
}

interface verifyData {
    name: string;
    code: string;
    password: string;
}

export { LoginData, LoginResponse, verifyData };
