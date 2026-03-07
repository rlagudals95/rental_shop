export type ApiMeta = {
  requestId: string;
  timestamp: string;
};

const createMeta = (): ApiMeta => ({
  requestId: `req_${Math.random().toString(36).slice(2, 10)}`,
  timestamp: new Date().toISOString(),
});

export const ok = <T>(data: T) => ({ ok: true as const, data, meta: createMeta() });

export const fail = (
  code: string,
  message: string,
  retryable: boolean,
  details?: Array<Record<string, unknown>>,
) => ({
  ok: false as const,
  error: { code, message, retryable, details },
  meta: createMeta(),
});
