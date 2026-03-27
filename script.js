// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
});

// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
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
    const calendarUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit?text=Therapy%20Session%20with%20Asha%20Suhasini%20Raja%20G&details=Please%20share%20your%20concern%20briefly.%20Contact%3A%20ashasuhasini02%40gmail.com&location=Online%20or%20Hyderabad&add=ashasuhasini02%40gmail.com';
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

function openModal(modalType) {
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
    setTimeout(() => {
        modalContainer.innerHTML = '';
    }, 300);
}

// Modal Content Generator
function getModalContent(modalType) {
    const modals = {
        educationModal: `
            <div class="modal-header">
                <h2>🎓 Education</h2>
                <button class="modal-close" onclick="closeModal()">×</button>
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
                <h2>📜 Certifications & Registration</h2>
                <button class="modal-close" onclick="closeModal()">×</button>
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
                <h2>⭐ Areas of Specialization</h2>
                <button class="modal-close" onclick="closeModal()">×</button>
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
                <h2>📅 Book a Session</h2>
                <button class="modal-close" onclick="closeModal()">×</button>
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
                <p>✓ In-person sessions (Hyderabad)</p>
                <p>✓ Online video consultations</p>
                <p>✓ Phone consultations</p>
                
                <h3>Contact Information</h3>
                <p><strong>Email:</strong> ashasuhasini02@gmail.com</p>
                <p><strong>Location:</strong> Hyderabad, India</p>

                <button class="contact-button" style="margin-top: 1rem;" onclick="openGoogleCalendarBooking()">
                    Open Google Calendar
                </button>
                
                <p style="margin-top: 2rem; padding: 1.5rem; background: #f8f9fa; border-radius: 15px;">
                    <strong>Note:</strong> First consultations include a comprehensive assessment to understand your needs and create a personalized treatment plan.
                </p>
            </div>
        `,
        inquiryModal: `
            <div class="modal-header">
                <h2>💬 General Inquiry</h2>
                <button class="modal-close" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body">
                <h3>Get in Touch</h3>
                <p>For general inquiries about services, workshops, or corporate programs, please reach out through the following channels:</p>
                
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 15px; margin: 1.5rem 0;">
                    <h4 style="margin-top: 0;">📧 Email</h4>
                    <p>ashasuhasini02@gmail.com</p>
                    
                    <h4>📍 Location</h4>
                    <p>Hyderabad, Telangana, India</p>
                    
                    <h4>⏰ Response Time</h4>
                    <p>Typically within 24-48 hours</p>
                </div>
                
                <h3>What to Include in Your Message</h3>
                <ul>
                    <li>Your name and contact information</li>
                    <li>Type of service you're interested in</li>
                    <li>Preferred session format (online/in-person)</li>
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
    const services = {
        individual: {
            title: '💭 Individual Therapy',
            description: 'Personalized one-on-one psychotherapy sessions designed to address your unique mental health needs.',
            details: [
                'Evidence-based therapeutic approaches including CBT, REBT, and DBT',
                'Treatment for depression, anxiety, stress, and other mental health concerns',
                'Personalized treatment plans tailored to your specific goals',
                'Safe, confidential, and non-judgmental environment',
                'Focus on building coping strategies and emotional resilience'
            ],
            duration: '50-minute sessions',
            format: 'Available online and in-person'
        },
        family: {
            title: '👨‍👩‍👧‍👦 Family & Marital Therapy',
            description: 'Strengthen relationships and resolve conflicts through compassionate family and couples counseling.',
            details: [
                'Improve communication and understanding between family members',
                'Address marital conflicts and relationship challenges',
                'Navigate major life transitions together',
                'Develop healthy relationship patterns',
                'Create stronger emotional bonds'
            ],
            duration: '60-minute sessions',
            format: 'In-person and online options available'
        },
        corporate: {
            title: '💼 Corporate Wellness',
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
            title: '🎯 Life Skills Coaching',
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
            title: '🌱 Trauma Counseling',
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
            title: '📚 Student Counseling',
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
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 1.5rem;">${service.description}</p>
            
            <h3>What to Expect</h3>
            <ul>
                ${service.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
            
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <p><strong>Session Duration:</strong> ${service.duration}</p>
                <p style="margin-bottom: 0;"><strong>Format:</strong> ${service.format}</p>
            </div>
            
            <button class="contact-button" style="margin-top: 2rem; width: 100%;" onclick="closeModal(); openModal('bookingModal')">
                Book a Session
            </button>
        </div>
    `;
    
    modalContainer.innerHTML = modalContent;
    modalOverlay.classList.add('active');
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Experience Modal Content
function openExperienceModal(orgType) {
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
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 1rem 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                <p style="margin: 0; font-weight: 600;">${exp.role}</p>
                <p style="margin: 0.3rem 0 0 0; opacity: 0.9;">${exp.period} • ${exp.location}</p>
            </div>
            
            <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 1.5rem;">${exp.description}</p>
            
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
}

// Therapy Method Modal Content
function openTherapyModal(methodType) {
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
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 1.5rem;">${method.description}</p>
            
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
}

// Workshop Modal Content
function openWorkshopModal(workshopType) {
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
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 1.5rem;">${workshop.description}</p>
            
            <h3>Workshop Content</h3>
            <ul>
                ${workshop.content.map(item => `<li>${item}</li>`).join('')}
            </ul>
            
            <div style="background: var(--card-bg); padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <p><strong>Duration:</strong> ${workshop.duration}</p>
                <p style="margin-bottom: 0;"><strong>Target Audience:</strong> ${workshop.audience}</p>
            </div>
            
            <p style="margin-top: 1.5rem; padding: 1rem; background: #fff3cd; border-radius: 10px; border-left: 4px solid #ffc107;">
                <strong>Note:</strong> Workshops can be customized for schools, corporate organizations, and community groups.
            </p>
            
            <button class="contact-button" style="margin-top: 2rem; width: 100%;" onclick="closeModal(); openModal('inquiryModal')">
                Inquire About This Workshop
            </button>
        </div>
    `;
    
    modalContainer.innerHTML = modalContent;
    modalOverlay.classList.add('active');
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
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
const themeToggle = document.getElementById('themeToggle');
const themeToggleIcon = themeToggle ? themeToggle.querySelector('.theme-toggle-icon') : null;

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if (themeToggleIcon) themeToggleIcon.textContent = '☀️';
    } else {
        document.body.removeAttribute('data-theme');
        if (themeToggleIcon) themeToggleIcon.textContent = '🌙';
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('asha-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);
}

if (themeToggle) {
    initTheme();
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem('asha-theme', nextTheme);
    });
}

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

// Reviews: store and render ratings in browser localStorage
const reviewForm = document.getElementById('reviewForm');
const reviewFormMessage = document.getElementById('reviewFormMessage');
const reviewsList = document.getElementById('reviewsList');
const averageRating = document.getElementById('averageRating');
const averageStars = document.getElementById('averageStars');
const reviewCount = document.getElementById('reviewCount');
const ratingCountEls = {
    5: document.getElementById('ratingCount5'),
    4: document.getElementById('ratingCount4'),
    3: document.getElementById('ratingCount3'),
    2: document.getElementById('ratingCount2'),
    1: document.getElementById('ratingCount1')
};
const ratingBarEls = {
    5: document.getElementById('ratingBar5'),
    4: document.getElementById('ratingBar4'),
    3: document.getElementById('ratingBar3'),
    2: document.getElementById('ratingBar2'),
    1: document.getElementById('ratingBar1')
};
const REVIEWS_STORAGE_KEY = 'asha-client-reviews';

const defaultReviews = [
    {
        name: 'Client A',
        rating: 5,
        text: 'Very supportive and practical guidance. I felt heard and understood.',
        date: '2026-03-01'
    },
    {
        name: 'Workshop Participant',
        rating: 5,
        text: 'The workshop was insightful and easy to apply in day-to-day life.',
        date: '2026-03-10'
    }
];

function getStoredReviews() {
    try {
        const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
        if (!raw) return defaultReviews.slice();
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return defaultReviews.slice();
        return parsed.filter(item => item && item.name && item.text && Number(item.rating));
    } catch (error) {
        return defaultReviews.slice();
    }
}

function saveReviews(reviews) {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
}

function makeReviewKey(review) {
    return [review.name || '', review.date || '', review.text || ''].join('|');
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// One-time cleanup for a specifically requested review removal.
function removeBlockedReviews() {
    const reviews = getStoredReviews();
    const filtered = reviews.filter((review) => {
        const name = (review.name || '').toLowerCase();
        const text = (review.text || '').toLowerCase();
        const isTargetReview = name.includes('nandhan')
            && text.includes('safe person to walk to for help');
        return !isTargetReview;
    });

    if (filtered.length !== reviews.length) {
        saveReviews(filtered);
    }
}

function starsFromRating(rating) {
    const filled = '★'.repeat(Math.max(0, Math.min(5, rating)));
    const empty = '☆'.repeat(5 - Math.max(0, Math.min(5, rating)));
    return `${filled}${empty}`;
}

function formatReviewDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function renderReviews() {
    if (!reviewsList || !averageRating || !averageStars || !reviewCount) return;

    const reviews = getStoredReviews();
    const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
    const avg = reviews.length ? total / reviews.length : 0;
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((review) => {
        const rating = Number(review.rating || 0);
        if (distribution[rating] !== undefined) distribution[rating] += 1;
    });

    averageRating.textContent = avg.toFixed(1);
    averageStars.textContent = starsFromRating(Math.round(avg));
    reviewCount.textContent = String(reviews.length);
    [5, 4, 3, 2, 1].forEach((rating) => {
        const count = distribution[rating];
        const percent = reviews.length ? (count / reviews.length) * 100 : 0;
        if (ratingCountEls[rating]) ratingCountEls[rating].textContent = String(count);
        if (ratingBarEls[rating]) ratingBarEls[rating].style.width = `${percent}%`;
    });

    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p class="review-text">No reviews yet. Be the first to share your feedback.</p>';
        return;
    }

    reviewsList.innerHTML = reviews
        .slice()
        .reverse()
        .map((review) => `
            <article class="review-card">
                <div class="review-card-header">
                    <span class="review-name">${escapeHtml(review.name)}</span>
                    <span class="review-stars" aria-label="${review.rating} out of 5 stars">${starsFromRating(Number(review.rating))}</span>
                </div>
                <div class="review-actions">
                    <button class="review-delete-btn" type="button" onclick="deleteReview('${encodeURIComponent(makeReviewKey(review))}')">Delete</button>
                </div>
                <p class="review-date">${formatReviewDate(review.date)}</p>
                <p class="review-text">${escapeHtml(review.text)}</p>
            </article>
        `)
        .join('');
}

function deleteReview(encodedKey) {
    const key = decodeURIComponent(encodedKey);
    const reviews = getStoredReviews();
    const nextReviews = reviews.filter((review) => makeReviewKey(review) !== key);
    saveReviews(nextReviews);
    renderReviews();
}

window.deleteReview = deleteReview;

if (reviewForm && reviewFormMessage) {
    removeBlockedReviews();
    renderReviews();

    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        reviewFormMessage.classList.remove('success', 'error');

        const formData = new FormData(reviewForm);
        const name = (formData.get('reviewerName') || '').toString().trim();
        const rating = Number((formData.get('reviewRating') || '').toString());
        const text = (formData.get('reviewText') || '').toString().trim();

        if (!name || !rating || !text) {
            reviewFormMessage.textContent = 'Please fill your name, rating, and review before submitting.';
            reviewFormMessage.classList.add('error');
            return;
        }

        if (rating < 1 || rating > 5) {
            reviewFormMessage.textContent = 'Please select a valid rating between 1 and 5.';
            reviewFormMessage.classList.add('error');
            return;
        }

        const reviews = getStoredReviews();
        reviews.push({
            name,
            rating,
            text,
            date: new Date().toISOString()
        });

        saveReviews(reviews);
        renderReviews();
        reviewForm.reset();
        reviewFormMessage.textContent = 'Thank you! Your review has been added.';
        reviewFormMessage.classList.add('success');
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

    const prevBtn = `<button class="nav-btn" aria-label="Previous" onclick="galleryPrev()">← Prev</button>`;
    const nextBtn = `<button class="nav-btn" aria-label="Next" onclick="galleryNext()">Next →</button>`;
    const downloadBtn = `<a class="download-btn" href="${src}" download><button class="download-btn">Download</button></a>`;

    const controlsMarkup = galleryItems.length > 1
        ? `<div class="modal-controls">${prevBtn}<div style="flex:1"></div>${nextBtn}</div>`
        : '';

    const downloadMarkup = `<div style="margin-top:.5rem; text-align:right">${downloadBtn}</div>`;

    const captionMarkup = caption ? `<div class="modal-caption">${caption}</div>` : '';

    const mediaMarkup = `
        <div class="modal-header">
            <button class="modal-close" onclick="closeModal()">×</button>
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
        const src = img.src;   // ✅ FIXED
        const type = 'image';  // ✅ FIXED
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
document.addEventListener('DOMContentLoaded', initGalleryHandlers);
