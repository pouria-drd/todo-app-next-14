import { DefaultUser } from "next-auth";

interface User extends DefaultUser {
    username: string;
    createdAt: string;
    role: string;
    updatedAt: string;
    isActive: boolean;
}

export default User;
