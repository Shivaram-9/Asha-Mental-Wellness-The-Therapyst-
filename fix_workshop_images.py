import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Workshop 1
html = html.replace('<div class="workshop-card reveal" onclick="openWorkshopModal(\'confidence\')">\n                    <div class="workshop-image"></div>', '<div class="workshop-card reveal" onclick="openWorkshopModal(\'confidence\')">\n                    <div class="workshop-image"><img src="./assets/images/1.jpeg?v=20260324" alt="Building Confidence" style="width: 100%; height: 100%; object-fit: cover;"></div>')

# Workshop 2
html = html.replace('<div class="workshop-card reveal" onclick="openWorkshopModal(\'exam\')">\n                    <div class="workshop-image"></div>', '<div class="workshop-card reveal" onclick="openWorkshopModal(\'exam\')">\n                    <div class="workshop-image"><img src="./assets/images/2.jpeg?v=20260324" alt="Exam Stress" style="width: 100%; height: 100%; object-fit: cover;"></div>')

# Workshop 3
html = html.replace('<div class="workshop-card reveal" onclick="openWorkshopModal(\'parenting\')">\n                    <div class="workshop-image"></div>', '<div class="workshop-card reveal" onclick="openWorkshopModal(\'parenting\')">\n                    <div class="workshop-image"><img src="./assets/images/3.jpeg?v=20260324" alt="Conscious Parenting" style="width: 100%; height: 100%; object-fit: cover;"></div>')

# Workshop 4
html = html.replace('<div class="workshop-card reveal" onclick="openWorkshopModal(\'mindset\')">\n                    <div class="workshop-image"></div>', '<div class="workshop-card reveal" onclick="openWorkshopModal(\'mindset\')">\n                    <div class="workshop-image"><img src="./assets/images/4.jpeg?v=20260324" alt="Winning Mindset" style="width: 100%; height: 100%; object-fit: cover;"></div>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
