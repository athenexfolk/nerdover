import { ImageResponse } from 'next/og';

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function GET() {
    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ffffff',
                color: '#0f172a',
                fontSize: 72,
                fontWeight: 800,
                letterSpacing: -2,
                fontFamily: 'system-ui, Segoe UI, Arial',
            }}
        >
            เนิร์ดโอเวอร์
        </div>,
        {
            width: size.width,
            height: size.height,
        },
    );
}
