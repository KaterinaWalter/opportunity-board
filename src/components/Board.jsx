import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import ListingDetail from './ListingDetail';
import csvData from '../board-data-5mar26.csv?raw';

const LOGISTICS_TAGS = [
    'Competition / Award',
    'Coursework / Enrichment',
    'Internship / Job',
    'Residential',
    'Remote'
];

export default function Board() {
    const [listings, setListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilterTags, setSelectedFilterTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const logisticsTagSet = new Set(LOGISTICS_TAGS);
    const logisticsTags = LOGISTICS_TAGS.filter((tag) => allTags.includes(tag));
    const interestTags = allTags.filter((tag) => !logisticsTagSet.has(tag));

    const handleCardClick = (listing) => {
        setSelectedListing(listing);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedListing(null);
    };

    const handleTagFilterClick = (tag) => {
        setSelectedFilterTags((prevTags) =>
            prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag)
                : [...prevTags, tag]
        );
    };

    const getFilteredListings = () => {
        const normalizedQuery = searchQuery.trim().toLowerCase();
        return listings.filter((listing) => {
            const matchesTags =
                selectedFilterTags.length === 0 ||
                listing.interestTags.some((tag) => selectedFilterTags.includes(tag));
            if (!matchesTags) {
                return false;
            }
            if (!normalizedQuery) {
                return true;
            }
            const searchHaystack = [
                listing.title,
                listing.status || listing.type,
                ...(listing.interestTags || [])
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return searchHaystack.includes(normalizedQuery);
        });
    };

    useEffect(() => {
        // Parse CSV data
        const parseCSV = (csv) => {
            const lines = csv.split('\n');
            const normalizeValue = (value) => value.trim().replace(/^"|"$/g, '');
            const headers = lines[0].split(',').map(normalizeValue);
            const data = [];
            
            // Define interest tag columns (starting from index 6)
            const interestTagColumns = headers.slice(6);

            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                
                const values = [];
                let current = '';
                let inQuotes = false;

                for (let j = 0; j < lines[i].length; j++) {
                    const char = lines[i][j];
                    if (char === '"') {
                        inQuotes = !inQuotes;
                    } else if (char === ',' && !inQuotes) {
                        values.push(normalizeValue(current));
                        current = '';
                    } else {
                        current += char;
                    }
                }
                values.push(normalizeValue(current));

                if (values.length >= 3) {
                    // Extract interest tags where value is TRUE
                    const interestTags = interestTagColumns
                        .map((tag, index) => values[5 + index] === 'TRUE' ? tag : null)
                        .filter(tag => tag !== null);
                    
                    data.push({
                        title: values[0],
                        summary: values[1],
                        website: values[2],
                        status: values[3],
                        deadline: values[4],
                        interestTags: interestTags
                    });
                }
            }

            const tagsInUse = new Set(data.flatMap((listing) => listing.interestTags));
            const orderedTags = interestTagColumns.filter((tag) => tagsInUse.has(tag));

            return { data, orderedTags };
        };

        const parsedResult = parseCSV(csvData);
        setListings(parsedResult.data);
        setAllTags(parsedResult.orderedTags);
    }, []);

    return (
        <>
            {/* Filter Tags Section */}
            {allTags.length > 0 && (
                <div className="filter-tags mb-0 container mt-3 px-3">
                    <div className="d-flex align-items-center justify-content-start mb-2 gap-2">
                        <input
                            className="form-control form-control-sm w-auto"
                            type="search"
                            placeholder="🔍 Search listings"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            aria-label="Search listings"
                        />
                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-sm btn-outline-light"
                                onClick={() => setIsFilterOpen((prev) => !prev)}
                            >
                                {isFilterOpen ? 'Hide' : 'Show'} filters
                            </button>
                            {selectedFilterTags.length > 0 && (
                                <button
                                    className="btn btn-sm btn-link"
                                    onClick={() => setSelectedFilterTags([])}
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>
                    {isFilterOpen && (
                        <>
                            {logisticsTags.length > 0 && (
                                <div className="mb-3">
                                    <div className="small text-uppercase text-muted mb-2">Logistics Tags:</div>
                                    <div className="d-flex flex-wrap gap-2">
                                        {logisticsTags.map((tag) => {
                                            const tagClass = `tag-${tag.split(' ')[0].toLowerCase()}`;
                                            return (
                                                <span
                                                    key={tag}
                                                    className={`badge ${tagClass}`}
                                                    onClick={() => handleTagFilterClick(tag)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        opacity: selectedFilterTags.includes(tag) ? 1 : 0.6,
                                                        border: selectedFilterTags.includes(tag) ? '2px solid' : '1px solid transparent'
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {interestTags.length > 0 && (
                                <div>
                                    <div className="small text-uppercase text-muted mb-2">Interest Tags:</div>
                                    <div className="d-flex flex-wrap gap-2">
                                        {interestTags.map((tag) => {
                                            const tagClass = `tag-${tag.split(' ')[0].toLowerCase()}`;
                                            return (
                                                <span
                                                    key={tag}
                                                    className={`badge ${tagClass}`}
                                                    onClick={() => handleTagFilterClick(tag)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        opacity: selectedFilterTags.includes(tag) ? 1 : 0.6,
                                                        border: selectedFilterTags.includes(tag) ? '2px solid' : '1px solid transparent'
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            <div className="Board container mt-3 mb-3">
                <div className="row">
                    {getFilteredListings().map((listing, index) => (
                        <div key={index} className="col-md-6 col-lg-4">
                            <ListingCard 
                                title={listing.title}
                                organization={listing.organization}
                                status={listing.status}
                                interestTags={listing.interestTags}
                                onClick={() => handleCardClick(listing)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <ListingDetail 
                listing={selectedListing}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}