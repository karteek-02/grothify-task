const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const cors = require("cors")
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
}))

app.post("/api/task", async (req, res) => {
    try {
        const reqUrl = req.body.url;
        console.log(req.body, reqUrl);
        const response = await axios({
            method: 'post',
            url: "https://api.dataforseo.com/v3/on_page/task_post",
            auth: {
                username: 'karteekkarteek007@gmail.com',
                password: 'd16470eab6eaec2a',
            },
            data: [
                {
                    target: reqUrl,
                    max_crawl_pages: 10,
                    load_resources: true,
                    enable_javascript: true,
                    enable_browser_rendering: true,
                    custom_js: "meta = {}; meta.url = document.URL; meta;",
                },
            ],
            headers: {
                'content-type': 'application/json',
            },
        });
        const report = response.data;
        res.status(200).json({ result: report });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: JSON.stringify(e) });
    }
});


app.post("/api/page_score", async (req, res) => {
    try {
        const { id } = req.body;
        const response = await axios({
            method: 'post',
            url: "https://api.dataforseo.com/v3/on_page/pages",
            auth: {
                username: 'karteekkarteek007@gmail.com',
                password: 'd16470eab6eaec2a',
            },
            data: [{
                "id": id,
            }],
            headers: {
                'content-type': 'application/json'
            }
        });

        const report = response.data;
        res.status(200).json({ result: report.tasks[0].result[0] });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: JSON.stringify(e) });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
