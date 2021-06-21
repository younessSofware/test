import { Patient } from './Patient';
import { Malade } from './Malade';
export class Consultation {
    _id: string;
    rapport: any;
    prediction: string;
    etat: boolean;
    malade: Malade;
    createdAt: Date;
    updatedAt: Date;
    patient: Patient
}