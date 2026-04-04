import { NextResponse } from "next/server";
import { sdk, lowLevelClient } from "@/lib/hindsight-client";

export async function GET() {
  try {
    const response = await sdk.getVersion({
      client: lowLevelClient,
    });

    if (response.error) {
      console.error("API error getting version:", response.error);
      return NextResponse.json({ error: "Failed to get version" }, { status: 500 });
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error getting version:", error);
    return NextResponse.json({ error: "Failed to get version" }, { status: 500 });
  }
}
