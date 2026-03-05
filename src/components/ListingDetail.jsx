export default function ListingDetail({ listing, isOpen, onClose }) {
    if (!isOpen || !listing) return null;

    const normalizeTag = (tag) => tag.toLowerCase().replace(/\s*\/\s*/g, ' / ').trim();
    const logisticsTagSet = new Set([
        'competition / award',
        'internship / job',
        'coursework / enrichment',
        'remote',
        'residential',
    ]);
    const allTags = listing.interestTags || [];
    const logisticsTags = allTags.filter((tag) => logisticsTagSet.has(normalizeTag(tag)));
    const interestTags = allTags.filter((tag) => !logisticsTagSet.has(normalizeTag(tag)));

    const statusValue = listing.status || listing.type;
    const normalizedStatus = (statusValue || '').toUpperCase();
    const statusBadgeClass =
        normalizedStatus === 'OPEN'
            ? 'bg-success'
            : normalizedStatus === 'ONGOING'
                ? 'bg-warning text-dark'
                : normalizedStatus === 'CLOSED'
                    ? 'bg-danger'
                    : 'bg-secondary';

    return (
        <>
            <div className="modal-backdrop fade show" onClick={onClose}></div>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content ListingDetail">
                        <div className="modal-header">
                            <h5 className="modal-title">{listing.title}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="status-container mb-3 d-flex align-items-center justify-content-center gap-3">
                                {listing.deadline && (
                                    <h6 className="mt-2 d-inline-block">{listing.deadline}</h6>
                                )}
                            </div>
                            {listing.website && (
                                <div className="mb-3">
                                    <strong className="text-uppercase">Website Link:</strong>{' '}
                                    <a href={listing.website} target="_blank" rel="noopener noreferrer">
                                        {listing.website}
                                    </a>
                                </div>
                            )}
                            {allTags.length > 0 && (
                                <div className="mb-3">
                                    {logisticsTags.length > 0 && (
                                        <>
                                            <strong className="text-uppercase">Logistics Tags:</strong>
                                            <div className="interest-tags mt-2 mb-3">
                                                {logisticsTags.map((tag, index) => {
                                                    const tagClass = `tag-${tag.split(' ')[0].toLowerCase()}`;
                                                    return (
                                                        <span key={`logistics-${index}`} className={`badge ${tagClass}`}>
                                                            {tag}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                    {interestTags.length > 0 && (
                                        <>
                                            <strong className="text-uppercase">Interest Tags:</strong>
                                            <div className="interest-tags mt-2">
                                                {interestTags.map((tag, index) => {
                                                    const tagClass = `tag-${tag.split(' ')[0].toLowerCase()}`;
                                                    return (
                                                        <span key={`interest-${index}`} className={`badge ${tagClass}`}>
                                                            {tag}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                            {listing.summary && (
                                <div className="mb-3">
                                    <strong className="text-uppercase">Summary:</strong>
                                    <p className="mt-2">{listing.summary}</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}