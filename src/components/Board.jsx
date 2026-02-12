import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import ListingDetail from './ListingDetail';
import csvData from '../board-data-12feb26.csv?raw';

export default function Board() {
    const [listings, setListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (listing) => {
        setSelectedListing(listing);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedListing(null);
    };

    useEffect(() => {
        // Parse CSV data
        const parseCSV = (csv) => {
            const lines = csv.split('\n');
            const headers = lines[0].split(',');
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
                        values.push(current);
                        current = '';
                    } else {
                        current += char;
                    }
                }
                values.push(current);

                if (values.length >= 3) {
                    // Extract interest tags where value is TRUE
                    const interestTags = interestTagColumns
                        .map((tag, index) => values[6 + index] === 'TRUE' ? tag : null)
                        .filter(tag => tag !== null);
                    
                    data.push({
                        title: values[0],
                        organization: values[1],
                        summary: values[2],
                        website: values[3],
                        deadline: values[4],
                        type: values[5],
                        interestTags: interestTags
                    });
                }
            }
            return data;
        };

        const parsedListings = parseCSV(csvData);
        setListings(parsedListings);
    }, []);

    return (
        <>
            <div className="Board container mt-3 mb-3">
                <div className="row">
                    {listings.map((listing, index) => (
                        <div key={index} className="col-md-6 col-lg-4">
                            <ListingCard 
                                title={listing.title}
                                organization={listing.organization}
                                type={listing.type}
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