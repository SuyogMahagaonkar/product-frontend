import React from 'react';

function FilterBar({ filterCategory, setFilterCategory }) {
    return (
        <input
            className="form-control mb-3"
            placeholder="Filter by category..."
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
        />
    );
}

export default FilterBar;
