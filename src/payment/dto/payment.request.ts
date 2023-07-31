export interface FindPaymentsRequestDto {
    username: string;
}

export interface CreatePaymentRequestDto {
    username: string;
    clothId: number;
    quantity: number;
    size: string;
    email: string;
    firstName: string;
    lastName: string;
    city: string;
    province: string;
    postalCode: number;
}
