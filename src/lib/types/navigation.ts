export interface MenuItem {
    id: string;
    name: string;
    route: string;
    icon?: string; // For future icon support
    badge?: number; // For notification counts
}
