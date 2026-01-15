"use client";

import Link from "next/link";
import { blogPosts, getRecentPosts } from "@/lib/blog-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

export function BlogPageClient() {
  const recentPosts = getRecentPosts(8);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-indigo-500" />
          Emoji Blog
        </h1>
        <p className="text-muted-foreground text-lg">
          Expert guides, tips, and insights about emojis and digital communication
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md text-xs font-medium">
                    {post.category}
                  </span>
                  {post.featured && (
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-md text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <CardTitle className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm group-hover:gap-3 transition-all">
                  Read more <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
}
