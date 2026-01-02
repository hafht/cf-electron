import { Component } from '@angular/core'

@Component({
  selector: 'app-project',
  standalone: true,
  template: `
    <section class="project-card">
      <h2>HMR Test Component</h2>
      <p>{{ text }}</p>
    </section>
  `,
  styles: [
    `
      .project-card {
        padding: 1rem 1.25rem;
        margin-top: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.04);
      }
      h2 {
        margin: 0 0 0.5rem;
        font-size: 1.2rem;
      }
      p {
        margin: 0;
        color: #d7d9e0;
      }
    `
  ]
})
export class ProjectComponent {
    text = 'Hehehe 2 2'
    ngOnInit(): void {
        console.log('ProjectComponent ngOnInit')
    }
    ngOnDestroy(): void {
        console.log('ProjectComponent ngOnDestroy')
    }
}

