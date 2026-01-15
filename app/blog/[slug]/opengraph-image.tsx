import { ImageResponse } from 'next/og';
import { getBlogPost } from '@/lib/blog-data';

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
  const post = getBlogPost(slug);

  if (!post) {
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
          <div style={{ fontSize: 64, fontWeight: 'bold' }}>
            Blog Post Not Found
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
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1a1a1a',
          fontFamily: 'system-ui, -apple-system',
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 100, marginBottom: 30 }}>📝</div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '1000px',
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            fontSize: 32,
            opacity: 0.8,
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          {post.description}
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: 40,
            opacity: 0.7,
            display: 'flex',
            gap: 20,
          }}
        >
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
