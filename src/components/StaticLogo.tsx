export default function StaticLogo() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="20"
            viewBox="0 0 240 240"
            className="size-8"
        >
            <path id="n-start" d="M20 220V60" />
            <circle id="n-circle-top" cx="60" cy="60" r="40" />
            <path id="n-arc-center" d="M90 90q60.60.60 60 60" />
            <circle id="n-circle-bottom" cx="180" cy="180" r="40" />
            <path id="n-end" d="M220 20V180" />
        </svg>
    );
}
