import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./EventDetailPage.css";

function EventDetailPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  async function fetchEvent() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/events/${id}`);
      if (!response.ok) {
        setError("Event not found.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setEvent(data);
    } catch (err) {
      console.log("error fetching event:", err);
      setError("Could not load event. Please check if the server is running.");
    }

    setLoading(false);
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-IN", options);
  }

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="spinner"></div>
        <p>Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-error">
        <p>⚠️ {error}</p>
        <Link to="/" className="back-btn">← Back to Events</Link>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="detail-page">
      {/* back button */}
      <Link to="/" className="back-link">← Back to all events</Link>

      {/* hero image */}
      <div className="detail-hero-image">
        <img
          src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200"}
          alt={event.title}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200";
          }}
        />
        <div className="detail-hero-overlay"></div>
      </div>

      <div className="detail-content">
        {/* left column */}
        <div className="detail-main">
          {/* badges row */}
          <div className="detail-badges">
            <span className={`type-badge ${event.type === "Online" ? "badge-online" : "badge-offline"}`}>
              {event.type === "Online" ? "🟢 Online" : "📍 Offline"}
            </span>
            {event.isPaid ? (
              <span className="paid-badge">Paid Event · ₹{event.price}</span>
            ) : (
              <span className="free-badge">Free Event</span>
            )}
          </div>

          {/* title */}
          <h1 className="detail-title">{event.title}</h1>

          {/* basic info row */}
          <div className="detail-info-row">
            <div className="info-item">
              <span className="info-label">📅 Date</span>
              <span className="info-value">{formatDate(event.date)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">🕐 Time</span>
              <span className="info-value">{event.time}</span>
            </div>
          </div>

          {/* description */}
          <div className="detail-section">
            <h2 className="section-title">About this Event</h2>
            <p className="detail-description">{event.description}</p>
          </div>

          {/* sessions */}
          {event.sessions && event.sessions.length > 0 && (
            <div className="detail-section">
              <h2 className="section-title">📋 Schedule / Sessions</h2>
              <div className="sessions-list">
                {event.sessions.map((session, i) => (
                  <div key={i} className="session-item">
                    <div className="session-time">
                      {session.startTime} – {session.endTime}
                    </div>
                    <div className="session-title">{session.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="detail-section">
              <h2 className="section-title">🎤 Speakers / Presenters</h2>
              <div className="speakers-grid">
                {event.speakers.map((speaker, i) => (
                  <div key={i} className="speaker-card">
                    <div className="speaker-avatar">
                      {speaker.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="speaker-name">{speaker.name}</p>
                      <p className="speaker-topic">{speaker.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="detail-section">
              <h2 className="section-title">🏷️ Tags</h2>
              <div className="tags-list">
                {event.tags.map((tag, i) => (
                  <span key={i} className="tag-item">#{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* right column - sidebar */}
        <div className="detail-sidebar">
          {/* venue/location card */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">
              {event.type === "Online" ? "🌐 Event Platform" : "📍 Venue"}
            </h3>
            {event.type === "Offline" ? (
              <>
                <p className="venue-name">{event.venue?.name}</p>
                <p className="venue-address">{event.venue?.address}</p>
                <p className="venue-city">{event.venue?.city}</p>
              </>
            ) : (
              <p className="venue-name">{event.venue?.name}</p>
            )}
          </div>

          {/* pricing */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">💰 Pricing</h3>
            {event.isPaid ? (
              <p className="price-display">₹{event.price}</p>
            ) : (
              <p className="free-display">FREE</p>
            )}
          </div>

          {/* additional info */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">ℹ️ Additional Info</h3>
            <div className="additional-info-list">
              {event.dressCode && event.dressCode !== "No dress code" && (
                <div className="ai-row">
                  <span className="ai-label">Dress Code</span>
                  <span className="ai-value">{event.dressCode}</span>
                </div>
              )}
              {event.ageRestriction && (
                <div className="ai-row">
                  <span className="ai-label">Age</span>
                  <span className="ai-value">{event.ageRestriction}</span>
                </div>
              )}
              {event.additionalInfo && (
                <div className="ai-row">
                  <span className="ai-label">Note</span>
                  <span className="ai-value">{event.additionalInfo}</span>
                </div>
              )}
            </div>
          </div>

          {/* register button placeholder */}
          <button className="register-btn">
            {event.isPaid ? `Register · ₹${event.price}` : "Register for Free"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;