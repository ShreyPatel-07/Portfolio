'use client'

import { useEffect, useRef } from 'react'

import { initMachineScene } from './agentic-machine-scene'
import { AGENTIC_FACTORY_STYLES } from './agentic-factory-styles'

// Adapted from the MIT-licensed Agentic Factory template by Eugene Shilow
// (eugeneshilow/agentic-3d-templates), reframed for this portfolio as the
// nine-station build process. The overlay is plain markup;
// agentic-machine-scene.ts builds the three.js scene into #scene and wires the
// overlay by id. The scene fills this component's box and is disposed on
// unmount.

type AgenticFactory3DProps = {
  height?: number | string
  className?: string
}

export default function AgenticFactory3D({
  height = 'clamp(520px, 72svh, 760px)',
  className,
}: AgenticFactory3DProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let dispose: (() => void) | undefined
    let cancelled = false
    // The in-scene screens are painted on canvases with Inter: wait for the
    // web font so the first paint of those textures already uses it.
    document.fonts.ready.then(() => {
      if (cancelled) return
      dispose = initMachineScene(root, getComputedStyle(root).fontFamily)
    })
    return () => {
      cancelled = true
      dispose?.()
    }
  }, [])

  return (
    <div
      className={['agentic-factory', className].filter(Boolean).join(' ')}
      style={{ height }}
    >
      <style dangerouslySetInnerHTML={{ __html: AGENTIC_FACTORY_STYLES }} />
      <div ref={rootRef} className="machine">
      <div
        id="scene"
        role="img"
        aria-label="Interactive 3D factory floor with nine stations, one for each build pass: Task, Requirement document, Discussion, Implementation, Agent connectivity, Testing, Reconfirmation, Bug fixing and Delivery & handover. Drag to rotate. Use the mode and camera controls to explore."
      />
      <div className="vignette" />
      <header className="topbar debug-ui">
        <div className="identity">
          <div className="mark">
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 5l7 11 7-11M7 5l3 5 3-5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <strong>The Build</strong>
            <small>From brief to ship</small>
          </div>
        </div>
        <div className="status" id="status">
          <i />
          <span id="status-text">Build running</span>
          <span>BUILD 001</span>
        </div>
      </header>
      <div className="scene-heading debug-ui">
        The factory floor <span className="index">9 PASSES / 9 STATIONS</span>
      </div>
      <div className="coordinates debug-ui">PROCESS 01 — FROM TASK TO DELIVERY</div>
      <div id="journey" className="debug-ui">
        <div className="journey-icon">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 4h10v9H3zM6 4V2h4v2m-5 4h6" stroke="currentColor" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <strong id="journey-title">Task &amp; requirements</strong>
          <small id="journey-detail">Pass 01–02 · the task and the contract</small>
        </div>
        <div className="track">
          <i id="journey-progress" />
        </div>
      </div>
      <div id="labels" />
      <div id="tooltip" role="tooltip">
        <strong />
        <p />
      </div>
      <div className="controls debug-ui">
        <nav className="mode-bar" aria-label="Build mode">
          <button data-mode="assembled" aria-pressed="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5l6 3.3v6.4l-6 3.3-6-3.3V4.8L8 1.5zM2 4.8l6 3.4 6-3.4M8 8.2v6.3"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
            Whole
          </button>
          <button data-mode="cutaway" aria-pressed="false">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M3 2h10v12H3zM8 2v12M10.5 4l2.5 2.5m-2.5 0L13 9m-2.5 0 2.5 2.5"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
            Layers
          </button>
          <button data-mode="stations" aria-pressed="false">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5l6 3-6 3-6-3 6-3zM2 8l6 3 6-3M2 11.5l6 3 6-3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Stations
          </button>
          <button data-mode="order" aria-pressed="false">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M5 2.5l8 5.5-8 5.5v-11z" stroke="currentColor" strokeLinejoin="round" />
            </svg>
            One build
          </button>
        </nav>
        <nav className="camera-row" aria-label="Camera">
          <span className="caption">VIEW</span>
          <button data-camera="overview" aria-pressed="true">
            Overview
          </button>
          <button data-camera="side" aria-pressed="false">
            Side
          </button>
          <button data-camera="top" aria-pressed="false">
            Top
          </button>
          <button data-camera="station" aria-pressed="false">
            Station
          </button>
          <button data-camera="flight" aria-pressed="false">
            Flight
          </button>
          <span className="divider" />
          <button id="play" aria-label="Pause the animation" aria-pressed="false">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="1" width="2.5" height="10" rx=".5" />
              <rect x="7.5" y="1" width="2.5" height="10" rx=".5" />
            </svg>
          </button>
        </nav>
      </div>
      <footer className="footer">
        <span className="wordmark">A product, built in nine passes</span>
        <span className="footer-center debug-ui">SHREY PATEL · 2026</span>
        <span className="hint debug-ui">
          <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
            <rect x="2" y="1" width="9" height="14" rx="4.5" stroke="currentColor" />
            <path d="M6.5 4v3" stroke="currentColor" strokeLinecap="round" />
          </svg>
          Drag. Explore.
        </span>
      </footer>
      <div id="loading">
        <i />
        <span>Assembling the build</span>
      </div>
      <div id="error" role="alert">
        <strong>Could not start the 3D scene</strong>
        <p>Check that WebGL is turned on in your browser.</p>
        <button onClick={() => location.reload()}>Try again</button>
      </div>
      </div>
    </div>
  )
}
