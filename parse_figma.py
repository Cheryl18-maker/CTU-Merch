import re
import json

path = r'C:\Users\nic\.gemini\antigravity\brain\b8035ee9-ea62-4b77-972a-da9698b3d7ff\.system_generated\steps\42\output.txt'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all texts
texts = re.findall(r'<text id="([^"]+)" name="([^"]+)"[^>]*>(.*?)</text>', content)
if not texts:
    texts = re.findall(r'<text id="([^"]+)" name="([^"]+)"[^>]*/>', content)

print(f"Total text nodes: {len(texts)}")
for t in texts[:50]:
    print(t)
