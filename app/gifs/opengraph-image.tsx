import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GIF Finder - Search, Download & Find GIFs Online Free';
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
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
        <div style={{ fontSize: 100, marginBottom: 20 }}>🎬</div>
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 10 }}>
          GIF Finder
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>
          Search, Download & Find GIFs Online
        </div>
        <div style={{ fontSize: 28, marginTop: 30, opacity: 0.8 }}>
          Free • High Quality Downloads • Millions of GIFs
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
