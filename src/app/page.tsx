import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <div className="grid min-h-dvh grid-cols-1 grid-rows-[auto_1fr]">
                <header className="flex items-center justify-between gap-4 p-4">
                    <div className="flex items-center gap-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="24"
                            viewBox="0 0 240 240"
                            className="size-8"
                        >
                            <path d="M87.78 88.28q63.42.52 63.44 63.44M19.5 220V59 M219.5 20v161" />
                            <circle cx="59.5" cy="60" r="40" />
                            <circle cx="179.5" cy="180" r="40" />
                        </svg>
                        <p className="text-2xl font-bold">เนิร์ดโอเวอร์</p>
                    </div>
                    <nav>
                        <ul className="flex items-center gap-2">
                            <li>
                                <Link href="contents">บทเรียน</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
                        <h1 className="text-center text-4xl leading-tight font-black">
                            อยากจะเรียน
                            <br />
                            เรียนให้เนิร์ด
                            <br />
                            เนิร์ดให้โอเวอร์
                        </h1>
                        <Image
                            src="/images/boy-reading-book.png"
                            alt="boy-reading-book"
                            className="object-contain"
                            width="288"
                            height="288"
                            priority
                        />
                    </div>
                </main>
            </div>
        </>
    );
}
