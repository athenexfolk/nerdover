import { contentMenu } from '@/utils/content-menu';
import Link from 'next/link';

export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <aside className="fixed top-0 left-0 flex h-dvh w-64 flex-col gap-8 p-4">
                <div>เนิร์ดโอเวอร์</div>
                <nav>
                    <ul className="flex flex-col gap-4">
                        {contentMenu.map((category) => (
                            <li key={category.slug}>
                                <div className="mb-2 flex items-center gap-2">
                                    <div className="grow border-t"></div>
                                    <p className="shrink-0 text-xs">
                                        {category.title}
                                    </p>
                                    <div className="grow border-t"></div>
                                </div>
                                <ul className="flex flex-col text-sm">
                                    {category.lessons?.map((item) => (
                                        <li
                                            key={item.slug}
                                            className="flex flex-col"
                                        >
                                            <Link
                                                href={`/contents/${category.slug}/${item.slug}`}
                                                className="rounded px-4 py-2 hover:bg-stone-50"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className="p-4 pl-64">{children}</main>
        </>
    );
}
