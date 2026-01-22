import AppSidebar from "./components/Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar>
                {children}
            </AppSidebar>
        </SidebarProvider>
    )
}
