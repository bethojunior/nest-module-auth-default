export function istanceError(error: any) {
  return error instanceof Error ? error : new Error(String(error));
}
