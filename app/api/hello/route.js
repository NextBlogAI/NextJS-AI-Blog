export const runtime = "edge";
import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "Hello, world!" });
}