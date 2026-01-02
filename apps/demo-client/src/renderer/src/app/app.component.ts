import { Component, VERSION } from '@angular/core'
import { ProjectComponent } from './project.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectComponent],
  template: `
    <main class="app-shell">
      <header class="hero">
        <div>
          <p class="eyebrow">Electron + Angular</p>
          <h1>Renderer đang chạy</h1>
          <p class="lede">
            Angular {{ version }} · chỉnh file trong <code>src/renderer/src/app</code> để
            thử HMR. Sửa template hoặc styles và quan sát cập nhật nóng.
          </p>
          <div class="badges">
            <span class="badge success">Dev server: 5173</span>
            <span class="badge">Electron preload/main đã build</span>
          </div>
        </div>
      </header>

      <section class="grid">
        <article class="card">
          <h2>Trạng thái</h2>
          <ul>
            <li>Angular {{ version }} (standalone)</li>
            <li>HMR qua Vite + @analogjs/vite-plugin-angular</li>
            <li>Electron-Vite dev: main/preload/renderer</li>
          </ul>
        </article>

        <article class="card">
          <h2>HMR Demo</h2>
          <app-project />
        </article>
      </section>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          sans-serif;
        color: #e6e6e6;
        background: #0f1115;
        min-height: 100vh;
      }
      .app-shell {
        padding: 2.5rem;
        max-width: 1100px;
        margin: 0 auto;
      }
      .hero {
        padding: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        background: radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15), transparent 40%),
          radial-gradient(circle at 80% 0%, rgba(16, 185, 129, 0.12), transparent 35%),
          rgba(255, 255, 255, 0.03);
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
      }
      .eyebrow {
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-size: 0.8rem;
        color: #c7c9d1;
        margin: 0 0 0.4rem;
      }
      h1 {
        font-size: 2.2rem;
        margin: 0 0 0.6rem;
      }
      .lede {
        line-height: 1.6;
        color: #c7c9d1;
        margin: 0 0 1rem;
      }
      code {
        background: rgba(255, 255, 255, 0.06);
        padding: 0.15rem 0.35rem;
        border-radius: 4px;
        color: #f0f0f0;
      }
      .badges {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.35rem 0.65rem;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.06);
        color: #dfe2ea;
        font-size: 0.85rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      .badge.success {
        background: rgba(16, 185, 129, 0.12);
        border-color: rgba(16, 185, 129, 0.35);
        color: #9cf0c9;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
        margin-top: 1.25rem;
      }
      .card {
        padding: 1.25rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.03);
      }
      .card h2 {
        margin: 0 0 0.5rem;
        font-size: 1.2rem;
      }
      .card ul {
        margin: 0;
        padding-left: 1.1rem;
        color: #c7c9d1;
        line-height: 1.6;
      }
    `
  ]
})
export class AppComponent {
  version = VERSION.full
  ngOnInit(): void {
    console.log('AppComponent ngOnInit')
  }
  ngOnDestroy(): void {
    console.log('AppComponent ngOnDestroy')
  }
}

