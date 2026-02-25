const Copyright = () => {
    return (
        <div
            className="text-primary"
            style={{
                backgroundColor: "#fff",
                position: "fixed",
                left: "0",
                right: "0",
                top: "auto",
                bottom: "0",
                textAlign: "center",
                fontSize: ".9rem",
                padding: ".2rem 0",
            }}
        >
            <p href="mailto:ivokalendar@icloud.com" area-label="Contact Developer">
                Copyright &copy; {new Date().getFullYear()} Ivo Kalendarov
            </p>
            {/* <p>All rights reserved.</p> */}
        </div>
    );
};

export default Copyright;
