import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix closeModal setTimeout bug
replacement = '''let modalClearTimeout;

function openModal(modalType) {
    if (modalClearTimeout) {
        clearTimeout(modalClearTimeout);
    }
    const modalContent = getModalContent(modalType);
    modalContainer.innerHTML = modalContent;
    modalOverlay.classList.add('active');
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    modalContainer.classList.remove('active');
    document.body.style.overflow = 'auto';
    modalClearTimeout = setTimeout(() => {
        if (!modalContainer.classList.contains('active')) {
            modalContainer.innerHTML = '';
        }
    }, 300);
}'''

js = re.sub(r'function openModal\(modalType\) \{[\s\S]*?\}, 300\);\n\}', replacement, js)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
