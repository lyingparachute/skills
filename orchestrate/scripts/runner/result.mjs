export const ok = value => ({ ok: true, value })
export const fail = (error, kind = 'process') => ({ ok: false, error, kind })
