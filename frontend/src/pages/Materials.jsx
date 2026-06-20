import { useState, useMemo } from 'react';
import { materials } from '../data/mockData';
import './Materials.css';

const FILE_TYPE_CONFIG = {
  PDF: { color: '#FF6B6B', icon: 'PDF' },
  DOC: { color: '#2196F3', icon: 'DOC' },
  PPT: { color: '#F5A623', icon: 'PPT' },
};

const Materials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  // Get unique courses for filter
  const courseOptions = useMemo(() => {
    const unique = [...new Set(materials.map((m) => m.course))];
    return ['All', ...unique];
  }, []);

  // Filtered materials
  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.course.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCourse = selectedCourse === 'All' || m.course === selectedCourse;
      return matchesSearch && matchesCourse;
    });
  }, [searchQuery, selectedCourse]);

  // Group by course
  const groupedMaterials = useMemo(() => {
    const groups = {};
    filteredMaterials.forEach((m) => {
      if (!groups[m.course]) {
        groups[m.course] = { course: m.course, color: m.color, items: [] };
      }
      groups[m.course].items.push(m);
    });
    return Object.values(groups);
  }, [filteredMaterials]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="materials-page">
      {/* Header */}
      <div className="materials-header">
        <div>
          <h1>Course Materials</h1>
          <p className="materials-subtitle">
            {materials.length} resources available across all courses
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="materials-filters">
        <div className="materials-search">
          <svg className="materials-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="materials-search__input"
          />
          {searchQuery && (
            <button
              className="materials-search__clear"
              onClick={() => setSearchQuery('')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="materials-filter-select">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="materials-filter-select__dropdown"
          >
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials grouped by course */}
      {groupedMaterials.length === 0 ? (
        <div className="materials-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
          </svg>
          <p>No materials found</p>
        </div>
      ) : (
        groupedMaterials.map((group) => (
          <div key={group.course} className="materials-group">
            <div className="materials-group__header">
              <span
                className="materials-group__dot"
                style={{ background: group.color }}
              />
              <h3>{group.course}</h3>
              <span className="materials-group__count">{group.items.length} files</span>
            </div>

            <div className="materials-grid stagger-children">
              {group.items.map((material) => {
                const typeConfig = FILE_TYPE_CONFIG[material.type] || FILE_TYPE_CONFIG.PDF;
                return (
                  <div key={material.id} className="material-card">
                    <div
                      className="file-icon"
                      style={{ background: typeConfig.color }}
                    >
                      <span>{typeConfig.icon}</span>
                    </div>

                    <div className="material-card__info">
                      <h4 className="material-card__title">{material.title}</h4>
                      <p className="material-card__meta">
                        <span>{material.size}</span>
                        <span className="material-card__dot">·</span>
                        <span>{formatDate(material.uploadDate)}</span>
                      </p>
                      <div className="material-card__stats">
                        <span className="material-card__downloads">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          {material.downloads}
                        </span>
                      </div>
                    </div>

                    <button className="material-card__download-btn" title="Download">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Materials;
