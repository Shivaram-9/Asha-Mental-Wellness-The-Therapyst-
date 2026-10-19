// Loading screen removed for reliability
import phonepeQrUrl from '../assets/images/phonepe-qr.jpg';

// Sidebar Mobile Toggle
const menuToggle = document.getElementById('menuToggle');
const desktopMenuToggle = document.getElementById('desktopMenuToggle');
const menuClose = document.getElementById('menuClose');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
    if (window.innerWidth > 1024) {
        document.body.classList.toggle('desktop-sidebar-closed');
    } else {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        
        const isOpen = sidebar.classList.contains('open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }
}

if (menuToggle) menuToggle.addEventListener('click', toggleSidebar);
if (desktopMenuToggle) desktopMenuToggle.addEventListener('click', toggleSidebar);
if (menuClose) menuClose.addEventListener('click', toggleSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (sidebar && sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    });
});

// Close mobile drawer if resized to desktop breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Close mobile drawer on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (sidebar && sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    }
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function openGoogleCalendarBooking() {
    const calendarUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit?text=Therapy%20Session%20with%20Asha%20Suhasini%20Raja%20G&details=Please%20share%20your%20concern%20briefly.%20Contact%3A%20asha.suhasinim%40gmail.com&location=Online%20Session&add=asha.suhasinim%40gmail.com';
    window.open(calendarUrl, '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    if (isNaN(target)) return;
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 1500;
    const step = Math.max(1, target / (duration / 16));
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Trigger counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(counter => {
                animateCounter(counter);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

reveals.forEach(element => {
    revealObserver.observe(element);
});

// Modal System
const modalOverlay = document.getElementById('modalOverlay');
const modalContainer = document.getElementById('modalContainer');

let modalClearTimeout;

function openModal(modalType) {
    if (modalClearTimeout) {
        clearTimeout(modalClearTimeout);
    }
    if (typeof sidebar !== 'undefined' && sidebar && sidebar.classList.contains('open')) {
        toggleSidebar();
    }
    const modalContent = getModalContent(modalType);
    modalContainer.innerHTML = modalContent;
    modalOverlay.classList.add('active');
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Set min date if bookingDate exists
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

function closeModal() {
    currentGalleryIndex = -1;
    modalOverlay.classList.remove('active');
    modalContainer.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (modalClearTimeout) clearTimeout(modalClearTimeout);
    modalClearTimeout = setTimeout(() => {
        if (!modalContainer.classList.contains('active')) {
            modalContainer.innerHTML = '';
        }
    }, 300);
}

// Modal Content Generator
function getModalContent(modalType) {
    const modals = {
        educationModal: `
            <div class="modal-header">
                <h2> Education & Qualifications</h2>
                <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
            </div>
            <div class="modal-body">
                <h3>Post-Graduation Diploma in Family and Marital Therapy</h3>
                <p><strong>Period:</strong> 2003 &ndash; 2005</p>
                <p><strong>Institution:</strong> S.N.D.T. Women's University / Bandra Family Court, Mumbai</p>
                <p>Clinical internship and Assistant Psychotherapist clinical work at Bandra Family Court, preparing psychological evaluations for divorce, custody, and reconciliation cases.</p>

                <h3>Master's in Clinical Psychology (M.A.)</h3>
                <p><strong>Year:</strong> 2003</p>
                <p><strong>Institution:</strong> S.N.D.T. Women's University, Mumbai</p>
                <p>Specialization in Clinical Psychology, psychological assessments, personality disorders, and evidence-based psychotherapy.</p>

                <h3>Bachelor's in Psychology (B.A.)</h3>
                <p><strong>Year:</strong> 2000</p>
                <p><strong>Institution:</strong> S.N.D.T. Women's University, Mumbai</p>
                <p>Specialization in Child Psychology, developmental stages, learning behaviors, and childhood emotional health.</p>

                <h3>Clinical Therapeutic Expertise</h3>
                <ul>
                    <li>Cognitive Behavioural Therapy (CBT) & Rational Emotive Behaviour Therapy (REBT/RET)</li>
                    <li>Gestalt Therapy & Solution-Focused Brief Therapy (SFBT)</li>
                    <li>Family & Marital Therapy (FMT)</li>
                    <li>EMDR (Eye Movement Desensitization and Reprocessing) &ndash; Level One (2002)</li>
                    <li>Critical Incident Stress Debriefing (CISD) Facilitation</li>
                    <li>School Counselling & Special Educational Needs (LD / ASD early intervention)</li>
                </ul>
            </div>
        `,
        certificationModal: `
            <div class="modal-header">
                <h2> Professional Registrations & Certifications</h2>
                <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
            </div>
            <div class="modal-body">
                <h3>Professional Registrations</h3>
                <p><strong>Counsellors Council of India (CCI)</strong></p>
                <p>Registration Number: <strong>CRN9047214</strong></p>
                <p>Validates certified professional counselling credentials, ethical standards, and clinical practice compliance.</p>

                <p><strong>International Association of Holistic Psychology</strong></p>
                <p>Registered Member</p>
                
                <h3>Specialized Certifications & Training</h3>
                <ul>
                    <li><strong>EMDR Level One (2002):</strong> Eye Movement Desensitization and Reprocessing for trauma processing.</li>
                    <li><strong>CISD Facilitator:</strong> Critical Incident Stress Debriefing for acute crisis intervention in MNCs and corporate environments.</li>
                    <li><strong>HIV/AIDS Counselling (2002&ndash;2003):</strong> MSACS / NACO PMTCT pilot study project protocol.</li>
                    <li><strong>Life Skills & Leadership Coach:</strong> Customized youth, student, and corporate leadership programs.</li>
                    <li><strong>Responsible Gaming (RG) Risk Management:</strong> Suicide threat neutralization and crisis escalation intervention.</li>
                </ul>
                
                <h3>Languages Known</h3>
                <p>Fluent clinical and professional proficiency in <strong>English, Hindi, Marathi, and Telugu</strong>.</p>
            </div>
        `,
        specializationModal: `
            <div class="modal-header">
                <h2> Areas of Specialization</h2>
                <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
            </div>
            <div class="modal-body">
                <h3>Clinical Specializations</h3>
                <ul>
                    <li><strong>Individual Therapy:</strong> Depression, anxiety, stress management, self-esteem issues</li>
                    <li><strong>Relationship Counselling:</strong> Marital therapy, family conflicts, communication issues</li>
                    <li><strong>Trauma Recovery:</strong> PTSD, grief counselling, critical incident stress</li>
                    <li><strong>Academic Counselling:</strong> Exam stress, career guidance, study skills</li>
                </ul>
                
                <h3>Professional Expertise</h3>
                <ul>
                    <li>Corporate mental wellness programs</li>
                    <li>Workplace stress management</li>
                    <li>Leadership coaching and development</li>
                    <li>Life skills training</li>
                </ul>
                
                <h3>Special Populations</h3>
                <ul>
                    <li>Children and adolescents</li>
                    <li>Young adults and professionals</li>
                    <li>Parents and families</li>
                    <li>Corporate executives</li>
                </ul>
            </div>
        `,
        bookingModal: `
            <div class="modal-header">
                <h2> Book a Session</h2>
                <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
            </div>
            <div class="modal-body">
                <h3>Session Types</h3>
                <ul>
                    <li><strong>Individual Therapy:</strong> 50-minute sessions for personal mental health support</li>
                    <li><strong>Couples/Family Therapy:</strong> 60-minute sessions for relationship counselling</li>
                    <li><strong>Corporate Consultation:</strong> Customized programs for organizations</li>
                    <li><strong>Life Coaching:</strong> Goal-oriented sessions for personal development</li>
                </ul>
                
                <h3>Session Formats</h3>
                <p> Online video consultations</p>
                <p> Phone consultations</p>
                
                
                <h3>Schedule a Session</h3>
                <div class="booking-system" id="bookingSystem">
                    <div class="form-field">
                        <label for="bookingService">Select Service / Therapy</label>
                        <select id="bookingService" class="form-input form-select" onchange="handleServiceChange()" required>
                            <option value="" disabled selected>Select a service</option>
                            <option value="individual-therapy">Individual Therapy / Counselling</option>
                            <option value="family-therapy">Family Therapy / Counselling</option>
                            <option value="marital-therapy">Marital Therapy / Counselling</option>
                            <option value="pre-marital">Pre-Marital Counselling</option>
                            <option value="student-therapy-60">Student Counselling / Therapy — 45–60 min (₹599)</option>
                            <option value="student-therapy-30">Student Counselling / Therapy — 30 min (₹299)</option>
                            <option value="consultation">Consultation</option>
                        </select>
                    </div>
                    <div id="serviceDetailsBox" class="service-details-box">
                        <div id="servicePrompt" class="service-prompt">
                            Please select a service above to view session duration and fee.
                        </div>
                        <div id="serviceSummary" class="service-summary" style="display: none;">
                            <div class="service-summary-row">
                                <span class="summary-label">Selected Service:</span>
                                <span id="selectedServiceName" class="summary-value">—</span>
                            </div>
                            <div class="service-summary-row">
                                <span class="summary-label">Session Duration:</span>
                                <span id="selectedServiceDuration" class="summary-value">—</span>
                            </div>
                            <div class="service-summary-row summary-fee-row">
                                <span class="summary-label">Consultation Fee:</span>
                                <span id="selectedServiceFee" class="summary-fee">—</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-field">
                        <label for="bookingDate">Select Date</label>
                        <input type="date" id="bookingDate" class="form-input" min="2026-08-29" onchange="renderTimeSlots()">
                    </div>
                    <div class="form-field">
                        <label id="slotLabel">Available Slots</label>
                        <div id="timeSlots" class="time-slots-grid">
                            <p class="text-muted">Please select a date first.</p>
                        </div>
                    </div>
                    <div id="bookingFormDetails" style="display:none; margin-top: 1rem;">
                        <input type="hidden" id="selectedSlot">
                        <div class="form-field">
                            <input type="text" id="bookingName" placeholder="Your Name" class="form-input" required>
                        </div>
                        <div class="form-field">
                            <input type="email" id="bookingEmail" placeholder="Your Email" class="form-input" required>
                        </div>
                        <button class="btn btn-primary full-width" onclick="confirmBooking()">Confirm Booking</button>
                    </div>
                    <div id="bookingSuccessMessage" style="display:none; margin-top: 1rem; padding: 1.25rem; background: rgba(130, 168, 157, 0.12); border: 1px solid rgba(130, 168, 157, 0.35); color: var(--primary); border-radius: 12px;">
                    </div>

                    <!-- Dedicated Payment Step / Section -->
                    <div id="bookingPaymentSection" class="booking-payment-section" style="display:none; margin-top: 1.5rem;">
                        <div class="payment-header">
                            <h3 class="payment-title">Complete Your Payment</h3>
                            <p class="payment-subtitle">Scan & Pay Using PhonePe or Any Supported UPI App</p>
                        </div>

                        <!-- Service & Fee Summary Card -->
                        <div class="payment-summary-card">
                            <div class="payment-summary-row">
                                <span class="payment-label">Selected Service:</span>
                                <span id="paymentServiceName" class="payment-value">—</span>
                            </div>
                            <div class="payment-summary-row">
                                <span class="payment-label">Session Duration:</span>
                                <span id="paymentServiceDuration" class="payment-value">—</span>
                            </div>
                            <div class="payment-summary-row payment-amount-row">
                                <span class="payment-label">Exact Amount Payable:</span>
                                <span id="paymentAmountPayable" class="payment-fee">—</span>
                            </div>
                        </div>

                        <!-- PhonePe QR Code Container -->
                        <div class="payment-qr-container">
                            <img id="paymentQrImage" src="${phonepeQrUrl || './assets/images/phonepe-qr.jpg'}" alt="PhonePe QR Code - GULLA ASHA SUHASINI RAJA" class="payment-qr-img">
                        </div>

                        <!-- Account Details Card with Copy UPI ID -->
                        <div class="payment-account-card">
                            <div class="account-row">
                                <span class="account-label">Payment Account Name:</span>
                                <span class="account-value">GULLA ASHA SUHASINI RAJA</span>
                            </div>
                            <div class="account-row upi-row">
                                <span class="account-label">UPI ID:</span>
                                <div class="upi-copy-wrap">
                                    <code class="upi-id-code" id="upiIdText">8019749608@ybl</code>
                                    <button type="button" class="btn-copy-upi" onclick="copyUpiId()" id="copyUpiBtn" title="Copy UPI ID">
                                        <span id="copyUpiText">Copy UPI ID</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Instructions & Pending Notice -->
                        <div class="payment-notice-box">
                            <p><strong>Instruction:</strong> Please pay the exact amount of <span id="noticeAmount" style="font-weight:700; color:#92400e;">—</span> shown above using PhonePe, Google Pay, Paytm, or any UPI app.</p>
                            <p class="notice-pending-note"><strong>Please Note:</strong> Your booking is pending until the payment is verified.</p>
                        </div>

                        <!-- Payment Submission Form -->
                        <form id="paymentSubmissionForm" onsubmit="event.preventDefault(); submitPaymentDetails();" class="payment-form">
                            <h4 style="margin-top: 1.25rem; margin-bottom: 0.75rem; color: var(--primary);">Submit Payment Reference</h4>
                            
                            <div class="form-field">
                                <label for="paymentUtr">UTR / Transaction Reference Number <span style="color:#c62828;">*</span></label>
                                <input type="text" id="paymentUtr" class="form-input" placeholder="e.g. 12-digit UPI / UTR Ref No." required autocomplete="off">
                                <small class="form-helper">Enter the 12-digit transaction reference (UTR) from your payment app receipt.</small>
                            </div>

                            <div class="form-field" style="margin-top: 1rem;">
                                <label for="paymentScreenshot">Payment Screenshot <span class="text-muted">(Optional)</span></label>
                                <input type="file" id="paymentScreenshot" class="form-input" accept="image/jpeg,image/png,image/webp">
                                <small class="form-helper">Optional screenshot of receipt (JPG, PNG, max 2MB).</small>
                            </div>

                            <div class="form-field checkbox-field" style="margin-top: 1rem;">
                                <label class="checkbox-label" for="paymentConfirmCheck">
                                    <input type="checkbox" id="paymentConfirmCheck" required>
                                    <span>I have completed the payment for the amount shown above.</span>
                                </label>
                            </div>

                            <div style="margin-top: 1.25rem;">
                                <button type="submit" id="submitPaymentBtn" class="btn btn-primary full-width">
                                    Submit Payment Details
                                </button>
                            </div>
                        </form>

                        <div id="paymentStatusMessage" class="payment-status-message" style="display: none; margin-top: 1.25rem;">
                        </div>
                    </div>
                </div>
                
                <p style="margin-top: 2rem; padding: 1.5rem; background: #FDFCF9; border: 1px solid rgba(130, 168, 157, 0.15); border-radius: 15px;">
                    <strong>Note:</strong> First consultations include a comprehensive assessment to understand your needs and create a personalized treatment plan.
                </p>

            </div>
        `,
        inquiryModal: `
            <div class="modal-header">
                <h2> General Inquiry</h2>
                <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
            </div>
            <div class="modal-body">
                <h3>Get in Touch</h3>
                <p>For general inquiries about services, workshops, or corporate programs, please reach out through the following channels:</p>
                
                <div style="background: #FDFCF9; border: 1px solid rgba(130, 168, 157, 0.15); padding: 1.5rem; border-radius: 15px; margin: 1.5rem 0;">
                    <h4 style="margin-top: 0;"> Email</h4>
                    <p>asha.suhasinim@gmail.com</p>
                    
                    <h4> Location</h4>
                    <p>Online Sessions Only</p>
                    
                    <h4> Response Time</h4>
                    <p>Typically within 24-48 hours</p>
                </div>
                
                <h3>What to Include in Your Message</h3>
                <ul>
                    <li>Your name and contact information</li>
                    <li>Type of service you're interested in</li>
                    <li>Preferred session format (online)</li>
                    <li>Any specific questions or concerns</li>
                </ul>
                
                <p style="margin-top: 1.5rem;">All inquiries are treated with complete confidentiality and professionalism.</p>
            </div>
        `
    };
    
    return modals[modalType] || '';
}

// Service Modal Content
function openServiceModal(serviceType) {
    if (typeof modalClearTimeout !== "undefined" && modalClearTimeout) clearTimeout(modalClearTimeout);
    const services = {
        individual: {
            title: ' Individual Therapy',
            description: 'Personalized one-on-one psychotherapy sessions designed to address your unique mental health needs.',
            details: [
                'Evidence-based therapeutic approaches including CBT, REBT, and DBT',
                'Treatment for depression, anxiety, stress, and other mental health concerns',
                'Personalized treatment plans tailored to your specific goals',
                'Safe, confidential, and non-judgmental environment',
                'Focus on building coping strategies and emotional resilience'
            ],
            duration: '50-minute sessions',
            format: 'Available online'
        },
        family: {
            title: ' Family & Marital Therapy',
            description: 'Strengthen relationships and resolve conflicts through compassionate family and couples counselling.',
            details: [
                'Improve communication and understanding between family members',
                'Address marital conflicts and relationship challenges',
                'Navigate major life transitions together',
                'Develop healthy relationship patterns',
                'Create stronger emotional bonds'
            ],
            duration: '60-minute sessions',
            format: 'Online options available'
        },
        corporate: {
            title: ' Corporate Wellness',
            description: 'Comprehensive mental health programs designed to enhance workplace well-being and productivity.',
            details: [
                'Employee counselling and support services',
                'Stress management workshops',
                'Leadership coaching programs',
                'Team building and communication training',
                'Crisis intervention and support',
                'Customized wellness initiatives'
            ],
            duration: 'Flexible program duration',
            format: 'On-site and virtual programs'
        },
        coaching: {
            title: ' Life Skills Coaching',
            description: 'Personalized coaching programs to build confidence, achieve goals, and develop lasting resilience.',
            details: [
                'Goal setting and achievement strategies',
                'Building self-confidence and self-esteem',
                'Developing effective communication skills',
                'Time management and productivity',
                'Emotional intelligence development',
                'Career guidance and professional development'
            ],
            duration: 'Customized session length',
            format: 'Individual and group coaching available'
        },
        trauma: {
            title: ' Trauma Counselling',
            description: 'Specialized support for healing from traumatic experiences and critical incidents.',
            details: [
                'PTSD treatment and management',
                'Grief and loss counselling',
                'Critical Incident Stress Debriefing (CISD)',
                'Trauma-informed therapeutic approaches',
                'Building post-traumatic resilience',
                'Safe processing of difficult experiences'
            ],
            duration: 'Flexible based on needs',
            format: 'Sensitive, confidential support'
        },
        student: {
            title: ' Student Counselling',
            description: 'Academic support and personal development guidance for students of all ages.',
            details: [
                'Exam stress and academic pressure management',
                'Career guidance and educational planning',
                'Study skills and time management',
                'Social and emotional development',
                'Peer relationship issues',
                'Building confidence and self-esteem'
            ],
            duration: '45-50 minute sessions',
            format: 'Age-appropriate counselling methods'
        }
    };
    
    const service = services[serviceType];
    if (!service) return;
    
    const modalContent = `
        <div class="modal-header">
            <h2>${service.title}</h2>
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 1.5rem;">${service.description}</p>
            
            <h3>What to Expect</h3>
            <ul>
                ${service.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
            
            <div style="background: #FDFCF9; border: 1px solid rgba(130, 168, 157, 0.15); padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <p><strong>Session Duration:</strong> ${service.duration}</p>
                <p style="margin-bottom: 0;"><strong>Format:</strong> ${service.format}</p>
            </div>
            
            <button class="btn btn-primary contact-button" style="margin-top: 2rem; width: 100%;" onclick="closeModal(); openModal('bookingModal')"><span>
                Book a Session
            </span></button>
        </div>
    `;
    
    modalContainer.innerHTML = modalContent;
    modalOverlay.classList.add('active');
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Set min date if bookingDate exists
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

// Experience Modal Content
function openExperienceModal(orgType) {
    if (typeof modalClearTimeout !== "undefined" && modalClearTimeout) clearTimeout(modalClearTimeout);
    const experiences = {
        klh: {
            title: 'KLH University',
            role: 'Consulting Psychotherapist',
            period: '2023 - Present',
            location: 'Hyderabad',
            description: 'Providing comprehensive psychological support to university students and faculty members.',
            responsibilities: [
                'Individual counselling for students dealing with academic stress and personal challenges',
                'Conducting mental health awareness workshops and psychoeducation seminars',
                'Crisis intervention, emotional regulation, and psychological first aid',
                'Collaborating with faculty to create a supportive campus environment',
                'Developing mental wellness programs for the university community'
            ]
        },
        modern: {
            title: 'Modern Health',
            role: '(Affiliate) Mental Wellness Consultant & Psychotherapist for India',
            period: 'Oct 2021 - Present',
            location: 'Arizona, USA / Remote',
            description: 'Delivering evidence-based teletherapy and corporate mental wellness consulting for multinational companies in Hyderabad and international clientele.',
            responsibilities: [
                'Counselling individuals and adults with emotional challenges, mood regulation, and life transitions',
                'Corporate wellness consultant for multinational corporations (MNCs) in Hyderabad',
                'Providing evidence-based teletherapy to diverse international clients through a leading digital mental health platform',
                'Maintaining highest clinical standards of care, confidentiality, and ethics in virtual settings',
                'Adapting therapeutic approaches for online delivery with global accessibility'
            ]
        },
        private: {
            title: 'Private Practice',
            role: 'Psychological Wellness Consultant & Psychotherapist',
            period: 'April 2014 - Present',
            location: 'Hyderabad / Online Sessions',
            description: 'Independent private practice providing evidence-based psychotherapy, child & adolescent guidance, and family counselling globally.',
            responsibilities: [
                'Practicing through virtual platforms and clinical consultations for individual and family mental health needs',
                'Counselling individuals with mental and emotional health challenges, marital discord, and parenting issues',
                'Identifying younger age groups with Autism Spectrum Disorder (ASD), Learning Difficulties (LD), and developmental delays, guiding families toward early intervention',
                'Counselling adolescents and young adults with anxiety, performance fear, and exam stress',
                'Restructuring and regulating emotional patterns with evidence-based therapies (CBT, SFBT, Gestalt, REBT, Family Therapy)'
            ]
        },
        hdw: {
            title: 'Head Digital Works (A23 Gaming)',
            role: 'Senior Psychological Consultant & Psychotherapist (RG Escalations)',
            period: 'March 2023 - September 2023',
            location: 'Hyderabad (Full-time)',
            description: 'Full-time Senior Psychological Consultant for Responsible Gaming (RG) escalation calls and clinical risk management.',
            responsibilities: [
                'Guiding the Responsible Gaming care team in managing suicide threats and acute crisis escalation calls',
                'Leading the team in handling calls related to gaming addictions, distress, and financial vulnerabilities',
                'Successfully neutralizing players suicide threat calls and establishing crisis de-escalation protocols',
                'Created RG website page content, employee presentations, and training modules to build empathy-oriented communication',
                'Contributed to call audit sheet revisions, coaching executives to handle unexpected hostility and temper lash-outs calmly'
            ]
        },
        mbr: {
            title: 'Mind Body Resolve',
            role: 'Chief Psychotherapist for Counselling & Therapeutic Strategies',
            period: 'May 2022 - January 2023',
            location: 'Hyderabad',
            description: 'Executive clinical leadership, senior trauma consultant for VIP clients, and single point of contact for corporate wellness webinars.',
            responsibilities: [
                'Senior consultant for trauma counselling for VIP and executive clients',
                'Single point of contact (POC) for MNCs for finalizing and conducting corporate mental wellness webinars',
                'Led and supervised a multidisciplinary team of 10 psychologists and therapists on board',
                'Chief content editor for mental health communications, social platforms, client follow-ups, and email promotions',
                'Developed and executed evidence-based therapeutic programs across corporate and private sectors'
            ]
        },
        nift: {
            title: 'NIFT Hyderabad',
            role: 'Guest Faculty & Leadership Coach',
            period: 'September 2021 - May 2022',
            location: 'Hyderabad',
            description: 'Guest faculty leading specially designed leadership and emotional intelligence programs for students.',
            responsibilities: [
                'Leadership coach for specially designed student leadership programs',
                'Conducted interactive modules on emotional intelligence, transition management, and decision-making',
                'Provided mentorship to help students navigate creative performance anxiety and professional transitions',
                'Fostered self-confidence, interpersonal communication, and constructive conflict resolution',
                'Received consistent positive feedback from students and academic administration'
            ]
        },
        morneau: {
            title: 'Morneau Shepell',
            role: '(Affiliate) Specialist in CISD Services & Trauma Counselling',
            period: 'May 2021 - May 2022',
            location: 'Canada / India (Remote)',
            description: 'Specialist trauma counsellor and Critical Incident Stress Debriefing (CISD) facilitator for multinational corporations in India.',
            responsibilities: [
                'Provided acute trauma counselling and grief support during the pandemic',
                'Facilitated Critical Incident Stress Debriefing (CISD) for corporate teams facing critical incidents',
                'Emergency psychological response and acute crisis intervention for MNCs across India',
                'Trained corporate personnel on stress management techniques and psychological first aid',
                'Received exceptional reviews and commendations from multinational corporate partners'
            ]
        },
        manah: {
            title: 'Manah Wellness',
            role: 'Senior Mental Wellness Consultant',
            period: 'Prior Engagement',
            location: 'Remote',
            description: 'Affiliated as a senior consultant delivering teletherapy and corporate mental wellness programs.',
            responsibilities: [
                'Remote counselling and psychotherapy for diverse employee populations',
                'Mental wellness program development and client mental health assessments',
                'Collaborative care with multidisciplinary corporate health teams',
                'Supporting individuals across different time zones with structured therapeutic interventions'
            ]
        },
        jain: {
            title: 'Jain Heritage International Cambridge School',
            role: 'Student Counsellor (Part Time)',
            period: 'June 2018 - March 2020 & Dec 2014 - Aug 2016',
            location: 'Kondapur, Hyderabad',
            description: 'Student counsellor delivering holistic emotional, behavioural, and educational guidance across two distinct tenures.',
            responsibilities: [
                'Counselling students facing emotional, behavioural, and educational challenges',
                'Identifying children with special educational needs (SEN) and guiding families toward early intervention and therapy',
                'Conducting workshops for teaching and non-teaching staff on child development and emotional learning',
                'Delivered regular motivating talks, building trust and bridging communication gaps between teachers, students, and parents',
                'Assured delivery of quality support through constant feedback surveys with Principal, teachers, and students'
            ]
        },
        hcsipl: {
            title: 'HCSIPL',
            role: 'Corporate Trainer & Communication Coach (Part Time)',
            period: 'May 2019 - October 2019',
            location: 'Hi-Tech City, Hyderabad',
            description: 'Corporate trainer and communication coach helping individuals optimize their workplace potential and communication effectiveness.',
            responsibilities: [
                'Coaching corporate professionals to realize their peak personal and professional potential',
                'Conducting targeted communication workshops and interpersonal skills training',
                'Fostering workplace emotional resilience, assertive communication, and professional confidence',
                'Received consistent positive feedback from participants and corporate management'
            ]
        },
        hyundai: {
            title: 'Hyundai Mobis',
            role: 'Affiliate Psychological Consultant (Part Time)',
            period: 'June 2018 - October 2018',
            location: 'Mindspace, Hyderabad',
            description: 'Corporate psychological consultant delivering employee counselling, transition workshops, and suicide awareness programs.',
            responsibilities: [
                'Counselled adults on workplace stress, performance anxiety, depression, decision-making, and marital challenges',
                'Conducted transition anxiety and performance enhancement workshops for new and young joiners',
                'Conducted focused suicide sensitization workshops, equipping employees with practical stress control techniques',
                'Applied scientifically proven modalities including SFBT, Gestalt, RET, and CBT to resolve complex personal and workplace concerns',
                'Received widespread positive feedback, with clients consistently referring colleagues for support'
            ]
        },
        birbal: {
            title: 'Birbal Life Solutions',
            role: 'Senior Consulting Psychologist & Psychotherapist (Part Time)',
            period: 'March 2017 - December 2018',
            location: 'Hitech City, Hyderabad',
            description: 'Senior consulting psychologist delivering psychotherapy, marital discord counselling, and customized corporate/school workshops.',
            responsibilities: [
                'Counselling individuals and families facing mental health challenges, marital discord, parenting issues, and teen challenges',
                'Designing and conducting customized psychological packages and workshops for schools and colleges',
                'Facilitating teen life-skills programs, career guidance packages, and public mental health seminars',
                'Delivering corporate counselling and stress management workshops across high-demand sectors',
                'Received consistent positive feedback from clients, families, and educational institutions'
            ]
        },
        hal: {
            title: 'HAL Secondary School',
            role: 'Student Counsellor (Contract)',
            period: 'June 2010 - November 2014',
            location: 'HAL Campus, Balanagar, Secunderabad',
            description: 'Appointed as the first school counsellor in HAL School history, providing comprehensive emotional and developmental support.',
            responsibilities: [
                'Counselled students across pre-school, primary, middle, and secondary school levels',
                'Identified learning difficulties (LD) and developmental delays, guiding families toward appropriate clinical intervention',
                'Officially implemented and endorsed CBSE concession guidelines for special children in collaboration with the Principal',
                'Designed and conducted 3-day life skills workshops for teens on transition stages, peer pressure, anger management, and college readiness',
                'Conducted teacher training workshops on learning disabilities and emotional disturbances, equipping educators with screening tools'
            ]
        },
        children: {
            title: 'Children Hospital',
            role: 'Psychological Consultant & Psychotherapist',
            period: 'November 2005 - June 2010',
            location: 'KPHB, Kukatpally, Hyderabad',
            description: 'Clinical psychological consultant affiliated with pediatricians, undertaking referred child and adult cases.',
            responsibilities: [
                'Clinical psychological assessment and psychotherapy for referred pediatric and adult cases',
                'Diagnostic evaluations for developmental, behavioral, and emotional challenges in children',
                'Parental counselling and family guidance for managing childhood emotional and learning difficulties',
                'Established collaborative care pathways with medical pediatric specialists',
                'Maintained consistent positive feedback from parents and healthcare professionals'
            ]
        },
        manoshakthi: {
            title: 'Manoshakthi Psychological Services (Bandra Family Court)',
            role: 'Intern Clinical Psychologist & Assistant Psychotherapist',
            period: 'September 2003 - January 2005',
            location: 'Bandra Family Court, Mumbai',
            description: 'Clinical psychologist intern and assistant psychotherapist providing clinical assessments and court-assisting reports under Dr. Lakshmipriya.',
            responsibilities: [
                'Counselling couples and families undergoing divorce and reconciliation proceedings',
                'Providing specialized counselling for children and parents regarding child access and custody',
                'Conducting clinical psychological assessments and preparing unbiased mental health status reports to assist judges',
                'Applied effective therapeutic techniques and strategies yielding positive reconciliation and resolution outcomes',
                'Commended for outstanding clinical performance and handling complex high-conflict domestic cases'
            ]
        },
        mgm: {
            title: 'MGM Hospital',
            role: 'HIV/AIDS Counsellor (MSACS / PMTCT Pilot Project)',
            period: 'June 2002 - March 2003',
            location: 'Kalamboli, New Mumbai',
            description: 'Appointed counsellor on behalf of Maharashtra State AIDS Control Society (MSACS) in their landmark PMTCT pilot study under NACO guidelines.',
            responsibilities: [
                'Provided pre-test and post-test counselling to HIV-positive patients and couples, alleviating acute emotional distress',
                'Evaluated the administration of single-dose Nevirapine in reducing viral transmission during labour under NACO PMTCT protocol',
                'Delivered compassionate psycho-social support to pregnant mothers and vulnerable families',
                'Maintained strict clinical ethics, confidentiality, and medical coordination during high-stress obstetrical care'
            ]
        }
    };
    
    const exp = experiences[orgType];
    if (!exp) return;
    
    const modalContent = `
        <div class="modal-header">
            <h2>${exp.title}</h2>
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            <div style="background: rgba(130, 168, 157, 0.15); border: 1px solid rgba(130, 168, 157, 0.3); color: var(--text-primary); padding: 1rem 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                <p style="margin: 0; font-weight: 600;">${exp.role}</p>
                <p style="margin: 0.3rem 0 0 0; opacity: 0.9;">${exp.period}  ${exp.location}</p>
            </div>
            
            <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 1.5rem;">${exp.description}</p>
            
            <h3>Key Responsibilities</h3>
            <ul>
                ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
        </div>
    `;
    
    modalContainer.innerHTML = modalContent;
    modalOverlay.classList.add('active');
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Set min date if bookingDate exists
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

// Therapy Method Modal Content
function openTherapyModal(methodType) {
    if (typeof modalClearTimeout !== "undefined" && modalClearTimeout) clearTimeout(modalClearTimeout);
    const methods = {
        cbt: {
            title: 'Cognitive Behavioural Therapy (CBT)',
            description: 'CBT is a structured, goal-oriented therapy that focuses on identifying and changing negative thought patterns and behaviors.',
            benefits: [
                'Effective for treating depression, anxiety, and stress',
                'Practical strategies for managing difficult situations',
                'Focus on present problems and solutions',
                'Teaches skills that last a lifetime',
                'Evidence-based approach with proven results'
            ],
            ideal: 'Ideal for individuals dealing with anxiety, depression, phobias, and stress-related disorders.'
        },
        rebt: {
            title: 'Rational Emotive Behaviour Therapy (REBT)',
            description: 'REBT helps identify irrational beliefs and replace them with healthier, more rational thoughts.',
            benefits: [
                'Challenge and change irrational thinking patterns',
                'Develop emotional resilience',
                'Take responsibility for emotions and behaviors',
                'Build unconditional self-acceptance',
                'Achieve long-term emotional well-being'
            ],
            ideal: 'Perfect for those looking to transform negative thinking and build stronger emotional health.'
        },
        dbt: {
            title: 'Dialectical Behaviour Therapy (DBT)',
            description: 'DBT combines cognitive-behavioral techniques with mindfulness practices to help regulate emotions.',
            benefits: [
                'Enhanced emotional regulation',
                'Improved interpersonal effectiveness',
                'Mindfulness and distress tolerance skills',
                'Effective for borderline personality disorder',
                'Reduces self-destructive behaviors'
            ],
            ideal: 'Beneficial for individuals with intense emotions and relationship difficulties.'
        },
        sfbt: {
            title: 'Solution-Focused Brief Therapy (SFBT)',
            description: 'SFBT is a goal-directed approach that focuses on solutions rather than problems.',
            benefits: [
                'Quick, efficient therapeutic process',
                'Focus on strengths and resources',
                'Goal-oriented and practical',
                'Empowers clients to find their own solutions',
                'Positive, future-focused approach'
            ],
            ideal: 'Great for individuals seeking specific, achievable goals in a shorter timeframe.'
        },
        fmt: {
            title: 'Family & Marital Therapy (FMT)',
            description: 'FMT addresses relationship issues and family dynamics to improve communication and resolve conflicts.',
            benefits: [
                'Improved family communication',
                'Conflict resolution strategies',
                'Strengthened emotional bonds',
                'Better understanding of family roles',
                'Healthier relationship patterns'
            ],
            ideal: 'Essential for families and couples facing relationship challenges or major transitions.'
        },
        gestalt: {
            title: 'Gestalt Therapy',
            description: 'Gestalt therapy emphasizes personal responsibility and focuses on present experience and awareness.',
            benefits: [
                'Increased self-awareness',
                'Better emotional expression',
                'Living in the present moment',
                'Personal growth and authenticity',
                'Improved relationships and communication'
            ],
            ideal: 'Suitable for those seeking deeper self-understanding and personal growth.'
        }
    };
    
    const method = methods[methodType];
    if (!method) return;
    
    const modalContent = `
        <div class="modal-header">
            <h2>${method.title}</h2>
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 1.5rem;">${method.description}</p>
            
            <h3>Key Benefits</h3>
            <ul>
                ${method.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
            
            <div style="background: rgba(235, 215, 215, 0.3); border: 1px solid rgba(235, 215, 215, 0.5); color: var(--text-primary); padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <h4 style="margin-top: 0; color: var(--primary); font-family: var(--font-display);">Best For</h4>
                <p style="margin: 0;">${method.ideal}</p>
            </div>
        </div>
    `;
    
    modalContainer.innerHTML = modalContent;
    modalOverlay.classList.add('active');
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Set min date if bookingDate exists
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

// Workshop Modal Content
function openWorkshopModal(workshopType) {
    if (typeof modalClearTimeout !== "undefined" && modalClearTimeout) clearTimeout(modalClearTimeout);
    const workshops = {
        confidence: {
            title: 'Building Confidence in Children',
            description: 'Empowering young minds with self-belief and resilience.',
            content: [
                'Understanding child psychology and development',
                'Techniques to boost self-esteem in children',
                'Handling criticism and building resilience',
                'Encouraging positive self-talk',
                'Creating supportive home environments',
                'Practical exercises for parents and educators'
            ],
            duration: '2-3 hours interactive workshop',
            audience: 'Parents, teachers, and caregivers'
        },
        exam: {
            title: 'Managing Exam Stress',
            description: 'Proven techniques for academic success and stress reduction.',
            content: [
                'Understanding exam anxiety and its effects',
                'Effective study techniques and time management',
                'Relaxation and mindfulness exercises',
                'Building confidence before exams',
                'Handling performance pressure',
                'Post-exam coping strategies'
            ],
            duration: '2 hours interactive session',
            audience: 'Students, parents, and educators'
        },
        parenting: {
            title: 'Conscious Parenting',
            description: 'Building deeper emotional connections with your children.',
            content: [
                'Understanding emotional intelligence in parenting',
                'Effective communication with children',
                'Setting healthy boundaries with love',
                'Dealing with challenging behaviors',
                'Building trust and emotional security',
                'Creating mindful family practices'
            ],
            duration: '3-hour comprehensive workshop',
            audience: 'Parents and expecting parents'
        },
        mindset: {
            title: 'Developing a Winning Mindset',
            description: 'Cultivating resilience, determination, and success orientation.',
            content: [
                'Growth mindset vs fixed mindset',
                'Overcoming limiting beliefs',
                'Goal setting and achievement strategies',
                'Building mental toughness',
                'Handling failure and setbacks',
                'Developing positive habits'
            ],
            duration: 'Half-day workshop',
            audience: 'Professionals, students, and individuals'
        }
    };
    
    const workshop = workshops[workshopType];
    if (!workshop) return;
    
    const modalContent = `
        <div class="modal-header">
            <h2>${workshop.title}</h2>
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 1.5rem;">${workshop.description}</p>
            
            <h3>Workshop Content</h3>
            <ul>
                ${workshop.content.map(item => `<li>${item}</li>`).join('')}
            </ul>
            
            <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <p><strong>Duration:</strong> ${workshop.duration}</p>
                <p style="margin-bottom: 0;"><strong>Target Audience:</strong> ${workshop.audience}</p>
            </div>
            
            <p style="margin-top: 1.5rem; padding: 1rem; background: #FDFCF9; border-radius: 10px; border: 1px solid rgba(130, 168, 157, 0.2); border-left: 4px solid rgba(130, 168, 157, 0.8);">
                <strong>Note:</strong> Workshops can be customized for schools, corporate organizations, and community groups.
            </p>
            
            <button class="btn btn-primary contact-button" style="margin-top: 2rem; width: 100%;" onclick="closeModal(); openModal('inquiryModal')"><span>
                Inquire About This Workshop
            </span></button>
        </div>
    `;
    
    modalContainer.innerHTML = modalContent;
    modalOverlay.classList.add('active');
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Set min date if bookingDate exists
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

// Close modal when clicking overlay
modalOverlay.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 700);
    }
});

// Theme Toggle (Light / Dark)

// Global API URL for Backend Services
const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3000' : 'https://asha-mental-wellness-the-therapyst.onrender.com';

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const contactFormMessage = document.getElementById('contactFormMessage');

function validateEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
}

if (contactForm && contactFormMessage) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const supportType = (formData.get('supportType') || '').toString().trim();
        const mode = (formData.get('mode') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        contactFormMessage.classList.remove('success', 'error');

        if (!name || !email || !message) {
            contactFormMessage.textContent = 'Please fill in your name, email, and a short message so I can respond meaningfully.';
            contactFormMessage.classList.add('error');
            return;
        }

        if (!validateEmail(email)) {
            contactFormMessage.textContent = 'Please enter a valid email address so I can reach you.';
            contactFormMessage.classList.add('error');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Submitting Inquiry...</span>';
        }

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, supportType, mode, message })
            });

            const data = await response.json().catch(() => null);

            if (response.ok && data && data.success && data.emailSent) {
                contactForm.reset();
                contactFormMessage.textContent = 'Thank you for reaching out. Your inquiry has been noted and you will receive a response via email.';
                contactFormMessage.classList.add('success');
            } else if (data && data.saved && !data.emailSent) {
                contactFormMessage.textContent = 'Your inquiry was recorded, but the email notification could not be delivered at this moment. You may also contact us directly at asha.suhasinim@gmail.com.';
                contactFormMessage.classList.add('error');
            } else {
                const errMsg = (data && (data.error || data.message)) ? (data.error || data.message) : 'Unable to submit your inquiry at this moment. Please check your connection and try again.';
                contactFormMessage.textContent = errMsg;
                contactFormMessage.classList.add('error');
            }
        } catch (fetchErr) {
            console.error('Contact form submission network error:', fetchErr);
            contactFormMessage.textContent = 'Unable to submit your inquiry at this moment. Please check your connection and try again.';
            contactFormMessage.classList.add('error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        }
    });
}



console.log('Asha Suhasini Raja - Website Initialized Successfully!');

// Media Modal: open image or video in the existing modal container
let galleryItems = [];
let currentGalleryIndex = -1;

function getMediaPathCandidates(rawPath) {
    if (!rawPath) return [];
    if (/^(https?:)?\/\//.test(rawPath) || rawPath.startsWith('data:') || rawPath.startsWith('blob:')) {
        return [rawPath];
    }

    const normalized = rawPath.replace(/\\/g, '/').replace(/^\.\//, '').replace(/^\/+/, '');
    const candidates = [
        `./${normalized}`,
        normalized,
        `../${normalized}`,
        `/${normalized}`
    ];

    return [...new Set(candidates)];
}

function applyImagePathFallback(img, preferredPath) {
    const basePath = preferredPath || img.getAttribute('src') || '';
    const candidates = getMediaPathCandidates(basePath);
    if (candidates.length === 0) return;

    let candidateIndex = 0;
    img.src = candidates[candidateIndex];
    img.dataset.pathTriedIndex = String(candidateIndex);

    img.addEventListener('error', () => {
        const lastTried = Number(img.dataset.pathTriedIndex || candidateIndex);
        const nextIndex = lastTried + 1;
        if (nextIndex >= candidates.length) return;
        img.dataset.pathTriedIndex = String(nextIndex);
        img.src = candidates[nextIndex];
    });
}

function openMediaModal(src, type = 'image', index = -1, caption = '') {
    currentGalleryIndex = index;

    const mediaMarkup = `
        <div class="modal-header">
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            <img src="${src}" alt="${caption || 'Gallery photograph'}">
        </div>
    `;

    modalContainer.innerHTML = mediaMarkup;
    modalOverlay.classList.add('active');
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Set min date if bookingDate exists
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

function galleryPrev() {
    if (galleryItems.length === 0) return;
    const nextIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    const item = galleryItems[nextIndex];
    openMediaModal(item.src, item.type, nextIndex, item.caption);
}

function galleryNext() {
    if (galleryItems.length === 0) return;
    const nextIndex = (currentGalleryIndex + 1) % galleryItems.length;
    const item = galleryItems[nextIndex];
    openMediaModal(item.src, item.type, nextIndex, item.caption);
}

// Attach handlers to gallery items (photographs)
function initGalleryHandlers() {
    // Build gallery items list
    galleryItems = [];

    const imgs = Array.from(document.querySelectorAll('.media-item > img'));

    imgs.forEach((img, i) => {
        const src = img.src;
        const type = 'image';
        const caption = img.alt || '';

        galleryItems.push({ src, type, caption });

        img.setAttribute('loading', 'lazy');
        applyImagePathFallback(img, src);
        img.style.cursor = 'pointer';

        img.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openMediaModal(src, type, i, caption);
        });
    });

    // Keyboard navigation (ONLY ONCE)
    document.addEventListener('keydown', (e) => {
        if (!modalContainer.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
            return;
        }

        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        const isEditable = activeTag === 'INPUT' || activeTag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable);
        
        if (currentGalleryIndex >= 0 && !isEditable) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                galleryPrev();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                galleryNext();
            }
        }
    });
}

// Initialize gallery handlers once DOM is ready
// Initialize gallery handlers immediately since script is deferred
initGalleryHandlers();

// Expose global functions to window


// Booking System Logic

async function renderTimeSlots() {
    const dateInput = document.getElementById('bookingDate').value;
    const timeSlotsContainer = document.getElementById('timeSlots');
    const bookingFormDetails = document.getElementById('bookingFormDetails');
    const successMsg = document.getElementById('bookingSuccessMessage');
    const slotLabel = document.getElementById('slotLabel');
    
    bookingFormDetails.style.display = 'none';
    if (successMsg) successMsg.style.display = 'none';
    
    if (!dateInput) {
        timeSlotsContainer.innerHTML = '<p class="text-muted">Please select a date first.</p>';
        if (slotLabel) slotLabel.innerText = 'Available Slots';
        return;
    }

    // Determine day of week to set correct slots
    const [year, month, day] = dateInput.split('-');
    const selectedDate = new Date(year, month - 1, day);
    const isSunday = selectedDate.getDay() === 0;
    
    const availableSlots = isSunday 
        ? ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM']
        : ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
        
    if (slotLabel) {
        slotLabel.innerText = isSunday
            ? 'Available Slots (12:00 PM - 4:00 PM)'
            : 'Available Slots (5:00 PM - 9:00 PM)';
    }

    timeSlotsContainer.innerHTML = '<p class="text-muted">Loading available slots...</p>';
    
    let bookedForDate = [];
    try {
        const response = await fetch(`${API_URL}/api/booked-slots?date=${dateInput}`, { cache: 'no-store' });
        if (response.ok) {
            const data = await response.json();
            bookedForDate = data.booked || [];
        } else {
            console.warn('Backend unavailable, using strict local check as fallback for rendering only.');
        }
    } catch (e) {
        console.error('Backend connection failed:', e);
    }

    timeSlotsContainer.innerHTML = '';
    
    let hasAvailableSlots = false;

    availableSlots.forEach(slot => {
        if (!bookedForDate.includes(slot)) {
            hasAvailableSlots = true;
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline time-slot-btn';
            btn.textContent = slot;
            btn.onclick = () => selectSlot(btn, slot);
            timeSlotsContainer.appendChild(btn);
        }
    });
    
    if (!hasAvailableSlots) {
        timeSlotsContainer.innerHTML = '<p class="text-muted">No slots available for this date. Please select another date.</p>';
    }
}

function selectSlot(btnElement, slot) {
    document.querySelectorAll('.time-slot-btn').forEach(btn => btn.classList.remove('selected'));
    btnElement.classList.add('selected');
    
    document.getElementById('selectedSlot').value = slot;
    document.getElementById('bookingFormDetails').style.display = 'block';
    
    const successMsg = document.getElementById('bookingSuccessMessage');
    if (successMsg) successMsg.style.display = 'none';
}

// Service Catalog & Fees
const SERVICES_MAP = {
    'individual-therapy': {
        key: 'individual-therapy',
        name: 'Individual Therapy / Counselling',
        duration: '45–60 min',
        fee: 3300,
        feeFormatted: '₹3,300'
    },
    'family-therapy': {
        key: 'family-therapy',
        name: 'Family Therapy / Counselling',
        duration: '45–60 min',
        fee: 4499,
        feeFormatted: '₹4,499'
    },
    'marital-therapy': {
        key: 'marital-therapy',
        name: 'Marital Therapy / Counselling',
        duration: '45–60 min',
        fee: 4499,
        feeFormatted: '₹4,499'
    },
    'pre-marital': {
        key: 'pre-marital',
        name: 'Pre-Marital Counselling',
        duration: '45–60 min',
        fee: 2400,
        feeFormatted: '₹2,400'
    },
    'student-therapy-60': {
        key: 'student-therapy-60',
        name: 'Student Counselling / Therapy',
        duration: '45–60 min',
        fee: 599,
        feeFormatted: '₹599'
    },
    'student-therapy-30': {
        key: 'student-therapy-30',
        name: 'Student Counselling / Therapy',
        duration: '30 min',
        fee: 299,
        feeFormatted: '₹299'
    },
    'consultation': {
        key: 'consultation',
        name: 'Consultation',
        duration: '15–20 min',
        fee: 600,
        feeFormatted: '₹600'
    }
};

// Aliases for matching by name or option strings
SERVICES_MAP['Individual Therapy / Counselling'] = SERVICES_MAP['individual-therapy'];
SERVICES_MAP['Family Therapy / Counselling'] = SERVICES_MAP['family-therapy'];
SERVICES_MAP['Marital Therapy / Counselling'] = SERVICES_MAP['marital-therapy'];
SERVICES_MAP['Pre-Marital Counselling'] = SERVICES_MAP['pre-marital'];
SERVICES_MAP['Student Counselling / Therapy — 45–60 min (₹599)'] = SERVICES_MAP['student-therapy-60'];
SERVICES_MAP['Student Counselling / Therapy — 30 min (₹299)'] = SERVICES_MAP['student-therapy-30'];
SERVICES_MAP['Student Counselling / Therapy (45–60 min)'] = SERVICES_MAP['student-therapy-60'];
SERVICES_MAP['Student Counselling / Therapy (30 min)'] = SERVICES_MAP['student-therapy-30'];
SERVICES_MAP['Consultation'] = SERVICES_MAP['consultation'];

function getServiceData(keyOrValue) {
    if (!keyOrValue) return null;
    if (SERVICES_MAP[keyOrValue]) return SERVICES_MAP[keyOrValue];
    const keyLower = String(keyOrValue).trim().toLowerCase();
    for (const k in SERVICES_MAP) {
        if (k.toLowerCase() === keyLower) return SERVICES_MAP[k];
    }
    if (keyLower.includes('student') && keyLower.includes('30')) return SERVICES_MAP['student-therapy-30'];
    if (keyLower.includes('student')) return SERVICES_MAP['student-therapy-60'];
    for (const k in SERVICES_MAP) {
        if (SERVICES_MAP[k].name && SERVICES_MAP[k].name.toLowerCase() === keyLower) return SERVICES_MAP[k];
    }
    return null;
}

function handleServiceChange() {
    const serviceSelect = document.getElementById('bookingService');
    const promptEl = document.getElementById('servicePrompt');
    const summaryEl = document.getElementById('serviceSummary');
    const nameEl = document.getElementById('selectedServiceName');
    const durationEl = document.getElementById('selectedServiceDuration');
    const feeEl = document.getElementById('selectedServiceFee');

    if (!serviceSelect) return;
    const val = serviceSelect.value;
    const service = getServiceData(val);

    if (service) {
        if (nameEl) nameEl.textContent = service.name;
        if (durationEl) durationEl.textContent = service.duration;
        if (feeEl) feeEl.textContent = service.feeFormatted;
        if (promptEl) promptEl.style.display = 'none';
        if (summaryEl) summaryEl.style.display = 'block';
    } else {
        if (nameEl) nameEl.textContent = '—';
        if (durationEl) durationEl.textContent = '—';
        if (feeEl) feeEl.textContent = '—';
        if (promptEl) promptEl.style.display = 'block';
        if (summaryEl) summaryEl.style.display = 'none';
    }
}

async function confirmBooking() {
    const serviceSelect = document.getElementById('bookingService');
    const serviceVal = serviceSelect ? serviceSelect.value : '';
    const serviceData = getServiceData(serviceVal);

    if (!serviceData) {
        alert('Please select a service / therapy to proceed with booking.');
        if (serviceSelect) serviceSelect.focus();
        return;
    }

    const date = document.getElementById('bookingDate').value;
    const slot = document.getElementById('selectedSlot').value;
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    const sessionFormat = document.getElementById('mode') ? document.getElementById('mode').value : 'online';
    
    if (!date || !slot || !name || !email) {
        alert('Please fill in all fields to confirm booking.');
        return;
    }
    
    const submitBtn = document.querySelector('#bookingFormDetails button');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Processing...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(`${API_URL}/api/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name, 
                email, 
                date, 
                slot, 
                sessionFormat,
                serviceKey: serviceVal,
                service: serviceData.name,
                duration: serviceData.duration,
                fee: serviceData.fee,
                feeFormatted: serviceData.feeFormatted
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('bookingFormDetails').style.display = 'none';
            
            // Store current booking details for the payment step
            window.currentBooking = {
                id: data.bookingId,
                name: name,
                email: email,
                date: date,
                slot: slot,
                service: data.service || serviceData.name,
                duration: data.duration || serviceData.duration,
                fee: data.fee || serviceData.feeFormatted,
                feeAmount: data.feeAmount || serviceData.fee
            };

            // Refresh slots to correctly show it's no longer available
            await renderTimeSlots();
            
            // Show clear professional confirmation with "Proceed to Payment" button
            let successMsg = document.getElementById('bookingSuccessMessage');

            if (!successMsg) {
                successMsg = document.createElement('div');
                successMsg.id = 'bookingSuccessMessage';
                successMsg.style.cssText = 'margin-top: 1rem; padding: 1.25rem; background: rgba(130, 168, 157, 0.12); border: 1px solid rgba(130, 168, 157, 0.35); color: var(--primary); border-radius: 12px;';
                document.getElementById('bookingSystem').appendChild(successMsg);
            }
            successMsg.style.display = 'block';
            successMsg.innerHTML = `
                <h4 style="margin-top:0; color:var(--primary); font-size: 1.2rem;">Booking Request Submitted</h4>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">Your online session request has been received. Please proceed to payment to complete your booking submission.</p>
                <div style="background:#ffffff; border:1px solid rgba(130, 168, 157, 0.3); border-radius:8px; padding:1rem; margin-bottom:1.25rem; font-size:0.95rem; line-height: 1.6;">
                    <p style="margin: 0.25rem 0;"><strong>Selected Service:</strong> ${window.currentBooking.service}</p>
                    <p style="margin: 0.25rem 0;"><strong>Session Duration:</strong> ${window.currentBooking.duration}</p>
                    <p style="margin: 0.25rem 0;"><strong>Consultation Fee:</strong> <span style="font-weight:700; color:#92400e; font-size:1.1rem;">${window.currentBooking.fee}</span></p>
                    <p style="margin: 0.25rem 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 0.25rem 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 0.25rem 0;"><strong>Date:</strong> ${date}</p>
                    <p style="margin: 0.25rem 0;"><strong>Time:</strong> ${slot}</p>
                    <p style="margin: 0.25rem 0;"><strong>Session Format:</strong> Online Session</p>
                    <p style="margin-bottom:0; margin-top:0.5rem; font-weight:600; color: #b45309;">Status: Awaiting Payment</p>
                </div>
                <button type="button" id="proceedToPaymentBtn" class="btn btn-primary full-width" onclick="showPaymentStep()">
                    Proceed to Payment
                </button>
            `;
        } else {
            alert('Booking failed: ' + (data.error || 'Please try again.'));
            // Refresh slots to see if it was taken
            renderTimeSlots();
        }
    } catch (error) {
        alert('Failed to connect to the booking server. Please ensure the backend is running.');
        console.error(error);
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function showPaymentStep() {
    if (!window.currentBooking) {
        alert('Please complete the booking form first.');
        return;
    }

    // Hide booking request confirmation message
    const successMsg = document.getElementById('bookingSuccessMessage');
    if (successMsg) successMsg.style.display = 'none';

    // Hide initial form fields to present dedicated payment panel
    const serviceField = document.querySelector('label[for="bookingService"]')?.closest('.form-field');
    if (serviceField) serviceField.style.display = 'none';
    const serviceDetailsBox = document.getElementById('serviceDetailsBox');
    if (serviceDetailsBox) serviceDetailsBox.style.display = 'none';
    const dateField = document.querySelector('label[for="bookingDate"]')?.closest('.form-field');
    if (dateField) dateField.style.display = 'none';
    const slotField = document.getElementById('slotLabel')?.closest('.form-field');
    if (slotField) slotField.style.display = 'none';

    // Populate payment details
    const nameEl = document.getElementById('paymentServiceName');
    const durEl = document.getElementById('paymentServiceDuration');
    const feeEl = document.getElementById('paymentAmountPayable');
    const noticeAmountEl = document.getElementById('noticeAmount');

    if (nameEl) nameEl.textContent = window.currentBooking.service;
    if (durEl) durEl.textContent = window.currentBooking.duration;
    if (feeEl) feeEl.textContent = window.currentBooking.fee;
    if (noticeAmountEl) noticeAmountEl.textContent = window.currentBooking.fee;

    // Show payment section
    const paymentSec = document.getElementById('bookingPaymentSection');
    if (paymentSec) {
        paymentSec.style.display = 'block';
        paymentSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function copyUpiId() {
    const upiText = '8019749608@ybl';
    const copyBtn = document.getElementById('copyUpiBtn');
    const btnText = document.getElementById('copyUpiText');

    const onSuccess = () => {
        if (btnText) {
            const originalText = btnText.textContent;
            btnText.textContent = '✓ Copied!';
            if (copyBtn) copyBtn.style.background = '#2e7d32';
            setTimeout(() => {
                btnText.textContent = originalText;
                if (copyBtn) copyBtn.style.background = '';
            }, 2000);
        }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(upiText).then(onSuccess).catch(() => {
            fallbackCopy(upiText, onSuccess);
        });
    } else {
        fallbackCopy(upiText, onSuccess);
    }
}

function fallbackCopy(text, callback) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful && callback) callback();
    } catch (err) {
        console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
}

async function submitPaymentDetails() {
    if (!window.currentBooking || !window.currentBooking.id) {
        alert('No active booking request found. Please submit a booking request first.');
        return;
    }

    const utrInput = document.getElementById('paymentUtr');
    const checkInput = document.getElementById('paymentConfirmCheck');
    const screenshotInput = document.getElementById('paymentScreenshot');
    const submitBtn = document.getElementById('submitPaymentBtn');

    const utr = utrInput ? utrInput.value.trim() : '';
    if (!utr) {
        alert('Please enter your UTR / Transaction Reference Number.');
        if (utrInput) utrInput.focus();
        return;
    }

    if (utr.length < 6 || utr.length > 35) {
        alert('Please enter a valid UTR / Transaction Reference Number (between 6 and 35 characters).');
        if (utrInput) utrInput.focus();
        return;
    }

    if (checkInput && !checkInput.checked) {
        alert('Please check the confirmation box to confirm that you have completed the payment.');
        checkInput.focus();
        return;
    }

    let screenshotBase64 = null;
    if (screenshotInput && screenshotInput.files && screenshotInput.files[0]) {
        const file = screenshotInput.files[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Invalid file format. Please upload a JPG, PNG, or WEBP payment screenshot.');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert('Screenshot file is too large. Maximum size is 2MB.');
            return;
        }

        try {
            screenshotBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        } catch (readErr) {
            console.error('Error reading screenshot file:', readErr);
            alert('Failed to read the screenshot file. Please try again or submit without screenshot.');
            return;
        }
    }

    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Payment Details';
    if (submitBtn) {
        submitBtn.innerHTML = 'Submitting Payment Details...';
        submitBtn.disabled = true;
    }

    try {
        const response = await fetch(`${API_URL}/api/book/payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookingId: window.currentBooking.id,
                utr: utr,
                screenshot: screenshotBase64
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Hide the submission form, QR code, account card, and notice
            const form = document.getElementById('paymentSubmissionForm');
            if (form) form.style.display = 'none';

            const qrContainer = document.querySelector('.payment-qr-container');
            if (qrContainer) qrContainer.style.display = 'none';

            const accountCard = document.querySelector('.payment-account-card');
            if (accountCard) accountCard.style.display = 'none';

            const noticeBox = document.querySelector('.payment-notice-box');
            if (noticeBox) noticeBox.style.display = 'none';

            const summaryCard = document.querySelector('.payment-summary-card');
            if (summaryCard) summaryCard.style.display = 'none';

            const header = document.querySelector('.payment-header');
            if (header) header.style.display = 'none';

            // Display required confirmation message
            const statusMsg = document.getElementById('paymentStatusMessage');
            if (statusMsg) {
                statusMsg.style.display = 'block';
                statusMsg.innerHTML = `
                    <div class="payment-submitted-card" style="padding: 1.5rem; background: #ffffff; border: 1px solid rgba(130, 168, 157, 0.4); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                        <h4 style="margin-top:0; color: #2e7d32; display: flex; align-items: center; gap: 8px; font-size: 1.25rem;">
                            <span style="display:inline-block; width:26px; height:26px; border-radius:50%; background:#2e7d32; color:#fff; text-align:center; line-height:26px; font-size:15px; font-weight:bold;">✓</span> Payment Details Submitted
                        </h4>
                        <p style="color: var(--text-primary); line-height: 1.6; margin: 1rem 0;">
                            Thank you. Your payment reference has been submitted and is awaiting verification. Your booking will be confirmed once the payment has been verified.
                        </p>
                        <hr style="border: none; border-top: 1px dashed rgba(130, 168, 157, 0.35); margin: 1rem 0;">
                        <div class="payment-final-summary" style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.95rem;">
                            <div><strong>Selected Service:</strong> ${data.service || window.currentBooking.service}</div>
                            <div><strong>Consultation Fee:</strong> ${data.fee || window.currentBooking.fee}</div>
                            <div><strong>Date:</strong> ${data.date || window.currentBooking.date}</div>
                            <div><strong>Time:</strong> ${data.slot || window.currentBooking.slot}</div>
                            <div><strong>UTR / Reference No.:</strong> <span style="font-family:monospace; font-weight:bold; color:var(--primary);">${data.utr || utr}</span></div>
                            <div style="margin-top: 0.5rem; padding: 0.6rem 0.85rem; background: rgba(180, 83, 9, 0.08); border-left: 3px solid #b45309; border-radius: 4px; font-weight: 600; color: #92400e;">
                                Payment Status: Pending Verification
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            alert('Payment submission failed: ' + (data.error || 'Please try again.'));
        }
    } catch (err) {
        console.error('Payment submit error:', err);
        alert('Failed to connect to the booking server. Please check your internet connection.');
    } finally {
        if (submitBtn) {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    }
}

window.renderTimeSlots = renderTimeSlots;
window.selectSlot = selectSlot;
window.confirmBooking = confirmBooking;
window.handleServiceChange = handleServiceChange;
window.getServiceData = getServiceData;
window.SERVICES_MAP = SERVICES_MAP;
window.showPaymentStep = showPaymentStep;
window.copyUpiId = copyUpiId;
window.submitPaymentDetails = submitPaymentDetails;


window.openGoogleCalendarBooking = openGoogleCalendarBooking;
window.scrollToSection = scrollToSection;
window.openModal = openModal;
window.closeModal = closeModal;
window.openServiceModal = openServiceModal;
window.openExperienceModal = openExperienceModal;
window.openTherapyModal = openTherapyModal;
window.openWorkshopModal = openWorkshopModal;


// Testimonials Carousel Logic
const cards = document.querySelectorAll('.testimonial-card');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

    function showTestimonial(index) {
        cards.forEach(card => card.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        cards[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    if(prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
            showTestimonial(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
            showTestimonial(currentIndex);
        });

        indicators.forEach((indicator, idx) => {
            indicator.addEventListener('click', () => {
                currentIndex = idx;
                showTestimonial(currentIndex);
            });
        });

    // Auto-play
    setInterval(() => {
        currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
        showTestimonial(currentIndex);
    }, 6000);
}





// --- Dynamic Review System ---

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

let currentReviewPage = 1;

async function fetchAndRenderStats() {
    try {
        const res = await fetch(`${API_URL}/api/reviews/stats`, { cache: 'no-store' });
        if (!res.ok) return;
        const stats = await res.json();
        
        const avgRatingEl = document.getElementById('averageRating');
        const avgStarsEl = document.getElementById('averageStars');
        const reviewCountEls = document.querySelectorAll('.review-total-count, #reviewCount, #reviewsHeaderCount');
        
        if (!stats || typeof stats.totalRatings === 'undefined' || stats.totalRatings === 0) {
            if (avgRatingEl) avgRatingEl.textContent = '0.0';
            if (avgStarsEl) avgStarsEl.innerHTML = '&#9734;&#9734;&#9734;&#9734;&#9734;';
            reviewCountEls.forEach(el => el.textContent = '0');
            for (let i = 1; i <= 5; i++) {
                const countEl = document.getElementById('ratingCount' + i);
                if (countEl) countEl.textContent = '0';
                const barEl = document.getElementById('ratingBar' + i);
                if (barEl) barEl.style.width = '0%';
            }
            return;
        }

        let avg = stats.averageRating.toFixed(2);
        if (avg.endsWith('0')) avg = stats.averageRating.toFixed(1);
        
        if (avgRatingEl) avgRatingEl.textContent = avg;
        if (avgStarsEl) avgStarsEl.innerHTML = '&#9733;'.repeat(Math.round(stats.averageRating)) + '&#9734;'.repeat(5 - Math.round(stats.averageRating));
        reviewCountEls.forEach(el => el.textContent = stats.totalRatings);
        
        for (let i = 1; i <= 5; i++) {
            const count = (stats.distribution && (stats.distribution[i] ?? stats.distribution[String(i)])) || 0;
            const countEl = document.getElementById('ratingCount' + i);
            if (countEl) countEl.textContent = count;
            const pct = stats.totalRatings > 0 ? (count / stats.totalRatings) * 100 : 0;
            const barEl = document.getElementById('ratingBar' + i);
            if (barEl) barEl.style.width = pct + '%';
        }
    } catch(e) {
        console.error('Stats error:', e);
    }
}

async function fetchAndRenderReviews(page = 1, append = false) {
    try {
        const response = await fetch(`${API_URL}/api/reviews?page=${page}&limit=6`, { cache: "no-store" });
        if (!response.ok) throw new Error('Failed to fetch reviews');
        
        const data = await response.json();
        const reviews = data.reviews || [];
        const pagination = data.pagination;
        
        const reviewsContainer = document.getElementById('publicReviewsContainer');
        const loadMoreBtn = document.getElementById('loadMoreReviewsBtn');
        
        if (!append && reviews.length === 0) {
            if (reviewsContainer) reviewsContainer.innerHTML = '<p style="text-align:center; color:var(--text-secondary); font-style:italic; margin-top:20px; grid-column: 1 / -1; width: 100%;">No reviews yet. Be the first to share your experience!</p>';
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        let cardsHtml = '';
        reviews.forEach(rev => {
            const stars = '&#9733;'.repeat(rev.rating) + '&#9734;'.repeat(5 - rev.rating);
            let locArr = [];
            if (rev.city) locArr.push(escapeHTML(rev.city));
            if (rev.state) locArr.push(escapeHTML(rev.state));
            if (rev.country) locArr.push(escapeHTML(rev.country));
            const locText = locArr.join(', ');
            
            cardsHtml += `
                <div class="review-display-card">
                    <div class="review-card-top">
                        <h4 class="review-card-name">${escapeHTML(rev.name)}</h4>
                        <div class="review-card-stars" aria-label="${rev.rating} out of 5 stars">${stars}</div>
                    </div>
                    <p class="review-card-body">"${escapeHTML(rev.message)}"</p>
                    <div class="review-card-footer">
                        <span class="review-card-location">${locText ? '📍 ' + locText : 'Verified Client'}</span>
                    </div>
                </div>
            `;
        });

        if (reviewsContainer) {
            if (append) {
                reviewsContainer.insertAdjacentHTML('beforeend', cardsHtml);
            } else {
                reviewsContainer.innerHTML = cardsHtml;
            }
        }

        if (loadMoreBtn) {
            if (pagination && pagination.hasNextPage) {
                loadMoreBtn.style.display = 'inline-flex';
                loadMoreBtn.onclick = () => {
                    loadMoreBtn.textContent = 'Loading reviews...';
                    loadMoreBtn.disabled = true;
                    currentReviewPage++;
                    fetchAndRenderReviews(currentReviewPage, true).then(() => {
                        loadMoreBtn.textContent = 'Load More Reviews';
                        loadMoreBtn.disabled = false;
                    });
                };
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
        const loadMoreBtn = document.getElementById('loadMoreReviewsBtn');
        if (loadMoreBtn) {
            loadMoreBtn.textContent = 'Error loading reviews';
            setTimeout(() => {
                loadMoreBtn.textContent = 'Load More Reviews';
                loadMoreBtn.disabled = false;
            }, 2000);
        }
    }
}

function initReviewForm() {
    const form = document.getElementById('reviewForm');
    const msg = document.getElementById('reviewFormMessage');
    const starBtns = document.querySelectorAll('.star-btn');
    const ratingInput = document.getElementById('reviewRating');
    
    if (!form || !ratingInput) return;

    let currentRating = 0;

    // Star Click Logic
    starBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = parseInt(btn.getAttribute('data-value'), 10);
            currentRating = val;
            ratingInput.value = val;
            
            // Update Visuals
            starBtns.forEach(b => {
                const bVal = parseInt(b.getAttribute('data-value'), 10);
                if (bVal <= val) {
                    b.innerHTML = '<span>&#9733;</span>'; // Filled star
                    b.style.color = '#c5a66a';
                } else {
                    b.innerHTML = '<span>&#9734;</span>'; // Empty star
                    b.style.color = 'rgba(130, 168, 157, 0.3)';
                }
            });
        });
    });

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        msg.textContent = '';
        msg.className = 'contact-form-message';
        
        if (!currentRating || currentRating < 1 || currentRating > 5) {
            msg.textContent = 'Please select a rating.';
            msg.classList.add('error');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
        
        try {
            const payload = {
                name: document.getElementById('reviewerName').value,
                email: document.getElementById('reviewerEmail').value,
                rating: currentRating,
                message: document.getElementById('reviewText').value,
                country: document.getElementById('reviewerCountry').value,
                state: document.getElementById('reviewerState').value,
                city: document.getElementById('reviewerCity').value
            };
            
            const res = await fetch(`${API_URL}/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const data = await res.json();
            
            if (res.ok) {
                msg.textContent = 'Thank you! Your review has been submitted and is pending administrator moderation.';
                msg.classList.add('success');
                form.reset();
                
                // Reset Stars
                currentRating = 0;
                ratingInput.value = '';
                starBtns.forEach(b => {
                    b.innerHTML = '<span>&#9734;</span>';
                    b.style.color = 'rgba(130, 168, 157, 0.3)';
                });
            } else {
                msg.textContent = data.error || 'Submission failed.';
                msg.classList.add('error');
            }
        } catch (err) {
            msg.textContent = 'Network error. Please try again.';
            msg.classList.add('error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Initialize Review System on load
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderStats();
    fetchAndRenderReviews(1, false);
    initReviewForm();
});
// --- End Dynamic Review System ---

// Experience Expandable Panels Logic
function openExperiencePanel(element) {
    // Close any currently open panels
    document.querySelectorAll('.timeline-content-wrapper.is-open').forEach(el => {
        el.classList.remove('is-open');
    });
    // Open the clicked panel
    element.closest('.timeline-content-wrapper').classList.add('is-open');
    
    // Add global escape key listener
    document.addEventListener('keydown', handleExperienceEscape);
}

function closeExperiencePanel(element) {
    element.closest('.timeline-content-wrapper').classList.remove('is-open');
    document.removeEventListener('keydown', handleExperienceEscape);
}

function handleExperienceEscape(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.timeline-content-wrapper.is-open').forEach(el => {
            el.classList.remove('is-open');
        });
        document.removeEventListener('keydown', handleExperienceEscape);
    }
}

window.openExperiencePanel = openExperiencePanel;
window.closeExperiencePanel = closeExperiencePanel;
