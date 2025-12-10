import ContentPageWrapper from '@/components/ContentPageWrapper';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { SidebarProvider } from '@/context/SidebarContext';

export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SidebarProvider>
                <Header />
                <Sidebar />
                <ContentPageWrapper>{children}</ContentPageWrapper>
            </SidebarProvider>
        </>
    );
}
