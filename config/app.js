const express = require("express");
const path = require("path");
const compression = require("compression"); // побрз пренос на податоци
const os = require("os"); 
const app = express();

const PORT = process.env.PORT || 7788; 
const TAG = "[app.js]: ";

app.use(compression()); // Ги компресира одговорите (Gzip)
app.disable("x-powered-by"); // Безбедност: крие дека користиш Express
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false })); // Додадено: поддршка за form-data
// ------------------------------------

app.use("/api", require("../routes/router"));

if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "..", "client", "dist");

    app.use(express.static(distPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
}

function logConnection(port) {
    console.log(TAG, `Server is running on http://localhost:${port}`);
    
    Object.values(os.networkInterfaces())
        .flat()
        .forEach((iface) => {
            if (iface?.family !== "IPv4" || iface?.internal) return;
            console.log(TAG, `Network access: http://${iface.address}:${port}`);
        });
}

app.listen(PORT, () => logConnection(PORT));

module.exports = app;