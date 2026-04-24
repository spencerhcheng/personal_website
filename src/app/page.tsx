import { projects } from '@/data/projects'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Spencer Cheng</h1>
            <div className="flex space-x-6">
              <a href="#about" className="text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors">About</a>
              <a href="#projects" className="text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Projects</a>
              <a href="#gallery" className="text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Gallery</a>
              <a href="#contact" className="text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Spencer Cheng
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          software engineer in san francisco. i build things at rootly ai labs, and spend the rest of my time on two wheels or in the darkroom.
        </p>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-3xl space-y-5">
        <p className="text-xl font-medium leading-relaxed tracking-tight">
          i&#39;m a software engineer in san francisco. i build things at rootly ai labs, mostly around on-call and incident tooling.
        </p>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-400">
          off the clock i&#39;m usually on my bike, in the darkroom, or somewhere between. i like quiet craft — the kind where the work is better because you paid attention.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="space-y-8">
        <div className="flex items-center gap-4">
          <span className="text-sm font-mono text-gray-400">01</span>
          <h2 className="text-2xl font-bold lowercase">work</h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="group grid grid-cols-[20px_1fr_auto_30px] items-center gap-5 py-7 transition-all duration-200 hover:px-3 cursor-pointer"
            >
              {/* Color dot */}
              <div className={`w-3 h-3 rounded-full ${
                i === 0 ? 'bg-purple-500' :
                i === 1 ? 'bg-blue-900' :
                i === 2 ? 'bg-green-600' : 'bg-orange-500'
              }`} />

              {/* Content */}
              <div className="min-w-0">
                <h3 className="text-2xl font-bold tracking-tight leading-tight">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-1.5 max-w-2xl">
                  {project.description}
                </p>
              </div>

              {/* Meta */}
              <div className="text-right font-mono text-xs text-gray-500 whitespace-nowrap">
                <div>{project.outcome}</div>
              </div>

              {/* Arrow */}
              <span className="text-gray-400 text-xl transform rotate-[-45deg] transition-transform group-hover:translate-x-1.5 group-hover:rotate-[-45deg]">
                →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Art Gallery Placeholder */}
      <section id="gallery" className="space-y-8">
        <h2 className="text-3xl font-bold">Visual Art</h2>
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-12 text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Art gallery coming in Phase 2
          </p>
          <p className="text-sm text-gray-400">
            This section will showcase illustrations, paintings, and digital artwork
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="space-y-8 pt-16">
        <div className="flex items-center gap-4">
          <span className="text-sm font-mono text-gray-400">03</span>
          <h2 className="text-2xl font-bold lowercase">let&#39;s work together</h2>
        </div>

        <p className="text-xl leading-relaxed max-w-2xl">
          interested in collaborating? always open to interesting projects and conversations.
        </p>

        <div className="flex flex-wrap gap-6">
          <a
            href="mailto:spencer.cheng@rootly.com"
            className="text-lg hover:text-purple-500 transition-colors"
          >
            spencer.cheng@rootly.com
          </a>
          <a
            href="https://github.com/spencerhcheng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:text-purple-500 transition-colors"
          >
            github
          </a>
          <a
            href="https://linkedin.com/in/spcheng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:text-purple-500 transition-colors"
          >
            linkedin
          </a>
        </div>

        <div className="pt-16 pb-8 text-center text-sm text-gray-500">
          made with care in san francisco 🚲
        </div>
      </section>
    </div>
  )
}