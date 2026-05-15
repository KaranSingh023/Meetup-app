import React from "react";
import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {
  // format date nicely
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-IN", options);
  }

  return (
    <Link to={`/event/${event._id}`} className="event-card-link">
      <div className="event-card">
        <div className="event-card-image-wrap">
          <img
            src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600"}
            alt={event.title}
            className="event-card-image"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600";
            }}
          />
          <span className={`event-type-badge ${event.type === "Online" ? "badge-online" : "badge-offline"}`}>
            {event.type === "Online" ? "🟢" : "📍"} {event.type}
          </span>
          {event.isPaid && (
            <span className="event-paid-badge">₹{event.price}</span>
          )}
        </div>

        <div className="event-card-body">
          <h3 className="event-card-title">{event.title}</h3>

          <div className="event-card-meta">
            <span className="event-meta-item">
              📅 {formatDate(event.date)}
            </span>
            <span className="event-meta-item">
              🕐 {event.time}
            </span>
          </div>

          {event.type === "Offline" && event.venue?.city && (
            <div className="event-card-city">
              📌 {event.venue.city}
            </div>
          )}

          <div className="event-card-tags">
            {event.tags && event.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="event-tag">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;