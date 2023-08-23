import { User } from "@/lib/db/user";
import { ApiResponse } from "@/lib/type";

export async function getMe(): Promise<User> {
    return fetch("/api/me").then(async (res) => {
        const body = await res.json();
        if (!res.ok) {
            console.error(`Error getting me (${res.status}) `, body);
            throw new Error("Error getting user");
        }
        return (body as ApiResponse<User>).data;
    });
}
