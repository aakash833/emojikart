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
  const category = emojiData.categories.find((cat) => cat.slug === slug);
  
  if (!category) {
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
            Category Not Found
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }

  const emojiCount = category.emojis.length;
  const sampleEmojis = category.emojis.slice(0, 5).map((e) => e.emoji).join(' ');

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
        <div style={{ fontSize: 80, marginBottom: 30 }}>
          {sampleEmojis}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          {category.name} Emojis
        </div>
        <div
          style={{
            fontSize: 36,
            opacity: 0.9,
            marginBottom: 20,
          }}
        >
          {emojiCount}+ Emojis Available
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.8,
          }}
        >
          Click to Copy • Free • No Registration
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
