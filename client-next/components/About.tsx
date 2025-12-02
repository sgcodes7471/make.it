"use client"

export default function About() {
  return (
    <div className="relative w-full py-24 overflow-hidden bg-neutral-950">
      {/* Galaxy background animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(90,90,255,0.12),transparent_70%)] animate-galaxy-spin-slow" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] animate-galaxy-spin-medium" />
        <div className="absolute bottom-1/4 right-1/3 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(150,150,255,0.1),transparent_75%)] animate-galaxy-spin-fast" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-neutral-100 text-center tracking-tight mb-6">
          About Make.it
        </h2>

        <p className="text-neutral-400 text-center leading-relaxed max-w-2xl mx-auto">
          Make.it is an AI-powered website builder that turns natural language
          descriptions into structured website plans. It helps you move from an
          idea to a professional layout with clear components, pages, and
          architecture—without needing to write a single line of code upfront.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-800 shadow-lg back">
            <h3 className="text-neutral-200 font-medium mb-2">Intuitive</h3>
            <p className="text-neutral-500 text-sm">
              Describe your idea in plain language and receive a structured plan.
            </p>
          </div>

          <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-800 shadow-lg">
            <h3 className="text-neutral-200 font-medium mb-2">AI-Guided</h3>
            <p className="text-neutral-500 text-sm">
              Let the system guide you step-by-step to refine features and pages.
            </p>
          </div>

          <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-800 shadow-lg">
            <h3 className="text-neutral-200 font-medium mb-2">Developer-Friendly</h3>
            <p className="text-neutral-500 text-sm">
              Export clean structures compatible with modern frameworks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
