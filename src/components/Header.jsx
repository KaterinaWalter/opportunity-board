export default function Header() {
    return (
        <header className="App-header container-fluid pt-3 text-center">
            <nav class="navbar">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                    <img src="bwl_lion_logo_square.png" alt="Logo" className="App-logo d-inline-block align-text-center"/>
                    <span className="App-title">BWL Opportunities Board</span>
                    </a>
                </div>
            </nav> 
            <p className="App-description">Welcome, Lions! Here is your database for finding enrichment opportunities, including: <strong>extracurricular activities</strong>, <strong>summer programs</strong>, <strong>internships</strong>, <strong>jobs</strong>, and more.</p>
            <div className="d-flex justify-content-around">
                <button className="btn btn-secondary shadow-sm fw-bold">Resumé Tips</button>
                <button className="btn btn-secondary shadow-sm fw-bold">Contact Us!</button>
            </div>
        </header>
    );
}