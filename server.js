const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5173;
const DIST_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.webmanifest': 'application/manifest+json',
    '.js': 'text/javascript'
};

const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    
    // Prevent directory traversal
    if (urlPath.includes('..')) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }
    
    let filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath);
    
    // Check if file exists
    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            // Serve the file
            const ext = path.extname(filePath);
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';
            
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content);
                }
            });
        } else {
            // SPA: Serve index.html for all non-file routes (return 200)
            fs.readFile(path.join(DIST_DIR, 'index.html'), (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('500 - Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content);
                }
            });
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
