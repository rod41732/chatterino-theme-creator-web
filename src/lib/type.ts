import { ThemeData } from "@/app/edit/color-scheme.types";

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

export interface ThemeEntry {
    id: string;
    data: ThemeData;
}
