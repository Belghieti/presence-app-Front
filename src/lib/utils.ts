export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleString();
  } catch {
    return dateString;
  }
}

export function getErrorMessage(err: any): string {
  if (!err) return 'Une erreur est survenue';
  if (err.response?.data?.message) return err.response.data.message;
  if (err.message) return err.message;
  return String(err);
}

export default { formatDate, getErrorMessage };
