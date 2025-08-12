import { PencilLine } from "lucide-react";

export default function Home() {
  return (
    <div className="p-4 md:p-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gradient mb-4 px-4">
            Capture your ideas
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto px-4">
            The fastest and most elegant way to save your daily thoughts
          </p>
        </div>

        {/* Quick Note Input */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12 px-4">
          <div className="glass-effect rounded-xl p-4 md:p-6 card-hover">
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-foreground text-sm font-bold"><PencilLine className="w-4 h-4" /></span>
              </div>
              <div className="flex-1 w-full">
                <textarea
                  placeholder="What's on your mind?"
                  className="w-full bg-transparent text-foreground placeholder-muted resize-none border-none outline-none text-base md:text-lg"
                  rows={3}
                />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 space-y-3 sm:space-y-0">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      idea
                    </span>
                    <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">
                      work
                    </span>
                  </div>
                  <button className="w-full sm:w-auto bg-gradient-primary px-6 py-2 rounded-lg text-foreground font-medium hover:opacity-90 transition-opacity">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gradient mb-4 px-4">
            Last notes
          </h1>
        </div>
        {/* Sample Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
          {/* Note Card 1 */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-accent font-semibold text-sm md:text-base">💡 New feature</h3>
              <span className="text-muted text-xs md:text-sm font-mono">15:30</span>
            </div>
            <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed">
              Implement intelligent search system that uses AI to find related notes
            </p>
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-success/20 text-success rounded text-xs">
                ideas
              </span>
            </div>
          </div>

          {/* Note Card 2 */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-accent font-semibold text-sm md:text-base">📋 Task list</h3>
              <span className="text-muted text-xs md:text-sm font-mono">14:15</span>
            </div>
            <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed">
              ✅ Configure Tailwind CSS<br />
              🔄 Create base components<br />
              📱 Design mobile interface
            </p>
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-warning/20 text-warning rounded text-xs">
                work
              </span>
            </div>
          </div>

          {/* Note Card 3 */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-accent font-semibold text-sm md:text-base">🎯 Monthly goals</h3>
              <span className="text-muted text-xs md:text-sm font-mono">12:00</span>
            </div>
            <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed">
              Finish notes app, configure CI/CD and make first deployment
            </p>
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                goals
              </span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4">
          <div className="bg-surface border border-border rounded-xl p-4 md:p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">12</div>
            <div className="text-muted text-xs md:text-sm">Notes today</div>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4 md:p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-secondary mb-2">89</div>
            <div className="text-muted text-xs md:text-sm">Total this month</div>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4 md:p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-success mb-2">5</div>
            <div className="text-muted text-xs md:text-sm">Active tags</div>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4 md:p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-warning mb-2">3</div>
            <div className="text-muted text-xs md:text-sm">Days in a row</div>
          </div>
        </div>
      </div>
    </div>
  );
}
