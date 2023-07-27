export interface FindPaymentsRequestDto {
    userId: number;
}

export interface CreatePaymentRequestDto {
    userId: number;
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
