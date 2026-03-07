import Link from "next/link";

export default function FunnelCompletePage() {
  return (
    <main className="mx-auto min-h-screen max-w-xl px-4 py-12 text-center">
      <h1 className="text-2xl font-bold">상담 신청이 접수됐어요</h1>
      <p className="mt-3 text-sm text-black/70">
        비교 결과와 함께 상담팀에 전달했어요. 요청하신 시간대에 연락드릴게요.
      </p>
      <div className="mt-6 flex justify-center gap-2">
        <Link href="/" className="rounded-lg border border-black/20 px-4 py-2 text-sm">
          홈으로
        </Link>
        <Link href="/admin/mock-leads" className="rounded-lg bg-black px-4 py-2 text-sm text-white">
          접수 내역 보기
        </Link>
      </div>
    </main>
  );
}
