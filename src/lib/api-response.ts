export type ApiMeta = {
  requestId: string;
  timestamp: string;
};

export type ApiSuccess<T> = {
  ok: true;
  data: T;
  meta: ApiMeta;
};

export type ApiFailure = {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: Array<Record<string, unknown>>;
    retryable: boolean;
  };
  meta: ApiMeta;
};

const createRequestId = () => `req_${Math.random().toString(36).slice(2, 10)}`;

const createMeta = (): ApiMeta => ({
  requestId: createRequestId(),
  timestamp: new Date().toISOString(),
});

export const ok = <T>(data: T): ApiSuccess<T> => ({
  ok: true,
  data,
  meta: createMeta(),
});

export const fail = (
  code: string,
  message: string,
  retryable: boolean,
  details?: Array<Record<string, unknown>>,
): ApiFailure => ({
  ok: false,
  error: {
    code,
    message,
    details,
    retryable,
  },
  meta: createMeta(),
});
