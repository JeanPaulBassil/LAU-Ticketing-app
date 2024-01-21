
interface IStudent {
    _id: number;
    name?: string;
    student_id: number 
}
interface Attendee extends IStudent {
    date: string;
}

interface IStudentResponse {
    status: number;
    message: string;
    attendees?: IStudent[];
}

export { IStudent, IStudentResponse, Attendee }