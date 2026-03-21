import { NextResponse } from "next/server";

/** AdSense ads.txt — served as route so crawlers always get text/plain at /ads.txt */
const ADS_TXT = `google.com, pub-4360932072488893, DIRECT, f08c47fec0942fa0
`;

export async function GET() {
  return new NextResponse(ADS_TXT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
