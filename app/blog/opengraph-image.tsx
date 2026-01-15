import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Emoji Blog - Expert Guides & Tips About Emojis';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1a1a1a',
          fontFamily: 'system-ui, -apple-system',
        }}
      >
        <div style={{ fontSize: 100, marginBottom: 20 }}>📝</div>
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 10 }}>
          Emoji Blog
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>
          Expert Guides & Tips About Emojis
        </div>
        <div style={{ fontSize: 28, marginTop: 30, opacity: 0.8 }}>
          Learn • Discover • Master Digital Communication
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
