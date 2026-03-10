export default function Header() {
    return (
        <header className="App-header container-fluid pt-3 text-center">

                <div className="container-fluid text-center m-auto">
                    <img src="bwl_lion_logo_square.png" alt="Logo" className="App-logo"/>
                    <h1 className="App-title">BWL Opportunity Board</h1>
                    <p className="App-description"><span className="fw-bold">Welcome, Lions!</span> Here is your curated database for external opportunities including <strong>extracurricular activities</strong>, <strong>summer programs</strong>, <strong>internships</strong>, <strong>jobs</strong>, and more. 
                    <span className="App-instruction"> Click on a listing to view details ⬇️</span></p>

                </div>
            {/*
            <div className="d-flex justify-content-around">
                <button className="btn btn-secondary shadow-sm fw-bold">Resumé Tips</button>
                <button className="btn btn-secondary shadow-sm fw-bold">Contact Us!</button>
            </div>
            */}
        </header>
    );
}