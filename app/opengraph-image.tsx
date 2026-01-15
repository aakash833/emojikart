import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Emoji Keyboard Online - Click to Copy Emoji';
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        <div style={{ fontSize: 120, marginBottom: 20 }}>😊</div>
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 10 }}>
          Emoji Keyboard Online
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>
          Click to Copy 🔥 Emoji
        </div>
        <div style={{ fontSize: 28, marginTop: 30, opacity: 0.8 }}>
          Free • No Registration • Thousands of Emojis
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
