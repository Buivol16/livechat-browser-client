export interface Chat {
    id?: string;
    name?: string;
    isPublic?: boolean;
    isPrivate?: boolean;
    members?: string[];
    messages?: string[];
}