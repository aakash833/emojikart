"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getGIFsByCategory, gifCategories } from "@/lib/gif-data";
import { ArrowRight, Heart, Smile, PartyPopper, Cat, Laugh, Trophy, Hand, Gamepad2, Utensils, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ReactNode> = {
  Reactions: <Hand className="w-6 h-6" />,
  Emotions: <Smile className="w-6 h-6" />,
  Celebrations: <PartyPopper className="w-6 h-6" />,
  Animals: <Cat className="w-6 h-6" />,
  Memes: <Laugh className="w-6 h-6" />,
  Funny: <Laugh className="w-6 h-6" />,
  Love: <Heart className="w-6 h-6" />,
  Success: <Trophy className="w-6 h-6" />,
  Greetings: <Hand className="w-6 h-6" />,
  Sports: <Gamepad2 className="w-6 h-6" />,
  Food: <Utensils className="w-6 h-6" />,
  Travel: <Plane className="w-6 h-6" />,
};

const categoryColors: Record<string, string> = {
  Reactions: "text-blue-500",
  Emotions: "text-purple-500",
  Celebrations: "text-yellow-500",
  Animals: "text-green-500",
  Memes: "text-pink-500",
  Funny: "text-orange-500",
  Love: "text-red-500",
  Success: "text-indigo-500",
  Greetings: "text-cyan-500",
  Sports: "text-blue-600",
  Food: "text-amber-500",
  Travel: "text-teal-500",
};

export function GifCategoriesClient() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* SEO Content Section */}
        <div className="mb-8 prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">GIF Categories - Browse GIFs by Category</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Browse our extensive collection of GIFs organized by <strong>category</strong>. Whether you're looking for 
            <strong> reaction GIFs</strong>, <strong>funny GIFs</strong>, <strong>meme GIFs</strong>, <strong>celebration GIFs</strong>, 
            <strong> animal GIFs</strong>, <strong>love GIFs</strong>, or any other type of GIF, our category browser makes it easy 
            to find exactly what you need. <strong>Download GIFs in high quality</strong> or copy GIF URLs instantly. Each category contains 
            hundreds of carefully organized GIFs, making it simple to discover the perfect GIF for any situation or emotion.
          </p>
          <div className="bg-card border rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-3">Popular GIF Categories</h2>
            <p className="text-muted-foreground mb-4">
              Our GIF categories are designed to help you quickly find the perfect GIF for any occasion. 
              From reactions and emotions to celebrations and memes, browse by category to discover GIFs that match your needs.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Reactions & Emotions</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Reaction GIFs - Express your reactions instantly</li>
                  <li>Emotion GIFs - Show how you feel</li>
                  <li>Celebration GIFs - Celebrate special moments</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Entertainment & Fun</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Funny GIFs - Make people laugh</li>
                  <li>Meme GIFs - Popular internet memes</li>
                  <li>Animal GIFs - Cute and funny animals</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Social & Communication</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Love GIFs - Express love and affection</li>
                  <li>Greeting GIFs - Say hello in style</li>
                  <li>Success GIFs - Celebrate achievements</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Lifestyle & Interests</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Sports GIFs - Sports and fitness</li>
                  <li>Food GIFs - Delicious food animations</li>
                  <li>Travel GIFs - Travel and adventure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gifCategories.map((category) => {
            const gifs = getGIFsByCategory(category);
            const icon = categoryIcons[category] || <Smile className="w-6 h-6" />;
            const color = categoryColors[category] || "text-indigo-500";

            return (
              <Link
                key={category}
                href={`/gifs?category=${encodeURIComponent(category)}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader>
                    <div className={cn("mb-2", color)}>{icon}</div>
                    <CardTitle className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {category}
                    </CardTitle>
                    <CardDescription>
                      {gifs.length} GIF{gifs.length !== 1 ? "s" : ""} available
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium group-hover:gap-3 transition-all">
                      Browse {category} GIFs <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
