export class Infermerie {
   _id: string
    phone: string;
    nom: string;
    prenom: string;
    email: string;
    adresse: string;
    constructor(_id, _phone,_malades, _nom,_prenom, _email, _adresse){
        this._id = _id;
        this.phone = _phone;
        this.nom = _nom;
        this.prenom = _prenom;
        this.email = _email;
        this.adresse = _adresse;
    }
}