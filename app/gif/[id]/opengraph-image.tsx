import { ImageResponse } from 'next/og';
import { getGiphyGIFById, convertGiphyToGIF } from '@/lib/giphy-api';

export const runtime = 'edge';
export const alt = 'GIF - Download & Copy';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const giphyGIF = await getGiphyGIFById(id);

  if (!giphyGIF) {
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
          <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 10 }}>
            GIF Not Found
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }

  const gif = convertGiphyToGIF(giphyGIF);
  const cleanTitle = (gif.title || "GIF").replace(/GIF|gif/g, "").trim() || "GIF";

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
          position: 'relative',
        }}
      >
        <div style={{ fontSize: 100, marginBottom: 20 }}>🎬</div>
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', maxWidth: '1000px' }}>
          {cleanTitle} GIF
        </div>
        <div style={{ fontSize: 36, opacity: 0.9, marginBottom: 20 }}>
          Download & Copy Free
        </div>
        <div style={{ fontSize: 28, marginTop: 30, opacity: 0.8 }}>
          High Quality • Original Format
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
