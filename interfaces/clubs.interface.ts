interface IClub {
    readonly name: string;
    readonly password: string;
    readonly email: string;
    readonly verified: boolean;
    readonly code?: string ;
    readonly expiresAt?: Date;
    readonly events: string[];
    readonly _id: string;
    readonly __v: number;

}

export { 
    IClub
}