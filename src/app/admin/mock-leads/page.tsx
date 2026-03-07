"use client";

import { useEffect, useState } from "react";

type Lead = {
  leadId: string;
  status: string;
  sessionId: string;
  selectedProductId: string;
  phone: string;
  lastSubmittedAt: string;
};

type LeadsResponse = {
  ok: true;
  data: {
    leads: Lead[];
  };
};

export default function MockLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/leads");
      const json = (await response.json()) as LeadsResponse;
      if (json.ok) {
        setLeads(json.data.leads);
      }
    };

    void load();
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Mock Leads</h1>
      <p className="mt-1 text-sm text-black/60">최신 제출순으로 보여줘요.</p>

      <div className="mt-4 overflow-hidden rounded-xl border border-black/10 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-black/[0.03] text-left">
            <tr>
              <th className="px-3 py-2">Lead ID</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.leadId} className="border-t border-black/10">
                <td className="px-3 py-2">{lead.leadId}</td>
                <td className="px-3 py-2">{lead.status}</td>
                <td className="px-3 py-2">{lead.selectedProductId}</td>
                <td className="px-3 py-2">{lead.phone}</td>
                <td className="px-3 py-2">
                  {new Date(lead.lastSubmittedAt).toLocaleString("ko-KR")}
                </td>
              </tr>
            ))}
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-black/50">
                  아직 접수된 리드가 없습니다.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  );
}
