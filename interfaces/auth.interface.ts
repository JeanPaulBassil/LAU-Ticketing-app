interface LoginData {
    name: string;
    password: string;
}

interface LoginResponse {
    message: string;
    statusCode: number;
}



export { LoginData, LoginResponse };