type EventPayload = Record<string, unknown>;

export const logEvent = (name: string, payload: EventPayload) => {
  // Step1: console logging only (mock analytics)
  // eslint-disable-next-line no-console
  console.info(`[event] ${name}`, payload);
};
