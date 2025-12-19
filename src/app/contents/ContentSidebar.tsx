'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Anchor } from '@/core/interfaces/anchor';
import { contentMenu } from '@/menus/menu';
import { ChevronRight, HomeIcon } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import Brand from '@/components/Brand';

const MAIN_MENU = [
    { title: 'หน้าหลัก', href: '/', icon: <HomeIcon /> },
    // { title: 'แอปพลิเคชัน', href: '/apps', icon: <AppsIcon /> },
];

export default function ContentSidebar(
    props: React.ComponentProps<typeof Sidebar>,
) {
    const [menu] = useState<Anchor[]>(contentMenu);

    return (
        <Sidebar
            {...props}
            transitionDuration={500}
            transitionTimingFunction="ease-in-out"
        >
            <SidebarHeader className="p-4">
                <Brand withText={false} className="mx-auto" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {MAIN_MENU.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.href}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarMenu>
                        <MenuManipulator anchors={menu} isSub={false} />
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}

function MenuManipulator({
    anchors,
    isSub = true,
}: {
    anchors?: Anchor[];
    isSub?: boolean;
}) {
    const pathname = usePathname();

    if (!anchors) return null;
    return anchors.map((node, index) =>
        node.type === 'item' ? (
            isSub ? (
                <SidebarMenuSubItem key={node.slug}>
                    <SidebarMenuButton asChild>
                        <Link
                            href={`/contents/${node.fullSlug}`}
                            className={`${pathname === `/contents/${node.fullSlug}` ? 'font-bold text-purple-500' : ''} h-auto px-2 py-1`}
                        >
                            {node.title}
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuSubItem>
            ) : (
                <SidebarMenuItem key={node.slug}>
                    <SidebarMenuButton asChild>
                        <Link
                            href={`/contents/${node.fullSlug}`}
                            className={`${pathname === `/contents/${node.fullSlug}` ? 'font-bold text-purple-500' : ''} h-auto px-2 py-1`}
                        >
                            {node.title}
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            )
        ) : isSub ? (
            <SidebarMenuSubItem key={node.slug}>
                <Collapsible className="group/collapsible">
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                            <span className="font-semibold">{node.title}</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub className="m-0 ml-1 p-0 pl-1">
                            <MenuManipulator anchors={node.children} isSub />
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>
            </SidebarMenuSubItem>
        ) : (
            <SidebarMenuItem key={node.slug}>
                <Collapsible
                    defaultOpen={index === 0}
                    className="group/collapsible"
                >
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                            <span className="font-semibold">{node.title}</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub className="m-0 ml-1 p-0 pl-1">
                            <MenuManipulator anchors={node.children} isSub />
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>
            </SidebarMenuItem>
        ),
    );
}
