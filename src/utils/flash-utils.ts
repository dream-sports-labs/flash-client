export const getErrorDetails = (e: unknown): string => {
  return e && Object.keys(e).length > 0
    ? JSON.stringify(e)
    : 'Error object is empty or contains no useful information'
}
