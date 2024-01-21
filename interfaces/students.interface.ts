
interface IStudent {
    _id: number;
    name?: string;
    student_id: number 
}

interface IStudentResponse {
    status: number;
    message: string;
    attendees?: IStudent[];
}

export { IStudent, IStudentResponse }