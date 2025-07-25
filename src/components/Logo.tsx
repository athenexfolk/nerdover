interface LogoProps {
    viewBox?: [number, number, number, number];
    variant?: 'default';
}

export default function Logo({
    viewBox = [0, 0, 240, 240],
    variant = 'default',
}: LogoProps) {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="20"
                viewBox={viewBox.join(' ')}
                className={variant === 'default' ? 'size-8' : ''}
            >
                <path id="n-start" d="M20 220V60" />

                {/* 4 Quarter of <circle id="n-circle-top" cx="60" cy="60" r="40" /> */}
                <path className="arc arc-tr" d="M60 20 A40 40 0 0 1 100 60" />
                <path className="arc arc-br" d="M100 60 A40 40 0 0 1 60 100" />
                <path className="arc arc-bl" d="M60 100 A40 40 0 0 1 20 60" />
                <path className="arc arc-tl" d="M20 60 A40 40 0 0 1 60 20" />

                <path id="n-arc-center" d="M90 90q60.60.60 60 60" />

                {/* 4 Quarter of<circle id="n-circle-bottom" cx="180" cy="180" r="40" /> */}
                <path
                    className="arc arc-tr"
                    d="M180 140 A40 40 0 0 1 220 180"
                />
                <path
                    className="arc arc-br"
                    d="M220 180 A40 40 0 0 1 180 220"
                />
                <path
                    className="arc arc-bl"
                    d="M180 220 A40 40 0 0 1 140 180"
                />
                <path
                    className="arc arc-tl"
                    d="M140 180 A40 40 0 0 1 180 140"
                />
                <path id="n-end" d="M220 20V180" />
            </svg>
            <style>{`
                .arc {
                    transition: transform 0.8s cubic-bezier(.68,-0.55,.27,1.55);
                }
                .arc-tr { transform: translate(20px, -20px); }
                .arc-br { transform: translate(20px, 20px); }
                .arc-bl { transform: translate(-20px, 20px); }
                .arc-tl { transform: translate(-20px, -20px); }
                .svg-combine .arc-tr { transform: translate(0, 0); }
                .svg-combine .arc-br { transform: translate(0, 0); }
                .svg-combine .arc-bl { transform: translate(0, 0); }
                .svg-combine .arc-tl { transform: translate(0, 0); }
            `}</style>
        </>
    );
}
