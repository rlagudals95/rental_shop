import { Suspense } from "react";

import { ResultClient } from "./result-client";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function FunnelResultPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const sessionId = typeof resolved.sessionId === "string" ? resolved.sessionId : null;

  return (
    <Suspense fallback={<main className="mx-auto max-w-3xl px-4 py-8">로딩 중...</main>}>
      <ResultClient sessionId={sessionId} />
    </Suspense>
  );
}
