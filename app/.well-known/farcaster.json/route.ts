import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    version: "1",
    name: "Base Daily Post Generator",
    description: "Generate calm, educational daily posts for Base.",
    icon: "https://base-daily-post-generator.vercel.app/favicon.ico",
    home_url: "https://base-daily-post-generator.vercel.app",
    frame: {
      version: "vNext",
      image: "https://base-daily-post-generator.vercel.app",
      button: {
        title: "Launch app",
        action: {
          type: "launch_frame",
          name: "Base Daily Post Generator",
          url: "https://base-daily-post-generator.vercel.app",
        },
      },
    },
  });
}