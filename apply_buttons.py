import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We will just append the new button styles at the end, and then override or remove old ones.
# Or better, we can replace the old .cta-button block.

# Remove old .cta-button blocks
css = re.sub(r'\.cta-button\s*\{[^}]*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.cta-button\.primary\s*\{[^}]*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.cta-button\.primary:hover\s*\{[^}]*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.cta-button\.secondary\s*\{[^}]*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.cta-button\.secondary:hover\s*\{[^}]*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.cta-button:hover\s*\{[^}]*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.cta-button\.full-width\s*\{[^}]*\}', '', css, flags=re.DOTALL)

# Remove old .theme-toggle and .menu-close and .menu-toggle hover effects that we might have?
# It's safer to just append the new global button system to the very end of styles.css.
# Since it's global, we will prepend it after the base elements, but appending it is fine to override.

new_button_css = '''
/* ==========================================================================
   GLOBAL BUTTON SYSTEM
   ========================================================================== */

/* Base Button Style */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.75rem;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1.05rem;
    cursor: pointer;
    text-decoration: none;
    transition: all var(--transition-normal, 0.2s cubic-bezier(0.4, 0, 0.2, 1));
    font-family: var(--font-sans);
    line-height: 1.5;
    position: relative;
    overflow: hidden;
}

/* Focus State */
.btn:focus-visible, .btn-icon:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 3px;
}

/* Active State */
.btn:active:not(:disabled), .btn-icon:active:not(:disabled) {
    transform: translateY(0) scale(0.98) !important;
}

/* Disabled State */
.btn:disabled, .btn[aria-disabled="true"] {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
    transform: none !important;
    box-shadow: none !important;
}

/* Loading State */
.btn.loading {
    color: transparent !important;
    pointer-events: none;
}

.btn.loading::after {
    content: "";
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    left: calc(50% - 0.6rem);
    top: calc(50% - 0.6rem);
}

.btn-outline.loading::after, .btn-ghost.loading::after {
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top-color: var(--primary);
}

/* Primary Button */
.btn-primary {
    background: var(--primary);
    color: #FFFFFF;
    box-shadow: var(--shadow-sm);
}

.btn-primary:hover:not(:disabled) {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

/* Outline Button */
.btn-outline {
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-medium);
}

.btn-outline:hover:not(:disabled) {
    background: var(--bg-elevated);
    border-color: var(--primary);
    color: var(--primary);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
}

/* Ghost Button */
.btn-ghost {
    background: transparent;
    color: var(--primary);
    padding: 0.5rem 1.25rem;
}

.btn-ghost:hover:not(:disabled) {
    background: var(--bg-elevated);
    transform: translateY(-1px);
}

/* Full Width Utility */
.full-width {
    width: 100%;
}

/* Icon Button Base */
.btn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast, 0.15s ease);
}

.btn-icon:hover:not(:disabled) {
    background: var(--bg-elevated);
    color: var(--primary);
    transform: translateY(-1px);
}

/* Override existing conflicting button styles so the global system works */
.contact-button, .learn-more, .timeline-btn, .workshop-btn {
    border: none !important;
    background: none !important;
    box-shadow: none !important;
    margin: 0 !important;
}

/* Special overrides for dark mode button readability */
body[data-theme="dark"] .btn-primary {
    color: #FAFAF9; /* High contrast text in dark mode */
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    .btn, .btn-icon {
        transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease !important;
        transform: none !important;
    }
    
    .btn:active:not(:disabled), .btn-icon:active:not(:disabled) {
        transform: none !important;
    }
}
'''

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css + "\n" + new_button_css)
