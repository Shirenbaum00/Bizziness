export default interface User {
    _id: string;


    firstName: string;
    middleName?: string;
    lastName: string;


    image?: {
        url: string;
        alt?: string;
    };

    address: {
        state?: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip?: number;
    };

    email: string;
    phone: string;

    isBusiness: boolean;
    isAdmin?: boolean;

    createdAt?: string;
}
