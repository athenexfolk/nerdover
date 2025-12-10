import Link from 'next/link';

import StaticLogo from './StaticLogo';

export default function Brand() {
    return (
        <Link href="/" className="flex items-center gap-4">
            <StaticLogo />
            <p className="text-2xl font-bold">เนิร์ดโอเวอร์</p>
        </Link>
    );
}
