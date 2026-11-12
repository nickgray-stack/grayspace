// Device mockup that composites LIVE layers over the screen content, so chrome
// (status bar, IG-story UI, modals, overlay animations) is crisp HTML/CSS rather
// than baked into the video asset. Screen content (a VideoMedia or <img>, plus
// any overlay) is passed as children. Variants: iphone (more to come: android,
// tablet, desktop).
export default function DeviceFrame({
  variant = "iphone",
  statusBar = true,
  storyUI = false,
  user = "Phillipsauction",
  time = "18h",
  fit = "cover",
  screenBg,
  children,
}) {
  return (
    <div className={"device device-" + variant}>
      <div className="device-frame">
        <span className="db db-act" aria-hidden="true" />
        <span className="db db-vup" aria-hidden="true" />
        <span className="db db-vdn" aria-hidden="true" />
        <span className="db db-pwr" aria-hidden="true" />
        <span className="device-island" aria-hidden="true" />
        <div className="device-screen" style={screenBg ? { background: screenBg } : undefined}>
          <div className={"device-content" + (fit === "contain" ? " fit-contain" : "")}>{children}</div>
          {(statusBar || storyUI) && <span className="device-scrim" aria-hidden="true" />}
          {statusBar && <StatusBar />}
          {storyUI && <StoryChrome user={user} time={time} />}
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="dsb" aria-hidden="true">
      <span className="dsb-time">9:41</span>
      <span className="dsb-icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 11.5 1 4.6a9.9 9.9 0 0 1 14 0L8 11.5Z" opacity=".35"/><path d="M8 11.5 4.1 7.6a5.5 5.5 0 0 1 7.8 0L8 11.5Z"/></svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="1" y="1" width="21" height="11" rx="3" stroke="currentColor" strokeWidth="1.2" opacity=".5"/><rect x="2.5" y="2.5" width="16" height="8" rx="1.6" fill="currentColor"/><rect x="23.4" y="4" width="1.6" height="5" rx=".8" fill="currentColor" opacity=".5"/></svg>
      </span>
    </div>
  );
}

function StoryChrome({ user, time }) {
  return (
    <div className="igs" aria-hidden="true">
      <div className="igs-bars">
        <span className="igs-bar"><i /></span>
        <span className="igs-bar on" />
        <span className="igs-bar" />
      </div>
      <div className="igs-head">
        <span className="igs-av">P</span>
        <span className="igs-name">{user}</span>
        <span className="igs-time">{time}</span>
        <span className="igs-x">✕</span>
      </div>
    </div>
  );
}
