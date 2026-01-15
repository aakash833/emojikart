import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Terms and Conditions';
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
          background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
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
        <div style={{ fontSize: 100, marginBottom: 20 }}>📄</div>
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 10 }}>
          Terms and Conditions
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>
          Terms of Service
        </div>
        <div style={{ fontSize: 28, marginTop: 30, opacity: 0.8 }}>
          Read Our Terms of Use
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
