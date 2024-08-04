import { DefaultUser } from "next-auth";

interface User extends DefaultUser {
    role: string;
    username: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export default User;
