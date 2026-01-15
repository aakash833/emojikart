import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Privacy Policy - Your Privacy Matters';
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
        <div style={{ fontSize: 100, marginBottom: 20 }}>🔒</div>
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 10 }}>
          Privacy Policy
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>
          Your Privacy Matters
        </div>
        <div style={{ fontSize: 28, marginTop: 30, opacity: 0.8 }}>
          Transparent • Secure • Respectful
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
