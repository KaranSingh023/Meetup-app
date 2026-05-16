import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import "./EventsPage.css";

function EventsPage() {
  // state for all events from backend
  const [events, setEvents] = useState([]);

  // state for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // state for search and filter
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("Both");

  // fetch events from backend whenever search or filter changes
  useEffect(() => {
    fetchEvents();
  }, [searchText, typeFilter]);

  async function fetchEvents() {
    setLoading(true);
    setError("");

    try {
      // build the query string
      let url = "https://meetup-backend-blond.vercel.app/api/events?";
      if (typeFilter !== "Both") {
        url += `type=${typeFilter}&`;
      }
      if (searchText.trim() !== "") {
        url += `search=${searchText}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.log("error fetching events:", err);
      setError("Could not load events. Please check if the server is running.");
    }

    setLoading(false);
  }

  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }

  function handleTypeChange(e) {
    setTypeFilter(e.target.value);
  }

  return (
    <div className="events-page">
      {/* hero section */}
      <div className="events-hero">
        <h1 className="hero-title">Find Your Next Event</h1>
        <p className="hero-subtitle">Discover tech meetups, workshops, and networking events near you</p>
      </div>

      {/* search and filter bar */}
      <div className="filter-bar-wrapper">
        <div className="filter-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by event title or tags..."
              value={searchText}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="type-filter">
            <select
              value={typeFilter}
              onChange={handleTypeChange}
              className="type-select"
            >
              <option value="Both">All Events</option>
              <option value="Online">Online Only</option>
              <option value="Offline">Offline Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* results count */}
      <div className="results-info">
        <span>
          {loading ? "Loading..." : `${events.length} event${events.length !== 1 ? "s" : ""} found`}
        </span>
        {typeFilter !== "Both" && (
          <span className="filter-active-badge">{typeFilter}</span>
        )}
        {searchText && (
          <span className="filter-active-badge">"{searchText}"</span>
        )}
      </div>

      {/* main content */}
      <div className="events-content">
        {loading && (
          <div className="loading-screen">
            <div className="spinner"></div>
            <p>Loading events...</p>
          </div>
        )}

        {error && (
          <div className="error-box">
            <p>⚠️ {error}</p>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="empty-state">
            <p>😕 No events found. Try a different search!</p>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsPage;