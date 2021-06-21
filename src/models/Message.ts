export class Message{
    _id: string;
    subject: string;
    files? = [];
    fromDoctorId: string
    toDoctorId: string
    fromPatientId: string
    toPatientId: string;
    isRead?: boolean;
    createdAt: Date;
    updatedAt: Date;
}