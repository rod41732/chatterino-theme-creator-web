export interface ApiResponse<T> {
    status: number;
    message: string;
    data: unknown;
}
