declare module '@analogjs/vite-plugin-angular' {
  import type { PluginOption } from 'vite'

  const angular: (options?: unknown) => PluginOption
  export default angular
}

