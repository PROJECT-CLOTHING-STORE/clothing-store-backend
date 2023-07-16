export interface FindPaymentsRequestDto {
    userId: number;
}

export interface CreatePaymentRequestDto {
    userId: number;
    clothId: number;
    quantity: number;
}
