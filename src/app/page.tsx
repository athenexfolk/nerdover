import Image from 'next/image';
import Link from 'next/link';

import Brand from '@/components/Brand';
import RecommendedLessonList from '@/components/RecommendedLessonList';
import SearchBox from '@/components/SearchBox';
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
        <Brand />
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
    <div className="flex flex-col items-center justify-center gap-4 p-4">
        <div className="flex flex-col items-center gap-4">
            <Image
                src="/images/graduated-boy-under-the-tree.webp"
                alt="A graduated boy under the tree"
                className="object-contain dark:invert"
                width="288"
                height="288"
                priority
            />
            <h1 className="text-center text-6xl font-bold">เนิร์ดโอเวอร์</h1>
            <h2 className="flex items-center gap-2 text-center text-2xl font-semibold">
                อยากจะเรียน เรียนให้เนิร์ด เนิร์ดให้โอเวอร์
            </h2>
        </div>
        <SearchBox anchors={contentMenu} />
    </div>
);
