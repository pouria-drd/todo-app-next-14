import { DefaultUser } from "next-auth";

interface User extends DefaultUser {
    username: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
}

export default User;
