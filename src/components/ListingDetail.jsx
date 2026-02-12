export default function ListingDetail({ listing, isOpen, onClose }) {
    if (!isOpen || !listing) return null;

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
                            <h6 className="text-muted mb-3">{listing.organization}</h6>
                            <div className="mb-3">
                                <span className="badge bg-secondary">{listing.type}</span>
                            </div>
                            {listing.interestTags && listing.interestTags.length > 0 && (
                                <div className="mb-3">
                                    <strong>Interest Tags:</strong>
                                    <div className="interest-tags mt-2">
                                        {listing.interestTags.map((tag, index) => {
                                            const tagClass = `tag-${tag.split(' ')[0].toLowerCase()}`;
                                            return (
                                                <span key={index} className={`badge ${tagClass}`}>
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {listing.website && (
                                <div className="mb-3">
                                    <strong>Website:</strong>{' '}
                                    <a href={listing.website} target="_blank" rel="noopener noreferrer">
                                        {listing.website}
                                    </a>
                                </div>
                            )}
                            {listing.deadline && (
                                <div className="mb-3">
                                    <strong>Deadline:</strong> {listing.deadline}
                                </div>
                            )}
                            {listing.summary && (
                                <div className="mb-3">
                                    <strong>Summary:</strong>
                                    <p className="mt-2">{listing.summary}</p>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}