export default function NotesPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 md:mb-8 px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Notes</h1>
          <p className="text-muted text-sm md:text-base">Organize and manage all your captured thoughts</p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
          {/* Sample notes */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 md:p-6 card-hover">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-accent font-semibold text-sm md:text-base">Note #{i}</h3>
                <span className="text-muted text-xs md:text-sm font-mono">
                  {new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed">
                This is a sample note content. In a real app, this would contain 
                the actual note text that users have written.
              </p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                  sample
                </span>
                <button className="text-muted hover:text-accent transition-colors p-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
