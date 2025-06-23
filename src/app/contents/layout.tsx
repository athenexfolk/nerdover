import { contentMenu } from '@/menus/menu';
import Link from 'next/link';

export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <aside className="fixed top-0 left-0 flex h-dvh w-72 flex-col gap-8 overflow-auto p-4">
                <span className="text-2xl font-bold">เนิร์ดโอเวอร์</span>
                <nav>
                    {contentMenu.map((category) => (
                        <div key={category.slug}>
                            <div className="sticky -top-4 -mx-4 bg-white px-4 py-2 text-sm">
                                <p className="font-medium">{category.title}</p>
                            </div>
                            <ul className="flex flex-col text-sm">
                                {category.lessons?.map((item) => (
                                    <li
                                        key={item.slug}
                                        className="flex flex-col"
                                    >
                                        <Link
                                            href={`/contents/${category.slug}/${item.slug}`}
                                            className="rounded px-4 py-2 font-medium hover:bg-stone-800 hover:text-white"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>
            <main className="pl-72">{children}</main>
        </>
    );
}
