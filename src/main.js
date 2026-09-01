// Loading screen removed for reliability

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
        if (sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    });
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function openGoogleCalendarBooking() {
    const calendarUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit?text=Therapy%20Session%20with%20Asha%20Suhasini%20Raja%20G&details=Please%20share%20your%20concern%20briefly.%20Contact%3A%20asha.suhasinim%40gmail.com&location=Online%20or%20Hyderabad&add=asha.suhasinim%40gmail.com';
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
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
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
}, { threshold: 0.5 });

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
    modalOverlay.classList.remove('active');
    modalContainer.classList.remove('active');
    document.body.style.overflow = 'auto';
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
                <h2> Education</h2>
                <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
            </div>
            <div class="modal-body">
                <h3>Master's in Clinical Psychology</h3>
                <p><strong>Institution:</strong> SNDT University, Mumbai</p>
                <p><strong>Specialization:</strong> Clinical Psychology with focus on therapeutic interventions and mental health assessment</p>
                
                <h3>Professional Training</h3>
                <ul>
                    <li>Advanced training in Cognitive Behavioural Therapy (CBT)</li>
                    <li>Certification in Rational Emotive Behaviour Therapy (REBT)</li>
                    <li>Dialectical Behaviour Therapy (DBT) specialization</li>
                    <li>Family and Marital Therapy training</li>
                    <li>Critical Incident Stress Debriefing (CISD) certification</li>
                </ul>
            </div>
        `,
        certificationModal: `
            <div class="modal-header">
                <h2> Certifications & Registration</h2>
                <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
            </div>
            <div class="modal-body">
                <h3>Professional Registration</h3>
                <p><strong>Counsellors Council of India</strong></p>
                <p>Registration Number: CRN9047214</p>
                <p>This registration validates the professional credentials and ethical standards maintained in practice.</p>
                
                <h3>Specialized Certifications</h3>
                <ul>
                    <li>Life Skills Coach Certification</li>
                    <li>Trauma Counselling Specialist</li>
                    <li>Critical Incident Stress Debriefing (CISD) Facilitator</li>
                    <li>Corporate Wellness Consultant Certification</li>
                </ul>
                
                <h3>Continuing Education</h3>
                <p>Regularly participates in workshops, seminars, and training programs to stay updated with the latest developments in mental health and psychotherapy.</p>
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
                    <li><strong>Relationship Counseling:</strong> Marital therapy, family conflicts, communication issues</li>
                    <li><strong>Trauma Recovery:</strong> PTSD, grief counseling, critical incident stress</li>
                    <li><strong>Academic Counseling:</strong> Exam stress, career guidance, study skills</li>
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
                    <li><strong>Couples/Family Therapy:</strong> 60-minute sessions for relationship counseling</li>
                    <li><strong>Corporate Consultation:</strong> Customized programs for organizations</li>
                    <li><strong>Life Coaching:</strong> Goal-oriented sessions for personal development</li>
                </ul>
                
                <h3>Session Formats</h3>
                <p> Hyderabad</p>
                <p> Online video consultations</p>
                <p> Phone consultations</p>
                
                
                <h3>Schedule a Session</h3>
                <div class="booking-system" id="bookingSystem">
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
                    <div id="bookingSuccessMessage" style="display:none; margin-top: 1rem; padding: 1rem; background: #e6f4ea; color: #1e4620; border-radius: 8px;">
                        Booking confirmed! Your time slot has been successfully reserved.
                    </div>
                </div>
                
                <p style="margin-top: 2rem; padding: 1.5rem; background: #f8f9fa; border-radius: 15px;">
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
                
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 15px; margin: 1.5rem 0;">
                    <h4 style="margin-top: 0;"> Email</h4>
                    <p>asha.suhasinim@gmail.com</p>
                    
                    <h4> Location</h4>
                    <p>Hyderabad, Telangana, India</p>
                    
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
            description: 'Strengthen relationships and resolve conflicts through compassionate family and couples counseling.',
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
                'Employee counseling and support services',
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
            title: ' Trauma Counseling',
            description: 'Specialized support for healing from traumatic experiences and critical incidents.',
            details: [
                'PTSD treatment and management',
                'Grief and loss counseling',
                'Critical Incident Stress Debriefing (CISD)',
                'Trauma-informed therapeutic approaches',
                'Building post-traumatic resilience',
                'Safe processing of difficult experiences'
            ],
            duration: 'Flexible based on needs',
            format: 'Sensitive, confidential support'
        },
        student: {
            title: ' Student Counseling',
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
            format: 'Age-appropriate counseling methods'
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
            
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
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
                'Individual counseling for students dealing with academic stress and personal challenges',
                'Conducting mental health awareness workshops',
                'Crisis intervention and support services',
                'Collaborating with faculty to create a supportive campus environment',
                'Developing mental wellness programs for the university community'
            ]
        },
        modern: {
            title: 'Modern Health',
            role: 'Psychological Consultant & Psychotherapist',
            period: 'Current',
            location: 'Arizona, USA (Remote)',
            description: 'Delivering evidence-based mental health care to a global clientele through a leading digital mental health platform.',
            responsibilities: [
                'Providing teletherapy to diverse international clients',
                'Utilizing digital tools for effective remote counseling',
                'Maintaining highest standards of care in virtual settings',
                'Adapting therapeutic approaches for online delivery',
                'Contributing to global mental health accessibility'
            ]
        },
        private: {
            title: 'Private Practice',
            role: 'Independent Psychotherapist',
            period: 'Since 2006',
            location: 'Global Clientele',
            description: 'Building a trusted practice over 19+ years, serving individuals, families, and organizations worldwide.',
            responsibilities: [
                'Individual and family therapy across diverse age groups',
                'Specialized trauma counseling and PTSD treatment',
                'Life skills coaching and personal development',
                'Corporate wellness consulting',
                'Building long-term therapeutic relationships based on trust'
            ]
        },
        manah: {
            title: 'Manah Wellness',
            role: 'Senior Mental Wellness Consultant',
            period: 'Previous',
            location: 'Remote',
            description: 'Affiliated as a senior consultant, offering guidance and therapy to clients globally.',
            responsibilities: [
                'Remote counseling and psychotherapy',
                'Mental wellness program development',
                'Client assessment and treatment planning',
                'Collaborative care with multidisciplinary teams',
                'Supporting diverse populations across different time zones'
            ]
        },
        morneau: {
            title: 'Morneau Shepell',
            role: 'Trauma Counseling Specialist & CISD Facilitator',
            period: 'Previous',
            location: 'Canada (Remote)',
            description: 'Specialized in trauma counseling and Critical Incident Stress Debriefing during challenging times.',
            responsibilities: [
                'Providing grief and trauma counseling',
                'Facilitating Critical Incident Stress Debriefing (CISD)',
                'Supporting organizations during the pandemic',
                'Emergency response and crisis intervention',
                'Training staff on stress management techniques'
            ]
        },
        hyundai: {
            title: 'Hyundai Mobis',
            role: 'Corporate Mental Wellness Consultant',
            period: 'Previous',
            location: 'Hi-Tech City, Hyderabad',
            description: 'Leading mental wellness initiatives for corporate employees in a high-tech environment.',
            responsibilities: [
                'Employee counseling and support services',
                'Developing workplace wellness programs',
                'Conducting stress management workshops',
                'Leadership coaching for executives',
                'Creating a mentally healthy workplace culture'
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
            <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 1rem 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
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
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <h4 style="margin-top: 0; color: white;">Best For</h4>
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
            
            <p style="margin-top: 1.5rem; padding: 1rem; background: #fff3cd; border-radius: 10px; border-left: 4px solid #ffc107;">
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

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const contactFormMessage = document.getElementById('contactFormMessage');

function validateEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
}

if (contactForm && contactFormMessage) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
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

        contactForm.reset();
        contactFormMessage.textContent = 'Thank you for reaching out. Your inquiry has been noted and you will receive a response via email.';
        contactFormMessage.classList.add('success');
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

function openMediaModal(src, type, index = -1, caption = '') {
    currentGalleryIndex = index;
    const isVideo = type === 'video';
    const mediaEl = isVideo
        ? `<video src="${src}" controls autoplay playsinline></video>`
        : `<img src="${src}" alt="${caption || 'Gallery image'}">`;

    const prevBtn = `<button class="btn btn-outline" aria-label="Previous" onclick="galleryPrev()"><span>&larr; Prev</span></button>`;
    const nextBtn = `<button class="btn btn-outline" aria-label="Next" onclick="galleryNext()"><span>Next &rarr;</span></button>`;
    const downloadBtn = `<a class="download-btn" href="${src}" download style="text-decoration:none;"><button class="btn btn-primary" tabindex="-1"><span>Download</span></button></a>`;

    const controlsMarkup = galleryItems.length > 1
        ? `<div class="modal-controls">${prevBtn}<div style="flex:1"></div>${nextBtn}</div>`
        : '';

    const downloadMarkup = `<div style="margin-top:.5rem; text-align:right">${downloadBtn}</div>`;

    const captionMarkup = caption ? `<div class="modal-caption">${caption}</div>` : '';

    const mediaMarkup = `
        <div class="modal-header">
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            ${mediaEl}
            ${captionMarkup}
            ${controlsMarkup}
            ${downloadMarkup}
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

// Attach handlers to gallery items (handles images and video thumbnails)
function initGalleryHandlers() {
    // Build gallery items list
    galleryItems = [];

    const imgs = Array.from(document.querySelectorAll('.media-item > img'));

    imgs.forEach((img, i) => {
        const src = img.src;   //  FIXED
        const type = 'image';  //  FIXED
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

    const thumbs = document.querySelectorAll('.video-thumb') || [];

    thumbs.forEach((thumb) => {
        const src = thumb.dataset.src;
        const caption = thumb.dataset.caption || thumb.getAttribute('aria-label') || '';
        const index = galleryItems.length;

        galleryItems.push({ src, type: 'video', caption });

        const thumbImage = thumb.querySelector('img');
        if (thumbImage) {
            applyImagePathFallback(thumbImage, thumbImage.getAttribute('src') || '');
        }

        thumb.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openMediaModal(src, 'video', index, caption);
        });

        thumb.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openMediaModal(src, 'video', index, caption);
            }
        });
    });

    // Keyboard navigation (ONLY ONCE)
    document.addEventListener('keydown', (e) => {
        if (!modalContainer.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') galleryPrev();
        if (e.key === 'ArrowRight') galleryNext();
        if (e.key === 'Escape') closeModal();
    });
}

// Initialize gallery handlers once DOM is ready
// Initialize gallery handlers immediately since script is deferred
initGalleryHandlers();

// Expose global functions to window


// Booking System Logic
const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3000' : 'https://asha-mental-wellness-the-therapist.onrender.com';

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
        const response = await fetch(`${API_URL}/api/booked-slots?date=${dateInput}`);
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

async function confirmBooking() {
    const date = document.getElementById('bookingDate').value;
    const slot = document.getElementById('selectedSlot').value;
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    
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
            body: JSON.stringify({ name, email, date, slot })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('bookingFormDetails').style.display = 'none';
            document.getElementById('timeSlots').innerHTML = '';
            
            // Show clear professional confirmation
            let successMsg = document.getElementById('bookingSuccessMessage');
            if (!successMsg) {
                successMsg = document.createElement('div');
                successMsg.id = 'bookingSuccessMessage';
                successMsg.style.cssText = 'margin-top: 1rem; padding: 1rem; background: #e6f4ea; color: #1e4620; border-radius: 8px;';
                document.getElementById('bookingSystem').appendChild(successMsg);
            }
            successMsg.style.display = 'block';
            successMsg.innerHTML = `
                <h4 style="margin-top:0; color:#1e4620;">Session Booked Successfully</h4>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${slot}</p>
                <p style="margin-bottom:0; margin-top:10px; font-size:0.9em;">Confirmation emails have been sent.</p>
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

window.renderTimeSlots = renderTimeSlots;
window.selectSlot = selectSlot;
window.confirmBooking = confirmBooking;


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
async function fetchAndRenderReviews() {
    try {
        const response = await fetch(`${API_URL}/api/reviews`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        
        const data = await response.json();
        const reviews = data.reviews || [];
        
        const carousel = document.querySelector('.testimonials-carousel');
        const reviewsList = document.getElementById('reviewsList');
        
        if (reviews.length === 0) {
            // Empty State
            const emptyState = `
                <div style="text-align:center; padding: 40px; background:#fff; border-radius:12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <h3 style="color:#1e4620; margin-bottom:10px;">No Reviews Yet</h3>
                    <p style="color:#666;">Be the first to share your experience!</p>
                </div>
            `;
            if (carousel) carousel.innerHTML = emptyState;
            if (reviewsList) reviewsList.innerHTML = emptyState;
            return;
        }

        // Render Testimonials Carousel
        if (carousel) {
            let cardsHtml = '';
            let indicatorsHtml = '<div class="carousel-controls"><button class="btn-icon prev-btn" aria-label="Previous testimonial">&#8592;</button><div class="carousel-indicators">';
            
            reviews.forEach((rev, index) => {
                const activeClass = index === 0 ? 'active' : '';
                const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
                
                cardsHtml += `
                    <div class="testimonial-card ${activeClass}">
                        <div class="quote-icon">"</div>
                        <div style="color: #f59e0b; font-size: 1.2rem; margin-bottom: 10px;">${stars}</div>
                        <p class="testimonial-text">${escapeHTML(rev.message)}</p>
                        <div class="testimonial-author">
                            <h4>${escapeHTML(rev.name)}</h4>
                        </div>
                    </div>
                `;
                indicatorsHtml += `<button class="indicator ${activeClass}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`;
            });
            
            indicatorsHtml += '</div><button class="btn-icon next-btn" aria-label="Next testimonial">&#8594;</button></div>';
            carousel.innerHTML = cardsHtml + indicatorsHtml;
            
            // Rebind Carousel Logic
            rebindCarousel();
        }
        
        // Render Reviews List (Grid)
        if (reviewsList) {
            let listHtml = '';
            reviews.forEach(rev => {
                const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
                listHtml += `
                    <div style="background:#fff; padding:20px; border-radius:8px; margin-bottom:15px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                        <div style="color:#f59e0b; margin-bottom:10px;">${stars}</div>
                        <p style="margin-bottom:15px; color:#444;">"${escapeHTML(rev.message)}"</p>
                        <h4 style="color:#1e4620; margin:0; font-size:0.95rem;">- ${escapeHTML(rev.name)}</h4>
                    </div>
                `;
            });
            reviewsList.innerHTML = listHtml;
        }
        
    } catch (error) {
        console.error('Error rendering reviews:', error);
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function rebindCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    if (!cards.length) return;

    function showTestimonial(index) {
        cards.forEach(card => card.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        if(cards[index]) cards[index].classList.add('active');
        if(indicators[index]) indicators[index].classList.add('active');
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showTestimonial(currentIndex);
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        showTestimonial(currentIndex);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });
}

// Form Submission & Star UI
function initReviewForm() {
    const form = document.getElementById('reviewForm');
    const stars = document.querySelectorAll('.star-btn');
    const ratingInput = document.getElementById('reviewRating');
    const msg = document.getElementById('reviewFormMessage');
    
    if (!form) return;
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const val = parseInt(star.getAttribute('data-value'), 10);
            ratingInput.value = val;
            
            // Highlight stars
            stars.forEach((s, idx) => {
                if (idx < val) s.style.color = '#f59e0b'; // Gold
                else s.style.color = '#ccc'; // Gray
            });
        });
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reviewerName').value.trim();
        const email = document.getElementById('reviewerEmail').value.trim();
        const rating = ratingInput.value;
        const message = document.getElementById('reviewText').value.trim();
        
        if (!name || !email || !rating || !message) {
            msg.textContent = 'Please fill out all fields and select a star rating.';
            msg.style.color = 'red';
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${API_URL}/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, rating, message })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                form.reset();
                stars.forEach(s => s.style.color = '#ccc');
                ratingInput.value = '';
                msg.textContent = 'Thank you! Your review has been submitted and is pending approval.';
                msg.style.color = 'green';
            } else {
                msg.textContent = data.error || 'Failed to submit review.';
                msg.style.color = 'red';
            }
        } catch (error) {
            msg.textContent = 'Server connection failed. Please try again later.';
            msg.style.color = 'red';
        } finally {
            submitBtn.innerHTML = origText;
            submitBtn.disabled = false;
        }
    });
}

// Initialize Review System on load
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderReviews();
    initReviewForm();
});
// --- End Dynamic Review System ---
