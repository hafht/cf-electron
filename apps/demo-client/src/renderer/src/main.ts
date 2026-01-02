import { bootstrapApplication } from '@angular/platform-browser'
import 'zone.js'
import './styles.css'
import { AppComponent } from './app/app.component'

bootstrapApplication(AppComponent).catch((error) => {
  console.error('Failed to bootstrap Angular renderer', error)
})

