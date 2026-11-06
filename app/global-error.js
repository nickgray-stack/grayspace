"use client";

// Catches errors in the root layout itself (must render its own html/body).
export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#131312",
          color: "#F3F2EE",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 12px" }}>
            Something broke.
          </h1>
          <p style={{ color: "#86867E", margin: "0 0 24px" }}>Please try again.</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              height: 48,
              padding: "0 24px",
              borderRadius: 999,
              border: 0,
              background: "#F3F2EE",
              color: "#131312",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
