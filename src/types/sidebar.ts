export interface SidebarItem {
    name: string
    icon: string
    active?: boolean
    badge?: string
}

export interface SidebarSection {
    category: string
    items: SidebarItem[]
}