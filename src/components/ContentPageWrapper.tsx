import { useSidebar } from '@/context/SidebarContext';

export default function ContentPageWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isMenuOpen } = useSidebar();
    return (
        <div
            className={`pt-16 ${isMenuOpen ? 'md:ps-72' : 'md:ps-0'} transition-all duration-500`}
        >
            {children}
        </div>
    );
}
