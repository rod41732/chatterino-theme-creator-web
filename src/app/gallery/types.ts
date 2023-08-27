import { ThemeEntry } from "@/lib/type";
import { User } from "@/lib/db/user";

export type ThemeEntryWithOwner = ThemeEntry & {
    owner: User;
};
