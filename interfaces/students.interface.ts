
interface IStudent {
    id: number;
    name?: string;
}

interface IStudentResponse {
    status: number;
    message: string;
    attendees?: IStudent[];
}

export { IStudent, IStudentResponse }