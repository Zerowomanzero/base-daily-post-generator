"use client";

import { useState } from "react";

export default function Home() {
  const [niche, setNiche] = useState<"crypto" | "health">("crypto");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generatePost() {
    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate post");
      }

      const data = await res.json();
      setResult(data.post);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(result);
    alert("Copied to clipboard");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f2f2f2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#ffffff",
          borderRadius: 14,
          padding: 24,
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          color: "#111",
        }}
      >
        <h1
          style={{
            marginBottom: 6,
            fontSize: 22,
            fontWeight: 600,
            color: "#000",
          }}
        >
          Daily Post Generator
        </h1>

        <p
          style={{
            marginBottom: 18,
            fontSize: 14,
            color: "#333",
            lineHeight: 1.5,
          }}
        >
          Generate calm, educational posts for Base.
        </p>

        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 500,
            color: "#222",
            marginBottom: 6,
          }}
        >
          Niche
        </label>

        <select
          value={niche}
          onChange={(e) => setNiche(e.target.value as any)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 14,
            marginBottom: 16,
            color: "#111",
            background: "#fff",
          }}
        >
          <option value="crypto">Crypto</option>
          <option value="health">Health</option>
        </select>

        <button
          onClick={generatePost}
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            background: "#000",
            color: "#fff",
            fontSize: 14,
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Generating…" : "Generate today’s post"}
        </button>

        {error && (
          <p
            style={{
              marginTop: 12,
              fontSize: 13,
              color: "#b00020",
            }}
          >
            {error}
          </p>
        )}

        {result && (
          <div
            style={{
              marginTop: 20,
              padding: 14,
              borderRadius: 10,
              background: "#f7f7f7",
              border: "1px solid #e0e0e0",
            }}
          >
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "#111",
                whiteSpace: "pre-wrap",
              }}
            >
              {result}
            </p>

            <button
              onClick={copyToClipboard}
              style={{
                marginTop: 10,
                fontSize: 13,
                background: "transparent",
                border: "none",
                color: "#0066cc",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </main>
  );
}