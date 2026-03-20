"""
Kids Learning Hub — Local Server with TTS
Serves static files + provides /tts endpoint using Microsoft Edge TTS.
Uses AnaNeural voice (playful child-like voice).
Audio is cached in audio/cache/ so each text is only generated once.
"""
import os
import hashlib
import asyncio
import urllib.parse
from http.server import SimpleHTTPRequestHandler, HTTPServer
import edge_tts

PORT = 3000
VOICE = 'en-US-AnaNeural'  # Child-like playful voice
CACHE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio', 'cache')
os.makedirs(CACHE_DIR, exist_ok=True)

async def generate_tts(text, output_path):
    communicate = edge_tts.Communicate(text, VOICE, rate='-10%', pitch='+5Hz')
    await communicate.save(output_path)

class TTSHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)

        if parsed.path == '/tts':
            params = urllib.parse.parse_qs(parsed.query)
            text = params.get('text', [''])[0].strip()
            if not text:
                self.send_error(400, 'Missing text parameter')
                return
            if len(text) > 500:
                text = text[:500]
            # Cache by MD5 hash of text
            h = hashlib.md5(text.encode('utf-8')).hexdigest()
            cache_path = os.path.join(CACHE_DIR, f'{h}.mp3')
            if not os.path.exists(cache_path):
                try:
                    asyncio.run(generate_tts(text, cache_path))
                except Exception as e:
                    self.send_error(500, f'TTS generation failed: {e}')
                    return
            # Serve the cached MP3
            self.send_response(200)
            self.send_header('Content-Type', 'audio/mpeg')
            self.send_header('Cache-Control', 'public, max-age=86400')
            self.send_header('Access-Control-Allow-Origin', '*')
            stat = os.stat(cache_path)
            self.send_header('Content-Length', str(stat.st_size))
            self.end_headers()
            with open(cache_path, 'rb') as f:
                self.wfile.write(f.read())
        else:
            super().do_GET()

    def end_headers(self):
        # Prevent browser caching for HTML/JS/CSS so updates show immediately
        if self.path.endswith(('.html', '.js', '.css')) or self.path == '/':
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        if '/tts' in str(args[0]) or '404' in str(args[1:]) or '500' in str(args[1:]):
            super().log_message(format, *args)

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = HTTPServer(('0.0.0.0', PORT), TTSHandler)
    print(f'Kids Learning Hub server running on http://0.0.0.0:{PORT}')
    print(f'Voice: {VOICE} (playful child voice)')
    print(f'Open on TV: http://192.168.4.21:{PORT}')
    print(f'TTS cache: {CACHE_DIR}')
    print('Press Ctrl+C to stop.')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServer stopped.')
        server.server_close()
