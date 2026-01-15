import { ImageResponse } from 'next/og';
import { emojiData } from '@/lib/emoji-data';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Find emoji by slug
  let emoji = null;
  for (const category of emojiData.categories) {
    emoji = category.emojis.find((e) => e.slug === slug);
    if (emoji) break;
  }

  if (!emoji) {
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
          <div style={{ fontSize: 64, fontWeight: 'bold' }}>
            Emoji Not Found
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }

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
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 150, marginBottom: 40 }}>
          {emoji.emoji}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          {emoji.name}
        </div>
        <div
          style={{
            fontSize: 36,
            opacity: 0.9,
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Click to Copy Emoji
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.8,
          }}
        >
          Free • No Registration • Copy Instantly
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
