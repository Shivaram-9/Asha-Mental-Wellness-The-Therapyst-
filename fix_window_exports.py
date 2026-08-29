import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

exports = '''
window.openGoogleCalendarBooking = openGoogleCalendarBooking;
window.scrollToSection = scrollToSection;
window.openModal = openModal;
window.closeModal = closeModal;
window.openServiceModal = openServiceModal;
window.openExperienceModal = openExperienceModal;
window.openTherapyModal = openTherapyModal;
window.openWorkshopModal = openWorkshopModal;
window.galleryPrev = galleryPrev;
window.galleryNext = galleryNext;
'''

js = re.sub(r'window\.openGoogleCalendarBooking = openGoogleCalendarBooking;.*?window\.openWorkshopModal = openWorkshopModal;', exports, js, flags=re.DOTALL)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
