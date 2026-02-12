export default function ListingCard({ title, organization, type, interestTags, onClick }) {
    return (
        <div className="ListingCard card mb-3" onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                
                <div className="mb-2">
                    
                    <span className="card-subtitle mb-2 text-muted">{organization}</span>
                
                </div>
                {interestTags && interestTags.length > 0 && (
                    <div className="interest-tags">
                        {interestTags.map((tag, index) => {
                            const tagClass = `tag-${tag.split(' ')[0].toLowerCase()}`;
                            return (
                                <span key={index} className={`badge ${tagClass}`}>
                                    {tag}
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}