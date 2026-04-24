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
    id: 'project-1',
    title: 'Your Engineering Project',
    description: 'Brief description of what this project does and why it matters.',
    outcome: 'Replace with actual outcome - e.g., "Reduced deployment time by 40%" or "Used by 2k+ users"',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/yourusername/project',
      live: 'https://project-demo.com'
    },
    featured: true
  },
  {
    id: 'project-2',
    title: 'Another Project',
    description: 'Another brief description of a meaningful project.',
    outcome: 'Quantified impact or result',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    links: {
      github: 'https://github.com/yourusername/project2'
    }
  },
  // Add more projects as needed
]