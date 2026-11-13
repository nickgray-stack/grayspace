"use client";
import { useEffect, useRef } from "react";

// Device mockup built on the EXACT Figma titanium bezel (exported from the design
// system as a transparent PNG). The screen content (VideoMedia / <img>) and the
// iOS + IG-story chrome are composited LIVE inside the real screen rectangle, so
// the frame stays pixel-crisp at any size and chrome is never baked into a video.
//
// Geometry (Figma node, device 460 × 957.82): screen inset L/R 3.183% T/B 1.528%;
// screen radius 63.45px → 14.73% / 6.83% of the screen box.
export default function DeviceFrame({
  statusBar = true,
  storyUI = false,
  bottomNav = false,
  user = "Phillipsauction",
  time = "18h",
  avatar,
  fit = "cover",
  shift,
  vwidth,
  screenBg,
  children,
}) {
  const screenRef = useRef(null);
  const contentStyle = {};
  if (shift) contentStyle["--vtop"] = shift;
  if (vwidth) contentStyle["--vwidth"] = vwidth;

  // Drive the active (first) story progress bar off the real video playback, so it
  // fills white across each loop. Falls back to the CSS keyframe for image stories.
  useEffect(() => {
    if (!storyUI) return;
    const root = screenRef.current;
    if (!root) return;
    const video = root.querySelector("video");
    const fill = root.querySelector(".igs-fill");
    if (!video || !fill) return;
    fill.style.animation = "none";
    const update = () => {
      const d = video.duration;
      if (d && isFinite(d) && d > 0) {
        fill.style.width = Math.min(100, (video.currentTime / d) * 100) + "%";
      }
    };
    video.addEventListener("timeupdate", update);
    video.addEventListener("seeking", update);
    video.addEventListener("loadedmetadata", update);
    update();
    return () => {
      video.removeEventListener("timeupdate", update);
      video.removeEventListener("seeking", update);
      video.removeEventListener("loadedmetadata", update);
    };
  }, [storyUI]);

  return (
    <div className="device">
      <div className="device-screen" ref={screenRef} style={screenBg ? { background: screenBg } : undefined}>
        <div className={"device-content fit-" + fit} style={Object.keys(contentStyle).length ? contentStyle : undefined}>{children}</div>
        {(statusBar || storyUI) && <span className="device-scrim" aria-hidden="true" />}
        {storyUI && bottomNav && <span className="device-scrim-bot" aria-hidden="true" />}
        {statusBar && <StatusBar />}
        {storyUI && <StoryChrome user={user} time={time} avatar={avatar} />}
        {storyUI && bottomNav && <StoryFoot />}
      </div>
      <span className="device-island" aria-hidden="true" />
      <img className="device-bezel" src="/media/iphone-titanium.png" alt="" aria-hidden="true" />
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

function StoryChrome({ user, time, avatar }) {
  return (
    <div className="igs" aria-hidden="true">
      <div className="igs-bars">
        <span className="igs-bar on"><i className="igs-fill" /></span>
        <span className="igs-bar" />
        <span className="igs-bar" />
      </div>
      <div className="igs-head">
        {avatar ? <img className="igs-av igs-av-img" src={avatar} alt="" /> : <span className="igs-av">P</span>}
        <span className="igs-name">{user}</span>
        <span className="igs-time">{time}</span>
        <span className="igs-dots">⋯</span>
        <svg className="igs-x" width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 5l12 12M17 5 5 17"/></svg>
      </div>
    </div>
  );
}

function StoryFoot() {
  return (
    <div className="igf" aria-hidden="true">
      <span className="igf-input">Send message</span>
      <svg className="igf-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10Z"/></svg>
      <svg className="igf-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3 3 10.5l6.5 2.5L12 20l9-17Z"/><path d="M9.5 13 21 3"/></svg>
    </div>
  );
}
