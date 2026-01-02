declare global {
  interface Window {
    electron: Record<string, unknown>
    api: {
      ping: () => string
    }
  }
}
