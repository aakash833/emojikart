import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Trending GIFs 2025 - Download Most Popular & Viral GIFs';
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
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
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
        <div style={{ fontSize: 100, marginBottom: 20 }}>🔥</div>
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 10 }}>
          Trending GIFs 2025
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>
          Most Popular & Viral GIFs
        </div>
        <div style={{ fontSize: 28, marginTop: 30, opacity: 0.8 }}>
          Updated Daily • Download in High Quality
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
