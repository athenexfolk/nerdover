export default function Loading() {
    return (
        <div className="flex h-dvh flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="size-24 rounded-full shadow-xl">
                <div className="size-24 animate-spin rounded-full bg-gradient-to-b from-yellow-500 to-purple-700"></div>
            </div>
            <span>Loading content...</span>
        </div>
    );
}
