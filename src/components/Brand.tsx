import Link from 'next/link';

import StaticLogo from './StaticLogo';

type BrandProps = {
    withText?: boolean;
    withLogo?: boolean;
    className?: string;
};

export default function Brand({
    withText = true,
    withLogo = true,
    className = '',
}: BrandProps) {
    return (
        <Link href="/" className={`flex items-center gap-4 ${className}`}>
            {withLogo && <StaticLogo />}
            {withText && <p className="text-2xl font-bold">เนิร์ดโอเวอร์</p>}
        </Link>
    );
}
