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
          Software engineer and visual artist. I build thoughtful digital experiences and create meaningful art.
        </p>
      </section>

      {/* About Section */}
      <section id="about" className="space-y-6">
        <h2 className="text-3xl font-bold">About</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            I&#39;m a software engineer with a passion for creating thoughtful digital experiences.
            Currently building tools and systems that help teams work more effectively.
          </p>
          <p className="text-lg leading-relaxed">
            Outside of code, I express creativity through visual art — illustrations, paintings,
            and digital artwork that explore themes of technology, nature, and human connection.
          </p>
          <p className="text-lg leading-relaxed">
            When I&#39;m not coding or creating art, you&#39;ll find me hiking, reading about design,
            or experimenting with new creative techniques.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="space-y-8">
        <h2 className="text-3xl font-bold">Engineering Projects</h2>
        <div className="grid gap-8">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <div className="flex space-x-3">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>

              {project.outcome && (
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  {project.outcome}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
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

      {/* Hobbies */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Other Interests</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          When I&#39;m not coding or creating art, I enjoy hiking local trails, reading about design and psychology,
          experimenting with photography, and discovering new coffee shops around the city.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="space-y-6">
        <h2 className="text-3xl font-bold">Let&#39;s Connect</h2>
        <div className="flex space-x-6">
          <a
            href="mailto:spencer.cheng@rootly.com"
            className="text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Email
          </a>
          <a
            href="https://github.com/spencercheng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/spencercheng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  )
}