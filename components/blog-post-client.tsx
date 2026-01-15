"use client";

import Link from "next/link";
import { getBlogPost, blogPosts } from "@/lib/blog-data";
import { Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogContentRenderer } from "@/components/blog-content-renderer";

interface BlogPostClientProps {
  slug: string;
}

export function BlogPostClient({ slug }: BlogPostClientProps) {
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="w-full">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <Link href="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-6 cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md text-sm font-medium">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-md text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{post.description}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <BlogContentRenderer content={post.content} />
          </div>

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-muted rounded-md text-sm text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
