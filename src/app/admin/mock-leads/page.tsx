"use client";

import { useEffect, useState } from "react";

type MockLead = {
  applyId: string;
  submittedAt: string;
  name: string;
  phone: string;
  product: string;
  area?: string;
};

export default function MockLeadsPage() {
  const [items, setItems] = useState<MockLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const response = await fetch("/api/mock/leads", { cache: "no-store" });
        if (!response.ok) throw new Error("failed");
        const json = (await response.json()) as { items: MockLead[] };
        if (mounted) {
          setItems(json.items);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void load();
    const timer = setInterval(load, 4000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f5f7] px-4 py-6 text-[#111]">
      <div className="mx-auto w-full max-w-[760px] rounded-2xl bg-white p-5">
        <h1 className="text-lg font-extrabold">Mock 상담 리드</h1>
        <p className="mt-1 text-xs text-black/50">/api/mock/apply 로 접수된 데이터</p>

        {loading ? <p className="mt-4 text-sm text-black/60">불러오는 중...</p> : null}

        <div className="mt-4 space-y-2">
          {items.length === 0 && !loading ? (
            <p className="rounded-xl bg-[#f7f8fa] p-4 text-sm text-black/60">아직 접수 없음</p>
          ) : null}

          {items.map((lead) => (
            <div key={lead.applyId} className="rounded-xl border border-black/10 p-4 text-sm">
              <p className="font-semibold">
                {lead.name} · {lead.phone}
              </p>
              <p className="mt-1 text-black/60">상품: {lead.product}</p>
              {lead.area ? <p className="text-black/60">지역: {lead.area}</p> : null}
              <p className="mt-1 text-xs text-black/40">
                {new Date(lead.submittedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
