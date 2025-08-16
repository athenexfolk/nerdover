import Image from 'next/image';
import Link from 'next/link';

import RecommendedLessonList from '@/components/RecommendedLessonList';
import SearchBox from '@/components/SearchBox';
import StaticLogo from '@/components/StaticLogo';
import { contentMenu } from '@/menus/menu';

export default function Home() {
    return (
        <div>
            <HeaderSection />
            <LandingSection />
            <RecommendedLessonList />
        </div>
    );
}

const HeaderSection = () => (
    <header className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-4">
            <StaticLogo />
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
);

const LandingSection = () => (
    <div className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center gap-4 p-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <h1 className="text-center text-4xl leading-tight font-black md:text-right">
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
                width="192"
                height="192"
                priority
            />
        </div>
        <SearchBox anchors={contentMenu} />
    </div>
);
