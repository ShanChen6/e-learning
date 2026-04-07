import React from 'react'
import { Button, Input, Badge, Card } from '../components/atoms'

export default function Home() {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <section>
        <h2>Buttons</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      <section>
        <h2>Form</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Input placeholder="Enter name" />
          <Button variant="primary">Submit</Button>
        </div>
      </section>

      <section>
        <h2>Badge & Card</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Badge variant="success">Active</Badge>
          <Badge variant="error">Error</Badge>
          <Card>
            <div style={{ minWidth: 240 }}>Example card content</div>
          </Card>
        </div>
      </section>
    </main>
  )
}
