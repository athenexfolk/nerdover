import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex h-dvh flex-col items-center justify-center gap-2">
            <h1 className="text-7xl font-black">404</h1>
            <Image
                src="/images/not-found-book.png"
                width="288"
                height="288"
                alt="not found book"
            />
            <p className="text-lg">โอ๊ะ! ดูเหมือนว่าคุณจะหลงทาง</p>
            <Link
                href="/"
                className="block rounded-full border px-4 py-2 hover:bg-stone-100"
            >
                กลับหน้าหลัก
            </Link>
        </div>
    );
}
