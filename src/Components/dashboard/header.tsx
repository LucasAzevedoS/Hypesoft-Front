"use client"

import { useEffect, useState } from "react"
import { Bell, ChevronDown, MoreHorizontal, Sun } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function Header() {
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        const storedUsername = localStorage.getItem("username")
        setUsername(storedUsername)
    }, [])

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                                <span className="font-medium">UnitedMen</span>
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>UnitedMen</DropdownMenuItem>
                            <DropdownMenuItem>WomenStyle</DropdownMenuItem>
                            <DropdownMenuItem>KidsWorld</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <Sun className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Bell className="w-5 h-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback>{username?.[0] ?? "?"}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                            <div className="font-medium">{username ?? "Carregando..."}</div>
                            <div className="text-gray-500 text-xs">Shop Admin</div>
                        </div>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
