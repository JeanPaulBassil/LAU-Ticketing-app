
interface IStudent {
    id: number;
    name?: string;
}

interface IStudentResponse {
    status: number;
    message: string;
}

export { IStudent, IStudentResponse }