import { Anchor } from '@/core/interfaces/anchor';
import { mathAnchor } from '@/menus/math.index';
import Image from 'next/image';
import Link from 'next/link';

const RECOMMENDED_LESSONS: Anchor[] =
    mathAnchor.children?.map<Anchor>((item) => {
        return {
            ...item,
            slug: `${mathAnchor.slug}/${item.slug}`,
        };
    }) ?? [];

export default function RecommendedLessonList() {
    return (
        <>
            <div className="p-4">
                <h2 className="text-lg font-semibold">บทเรียนแนะนำ</h2>
                <div className="hide-scrollbar -mx-4 flex flex-nowrap gap-4 overflow-x-auto p-4">
                    {RECOMMENDED_LESSONS.map((lesson) => (
                        <Link
                            key={lesson.slug}
                            href={`/contents/${lesson.slug}`}
                            className="relative shrink-0 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md"
                        >
                            <div className="relative aspect-video w-64 overflow-hidden rounded-xl">
                                <Image
                                    src={`/images/contents/${lesson.slug}/_cover_.webp`}
                                    alt={lesson.title}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    fill
                                    className="object-cover object-center"
                                    priority
                                />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl bg-black/30">
                                <p className="font-semibold text-white drop-shadow">
                                    {lesson.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
