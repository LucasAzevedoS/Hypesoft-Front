"use client"


import { SidebarSection } from "@/types/sidebar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"


const sidebarItems: SidebarSection[] = [
    {
        category: "GENERAL",
        items: [
            { name: "Dashboard", icon: "📊", active: true },
            { name: "Statistics", icon: "📈" },
        ],
    },
    {
        category: "SHOP",
        items: [
            { name: "My Shop", icon: "🏪" },
            { name: "Products", icon: "📦" },
            { name: "Customers", icon: "👥" },
            { name: "Invoice", icon: "🧾" },
            { name: "Messages", icon: "💬", badge: "4" },
        ],
    },
    {
        category: "SUPPORT",
        items: [
            { name: "Settings", icon: "⚙️" },
            { name: "Help", icon: "❓" },
        ],
    },
]

export function Sidebar() {
    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">

            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <span className="font-semibold text-lg">ShopSense</span>
                </div>
            </div>


            <div className="flex-1 p-4">
                {sidebarItems.map((section) => (
                    <div key={section.category} className="mb-6">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">{section.category}</h3>
                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <button
                                    key={item.name}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${item.active ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <span className="text-base">{item.icon}</span>
                                    <span className="flex-1 text-left">{item.name}</span>
                                    {item.badge && (
                                        <Badge variant="secondary" className="text-xs">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


            <div className="p-4 border-t border-gray-200">
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-600">⭐</span>
                        <span className="font-medium text-sm">Try ShopSense Pro</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                        Get Pro and enjoy 30+ features to enhance your sales. First 30 days trial.
                    </p>
                    <Button className="w-full" size="sm">
                        Upgrade Plan
                    </Button>
                </div>
            </div>
        </div>
    )
}
