import { SidebarProvider } from '@/components/ui/sidebar';

import ContentHeader from './ContentHeader';
import ContentSidebar from './ContentSidebar';

export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <ContentSidebar />
            <main className="grow">
                <ContentHeader />
                {children}
            </main>
        </SidebarProvider>
    );
}
