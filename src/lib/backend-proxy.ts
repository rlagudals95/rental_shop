import { NextResponse } from "next/server";

type ProxyMethod = "GET" | "POST";

const getBaseUrl = () => process.env.BACKEND_API_BASE_URL?.replace(/\/$/, "") ?? "";

export const hasBackendProxy = () => Boolean(getBaseUrl());

export async function proxyToBackend(
  endpoint: string,
  method: ProxyMethod,
  body?: unknown,
): Promise<NextResponse> {
  const baseUrl = getBaseUrl();

  if (!baseUrl) {
    throw new Error("BACKEND_API_BASE_URL is not set");
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const json = (await response.json()) as unknown;
  return NextResponse.json(json, { status: response.status });
}
