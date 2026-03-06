export type MockLead = {
  applyId: string;
  submittedAt: string;
  name: string;
  phone: string;
  product: string;
  area?: string;
  date?: string;
  memo?: string;
};

type GlobalWithLeads = typeof globalThis & {
  __mockLeads?: MockLead[];
};

const g = globalThis as GlobalWithLeads;

if (!g.__mockLeads) {
  g.__mockLeads = [];
}

export const mockLeads = g.__mockLeads;
