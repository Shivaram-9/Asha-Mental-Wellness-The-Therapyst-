import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace basic cors with production cors
cors_replace = '''const app = express();
app.use(cors());'''

cors_new = '''const app = express();
// Configure CORS for production GitHub Pages and local testing
app.use(cors({
    origin: ['https://shivaram-9.github.io', 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));'''

js = js.replace(cors_replace, cors_new)

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(js)
