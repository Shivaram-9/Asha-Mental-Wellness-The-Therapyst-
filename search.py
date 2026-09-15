import os
import glob

files = glob.glob('**/*', recursive=True)
for f in files:
    if os.path.isfile(f) and not 'node_modules' in f and not '.git' in f and not 'dist' in f:
        try:
            with open(f, 'r', encoding='utf-8') as file:
                content = file.read()
                if 'Session Booked Successfully' in content or 'Hyderabad' in content:
                    print(f"Found in {f}")
        except:
            pass
