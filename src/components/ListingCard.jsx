export default function ListingCard({ title, status, interestTags, onClick }) {
    const normalizeTag = (tag) => tag.toLowerCase().replace(/\s*\/\s*/g, '/').trim();
    const formatTagLabel = (tag) => tag.replace(/\s*\/\s*/g, '/').trim();
    const logisticsTagSet = new Set([
        'competition/award',
        'internship/job',
        'coursework/enrichment',
        'volunteering',
        'remote',
        'residential'
    ]);

    const allTags = interestTags || [];
    const logisticsTags = allTags.filter((tag) => logisticsTagSet.has(normalizeTag(tag)));
    const nonLogisticsTags = allTags.filter((tag) => !logisticsTagSet.has(normalizeTag(tag)));

    return (
        <div className="ListingCard card mb-3" onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {allTags.length > 0 && (
                    <div className="interest-tags card-interest-tags">
                        {logisticsTags.length > 0 && (
                            <div className="interest-tag-row mb-0">
                                {logisticsTags.map((tag, index) => {
                                    const tagClass = `tag-${tag.trim().toLowerCase().split(/[ /]/)[0]}`;
                                    return (
                                        <span key={`logistics-${index}`} className={`badge ${tagClass}`}>
                                            {formatTagLabel(tag)}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                        {nonLogisticsTags.length > 0 && (
                            <div className="interest-tag-row">
                                {nonLogisticsTags.map((tag, index) => {
                                    const tagClass = `tag-${tag.trim().toLowerCase().split(/[ /]/)[0]}`;
                                    return (
                                        <span key={`interest-${index}`} className={`badge ${tagClass}`}>
                                            {formatTagLabel(tag)}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}