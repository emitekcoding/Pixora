// components/AlbumCard.js
import React from "react";

export default function AlbumCard({ album, onOpen }) {
  const {
    title,
    description,
    photographerName,
    visibility,
    accessCode,
    createdAt,
  } = album;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div
      style={{
        background: "#fff",
        padding: 16,
        borderRadius: 10,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0, color: "#2f9cff" }}>{title}</h3>
        <span
          style={{
            fontSize: 12,
            color: visibility === "public" ? "#28a745" : "#888",
            textTransform: "uppercase",
          }}
        >
          {visibility}
        </span>
      </div>

      {description && (
        <p style={{ margin: 0, color: "#555", fontSize: 14 }}>{description}</p>
      )}

      <div style={{ fontSize: 13, color: "#777" }}>
        {photographerName || "Inconnu"} <br />
        🕓 {formattedDate}
      </div>

      {accessCode && (
        <div
          style={{
            background: "#eef7ff",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 13,
            color: "#0a66c2",
            marginTop: 4,
          }}
        >
          Code d’accès : <strong>{accessCode}</strong>
        </div>
      )}

      <button
        onClick={() => onOpen?.(album)}
        style={{
          marginTop: 10,
          alignSelf: "flex-start",
          padding: "6px 14px",
          background: "#2f9cff",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        Ouvrir l’album
      </button>
    </div>
  );
}
