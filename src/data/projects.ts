export interface Project {
  id: string
  title: string
  description: string
  outcome?: string
  technologies: string[]
  links: {
    github?: string
    live?: string
    demo?: string
  }
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'oncall-health',
    title: 'on-call health',
    description: 'an open-source tool that analyzes on-call signals to surface burnout risk before it becomes a problem. i lead engineering on it.',
    outcome: 'rootly ai labs · 2025',
    technologies: ['Python', 'React', 'PostgreSQL'],
    links: {
      github: 'https://github.com/rootly-ai-labs/oncall-health'
    },
    featured: true
  },
  {
    id: 'mcp-server',
    title: 'rootly mcp server',
    description: 'a model context protocol server that lets ai tools triage incidents from inside your editor.',
    outcome: 'rootly ai labs · 2025',
    technologies: ['TypeScript', 'Node.js', 'Claude MCP'],
    links: {
      github: 'https://github.com/rootly/rootly-mcp-server'
    }
  },
  {
    id: 'rivian-map',
    title: 'rivian connectivity map',
    description: 'real-time vehicle connectivity visualization for internal teams. helped product and engineering understand fleet patterns.',
    outcome: 'rivian automotive · 2024',
    technologies: ['React', 'D3.js', 'WebSocket'],
    links: {}
  },
  {
    id: 'docker-monetization',
    title: 'docker hub monetization',
    description: 'billing and subscription infrastructure that powers docker hub pro and team plans. scaled to handle millions of users.',
    outcome: 'docker inc · 2023',
    technologies: ['Go', 'PostgreSQL', 'Stripe'],
    links: {}
  }
]