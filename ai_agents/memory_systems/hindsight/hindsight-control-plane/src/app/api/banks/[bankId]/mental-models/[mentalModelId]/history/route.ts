import { NextResponse } from "next/server";
import { DATAPLANE_URL, getDataplaneHeaders } from "@/lib/hindsight-client";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ bankId: string; mentalModelId: string }> }
) {
  try {
    const { bankId, mentalModelId } = await params;

    if (!bankId || !mentalModelId) {
      return NextResponse.json(
        { error: "bank_id and mental_model_id are required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${DATAPLANE_URL}/v1/default/banks/${bankId}/mental-models/${mentalModelId}/history`,
      { method: "GET", headers: getDataplaneHeaders() }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Mental model not found" }, { status: 404 });
      }
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching mental model history:", error);
    return NextResponse.json({ error: "Failed to fetch mental model history" }, { status: 500 });
  }
}
