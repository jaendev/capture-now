export default function SettingsPage() {
  const settingsSections = [
    {
      title: "Notes",
      settings: [
        {
          label: "Auto-save",
          description: "Automatically save notes as you type",
          type: "toggle",
          enabled: true
        },
        {
          label: "Default tags",
          description: "Automatically add tags to new notes",
          type: "toggle",
          enabled: false
        }
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted">Customize your Capture-Now experience</p>
        </div>

        <div className="space-y-8">
          {settingsSections.map((section) => (
            <div key={section.title} className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">{section.title}</h2>

              <div className="space-y-6">
                {section.settings.map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-foreground font-medium">{setting.label}</h3>
                      <p className="text-muted text-sm mt-1">{setting.description}</p>
                    </div>

                    <div className="ml-4">
                      {setting.type === "toggle" ? (
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${setting.enabled ? 'bg-primary' : 'bg-hover'
                            }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                          />
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* About Section */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">About</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-foreground">Version</span>
                <span className="text-muted">1.0.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Build</span>
                <span className="text-muted">12-08-2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Developer</span>
                <span className="text-muted">Brian Jaén</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
