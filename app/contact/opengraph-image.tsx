import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Contact Us - Get in Touch';
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
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, -apple-system',
        }}
      >
        <div style={{ fontSize: 100, marginBottom: 20 }}>📧</div>
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 10 }}>
          Contact Us
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>
          Get in Touch
        </div>
        <div style={{ fontSize: 28, marginTop: 30, opacity: 0.8 }}>
          Questions • Feedback • Support
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
