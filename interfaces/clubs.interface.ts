interface IClub {
    readonly name: string;
    password: string;
    email: string;
    verified: boolean;
    code: string ;
    expiresAt: Date;
    readonly events: string[];
}

export { 
    IClub
}