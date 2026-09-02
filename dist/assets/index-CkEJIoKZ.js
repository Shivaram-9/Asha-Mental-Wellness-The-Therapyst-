(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`menuToggle`),t=document.getElementById(`desktopMenuToggle`),n=document.getElementById(`menuClose`),r=document.getElementById(`sidebar`),i=document.getElementById(`sidebarOverlay`);function a(){if(window.innerWidth>1024)document.body.classList.toggle(`desktop-sidebar-closed`);else{r.classList.toggle(`open`),i.classList.toggle(`active`);let t=r.classList.contains(`open`);e&&e.setAttribute(`aria-expanded`,t?`true`:`false`),document.body.style.overflow=t?`hidden`:``}}e&&e.addEventListener(`click`,a),t&&t.addEventListener(`click`,a),n&&n.addEventListener(`click`,a),i&&i.addEventListener(`click`,a),document.querySelectorAll(`.nav-link`).forEach(e=>{e.addEventListener(`click`,()=>{r.classList.contains(`open`)&&a()})});function o(e){let t=document.getElementById(e);t&&t.scrollIntoView({behavior:`smooth`,block:`start`})}function s(){window.open(`https://calendar.google.com/calendar/u/0/r/eventedit?text=Therapy%20Session%20with%20Asha%20Suhasini%20Raja%20G&details=Please%20share%20your%20concern%20briefly.%20Contact%3A%20asha.suhasinim%40gmail.com&location=Online%20or%20Hyderabad&add=asha.suhasinim%40gmail.com`,`_blank`,`noopener,noreferrer`)}document.querySelectorAll(`a[href^="#"]`).forEach(e=>{e.addEventListener(`click`,function(e){e.preventDefault(),o(this.getAttribute(`href`).substring(1))})});function c(e){let t=parseInt(e.getAttribute(`data-target`)),n=t/(2e3/16),r=0,i=setInterval(()=>{r+=n,r>=t?(e.textContent=t,clearInterval(i)):e.textContent=Math.floor(r)},16)}var l=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(document.querySelectorAll(`.stat-number`).forEach(e=>{c(e)}),l.unobserve(e.target))})},{threshold:.5}),u=document.querySelector(`.hero`);u&&l.observe(u);var d=document.querySelectorAll(`.reveal`),f=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`active`)})},{threshold:.1});d.forEach(e=>{f.observe(e)});var p=document.getElementById(`modalOverlay`),m=document.getElementById(`modalContainer`),h;function g(e){h&&clearTimeout(h),m.innerHTML=v(e),p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let t=document.getElementById(`bookingDate`);t&&(t.min=new Date().toISOString().split(`T`)[0])}function _(){p.classList.remove(`active`),m.classList.remove(`active`),document.body.style.overflow=`auto`,h=setTimeout(()=>{m.classList.contains(`active`)||(m.innerHTML=``)},300)}function v(e){return{educationModal:`
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
        `,certificationModal:`
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
        `,specializationModal:`
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
        `,bookingModal:`
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
        `,inquiryModal:`
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
        `}[e]||``}function y(e){h!==void 0&&h&&clearTimeout(h);let t={individual:{title:` Individual Therapy`,description:`Personalized one-on-one psychotherapy sessions designed to address your unique mental health needs.`,details:[`Evidence-based therapeutic approaches including CBT, REBT, and DBT`,`Treatment for depression, anxiety, stress, and other mental health concerns`,`Personalized treatment plans tailored to your specific goals`,`Safe, confidential, and non-judgmental environment`,`Focus on building coping strategies and emotional resilience`],duration:`50-minute sessions`,format:`Available online`},family:{title:` Family & Marital Therapy`,description:`Strengthen relationships and resolve conflicts through compassionate family and couples counseling.`,details:[`Improve communication and understanding between family members`,`Address marital conflicts and relationship challenges`,`Navigate major life transitions together`,`Develop healthy relationship patterns`,`Create stronger emotional bonds`],duration:`60-minute sessions`,format:`Online options available`},corporate:{title:` Corporate Wellness`,description:`Comprehensive mental health programs designed to enhance workplace well-being and productivity.`,details:[`Employee counseling and support services`,`Stress management workshops`,`Leadership coaching programs`,`Team building and communication training`,`Crisis intervention and support`,`Customized wellness initiatives`],duration:`Flexible program duration`,format:`On-site and virtual programs`},coaching:{title:` Life Skills Coaching`,description:`Personalized coaching programs to build confidence, achieve goals, and develop lasting resilience.`,details:[`Goal setting and achievement strategies`,`Building self-confidence and self-esteem`,`Developing effective communication skills`,`Time management and productivity`,`Emotional intelligence development`,`Career guidance and professional development`],duration:`Customized session length`,format:`Individual and group coaching available`},trauma:{title:` Trauma Counseling`,description:`Specialized support for healing from traumatic experiences and critical incidents.`,details:[`PTSD treatment and management`,`Grief and loss counseling`,`Critical Incident Stress Debriefing (CISD)`,`Trauma-informed therapeutic approaches`,`Building post-traumatic resilience`,`Safe processing of difficult experiences`],duration:`Flexible based on needs`,format:`Sensitive, confidential support`},student:{title:` Student Counseling`,description:`Academic support and personal development guidance for students of all ages.`,details:[`Exam stress and academic pressure management`,`Career guidance and educational planning`,`Study skills and time management`,`Social and emotional development`,`Peer relationship issues`,`Building confidence and self-esteem`],duration:`45-50 minute sessions`,format:`Age-appropriate counseling methods`}}[e];if(!t)return;m.innerHTML=`
        <div class="modal-header">
            <h2>${t.title}</h2>
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 1.5rem;">${t.description}</p>
            
            <h3>What to Expect</h3>
            <ul>
                ${t.details.map(e=>`<li>${e}</li>`).join(``)}
            </ul>
            
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <p><strong>Session Duration:</strong> ${t.duration}</p>
                <p style="margin-bottom: 0;"><strong>Format:</strong> ${t.format}</p>
            </div>
            
            <button class="btn btn-primary contact-button" style="margin-top: 2rem; width: 100%;" onclick="closeModal(); openModal('bookingModal')"><span>
                Book a Session
            </span></button>
        </div>
    `,p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let n=document.getElementById(`bookingDate`);n&&(n.min=new Date().toISOString().split(`T`)[0])}function b(e){h!==void 0&&h&&clearTimeout(h);let t={klh:{title:`KLH University`,role:`Consulting Psychotherapist`,period:`2023 - Present`,location:`Hyderabad`,description:`Providing comprehensive psychological support to university students and faculty members.`,responsibilities:[`Individual counseling for students dealing with academic stress and personal challenges`,`Conducting mental health awareness workshops`,`Crisis intervention and support services`,`Collaborating with faculty to create a supportive campus environment`,`Developing mental wellness programs for the university community`]},modern:{title:`Modern Health`,role:`Psychological Consultant & Psychotherapist`,period:`Current`,location:`Arizona, USA (Remote)`,description:`Delivering evidence-based mental health care to a global clientele through a leading digital mental health platform.`,responsibilities:[`Providing teletherapy to diverse international clients`,`Utilizing digital tools for effective remote counseling`,`Maintaining highest standards of care in virtual settings`,`Adapting therapeutic approaches for online delivery`,`Contributing to global mental health accessibility`]},private:{title:`Private Practice`,role:`Independent Psychotherapist`,period:`Since 2006`,location:`Global Clientele`,description:`Building a trusted practice over 19+ years, serving individuals, families, and organizations worldwide.`,responsibilities:[`Individual and family therapy across diverse age groups`,`Specialized trauma counseling and PTSD treatment`,`Life skills coaching and personal development`,`Corporate wellness consulting`,`Building long-term therapeutic relationships based on trust`]},manah:{title:`Manah Wellness`,role:`Senior Mental Wellness Consultant`,period:`Previous`,location:`Remote`,description:`Affiliated as a senior consultant, offering guidance and therapy to clients globally.`,responsibilities:[`Remote counseling and psychotherapy`,`Mental wellness program development`,`Client assessment and treatment planning`,`Collaborative care with multidisciplinary teams`,`Supporting diverse populations across different time zones`]},morneau:{title:`Morneau Shepell`,role:`Trauma Counseling Specialist & CISD Facilitator`,period:`Previous`,location:`Canada (Remote)`,description:`Specialized in trauma counseling and Critical Incident Stress Debriefing during challenging times.`,responsibilities:[`Providing grief and trauma counseling`,`Facilitating Critical Incident Stress Debriefing (CISD)`,`Supporting organizations during the pandemic`,`Emergency response and crisis intervention`,`Training staff on stress management techniques`]},hyundai:{title:`Hyundai Mobis`,role:`Corporate Mental Wellness Consultant`,period:`Previous`,location:`Hi-Tech City, Hyderabad`,description:`Leading mental wellness initiatives for corporate employees in a high-tech environment.`,responsibilities:[`Employee counseling and support services`,`Developing workplace wellness programs`,`Conducting stress management workshops`,`Leadership coaching for executives`,`Creating a mentally healthy workplace culture`]}}[e];if(!t)return;m.innerHTML=`
        <div class="modal-header">
            <h2>${t.title}</h2>
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 1rem 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                <p style="margin: 0; font-weight: 600;">${t.role}</p>
                <p style="margin: 0.3rem 0 0 0; opacity: 0.9;">${t.period}  ${t.location}</p>
            </div>
            
            <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 1.5rem;">${t.description}</p>
            
            <h3>Key Responsibilities</h3>
            <ul>
                ${t.responsibilities.map(e=>`<li>${e}</li>`).join(``)}
            </ul>
        </div>
    `,p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let n=document.getElementById(`bookingDate`);n&&(n.min=new Date().toISOString().split(`T`)[0])}function x(e){h!==void 0&&h&&clearTimeout(h);let t={cbt:{title:`Cognitive Behavioural Therapy (CBT)`,description:`CBT is a structured, goal-oriented therapy that focuses on identifying and changing negative thought patterns and behaviors.`,benefits:[`Effective for treating depression, anxiety, and stress`,`Practical strategies for managing difficult situations`,`Focus on present problems and solutions`,`Teaches skills that last a lifetime`,`Evidence-based approach with proven results`],ideal:`Ideal for individuals dealing with anxiety, depression, phobias, and stress-related disorders.`},rebt:{title:`Rational Emotive Behaviour Therapy (REBT)`,description:`REBT helps identify irrational beliefs and replace them with healthier, more rational thoughts.`,benefits:[`Challenge and change irrational thinking patterns`,`Develop emotional resilience`,`Take responsibility for emotions and behaviors`,`Build unconditional self-acceptance`,`Achieve long-term emotional well-being`],ideal:`Perfect for those looking to transform negative thinking and build stronger emotional health.`},dbt:{title:`Dialectical Behaviour Therapy (DBT)`,description:`DBT combines cognitive-behavioral techniques with mindfulness practices to help regulate emotions.`,benefits:[`Enhanced emotional regulation`,`Improved interpersonal effectiveness`,`Mindfulness and distress tolerance skills`,`Effective for borderline personality disorder`,`Reduces self-destructive behaviors`],ideal:`Beneficial for individuals with intense emotions and relationship difficulties.`},sfbt:{title:`Solution-Focused Brief Therapy (SFBT)`,description:`SFBT is a goal-directed approach that focuses on solutions rather than problems.`,benefits:[`Quick, efficient therapeutic process`,`Focus on strengths and resources`,`Goal-oriented and practical`,`Empowers clients to find their own solutions`,`Positive, future-focused approach`],ideal:`Great for individuals seeking specific, achievable goals in a shorter timeframe.`},fmt:{title:`Family & Marital Therapy (FMT)`,description:`FMT addresses relationship issues and family dynamics to improve communication and resolve conflicts.`,benefits:[`Improved family communication`,`Conflict resolution strategies`,`Strengthened emotional bonds`,`Better understanding of family roles`,`Healthier relationship patterns`],ideal:`Essential for families and couples facing relationship challenges or major transitions.`},gestalt:{title:`Gestalt Therapy`,description:`Gestalt therapy emphasizes personal responsibility and focuses on present experience and awareness.`,benefits:[`Increased self-awareness`,`Better emotional expression`,`Living in the present moment`,`Personal growth and authenticity`,`Improved relationships and communication`],ideal:`Suitable for those seeking deeper self-understanding and personal growth.`}}[e];if(!t)return;m.innerHTML=`
        <div class="modal-header">
            <h2>${t.title}</h2>
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 1.5rem;">${t.description}</p>
            
            <h3>Key Benefits</h3>
            <ul>
                ${t.benefits.map(e=>`<li>${e}</li>`).join(``)}
            </ul>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <h4 style="margin-top: 0; color: white;">Best For</h4>
                <p style="margin: 0;">${t.ideal}</p>
            </div>
        </div>
    `,p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let n=document.getElementById(`bookingDate`);n&&(n.min=new Date().toISOString().split(`T`)[0])}function S(e){h!==void 0&&h&&clearTimeout(h);let t={confidence:{title:`Building Confidence in Children`,description:`Empowering young minds with self-belief and resilience.`,content:[`Understanding child psychology and development`,`Techniques to boost self-esteem in children`,`Handling criticism and building resilience`,`Encouraging positive self-talk`,`Creating supportive home environments`,`Practical exercises for parents and educators`],duration:`2-3 hours interactive workshop`,audience:`Parents, teachers, and caregivers`},exam:{title:`Managing Exam Stress`,description:`Proven techniques for academic success and stress reduction.`,content:[`Understanding exam anxiety and its effects`,`Effective study techniques and time management`,`Relaxation and mindfulness exercises`,`Building confidence before exams`,`Handling performance pressure`,`Post-exam coping strategies`],duration:`2 hours interactive session`,audience:`Students, parents, and educators`},parenting:{title:`Conscious Parenting`,description:`Building deeper emotional connections with your children.`,content:[`Understanding emotional intelligence in parenting`,`Effective communication with children`,`Setting healthy boundaries with love`,`Dealing with challenging behaviors`,`Building trust and emotional security`,`Creating mindful family practices`],duration:`3-hour comprehensive workshop`,audience:`Parents and expecting parents`},mindset:{title:`Developing a Winning Mindset`,description:`Cultivating resilience, determination, and success orientation.`,content:[`Growth mindset vs fixed mindset`,`Overcoming limiting beliefs`,`Goal setting and achievement strategies`,`Building mental toughness`,`Handling failure and setbacks`,`Developing positive habits`],duration:`Half-day workshop`,audience:`Professionals, students, and individuals`}}[e];if(!t)return;m.innerHTML=`
        <div class="modal-header">
            <h2>${t.title}</h2>
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 1.5rem;">${t.description}</p>
            
            <h3>Workshop Content</h3>
            <ul>
                ${t.content.map(e=>`<li>${e}</li>`).join(``)}
            </ul>
            
            <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <p><strong>Duration:</strong> ${t.duration}</p>
                <p style="margin-bottom: 0;"><strong>Target Audience:</strong> ${t.audience}</p>
            </div>
            
            <p style="margin-top: 1.5rem; padding: 1rem; background: #fff3cd; border-radius: 10px; border-left: 4px solid #ffc107;">
                <strong>Note:</strong> Workshops can be customized for schools, corporate organizations, and community groups.
            </p>
            
            <button class="btn btn-primary contact-button" style="margin-top: 2rem; width: 100%;" onclick="closeModal(); openModal('inquiryModal')"><span>
                Inquire About This Workshop
            </span></button>
        </div>
    `,p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let n=document.getElementById(`bookingDate`);n&&(n.min=new Date().toISOString().split(`T`)[0])}p.addEventListener(`click`,_),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&_()}),window.addEventListener(`scroll`,()=>{let e=window.pageYOffset,t=document.querySelector(`.hero-content`);t&&(t.style.transform=`translateY(${e*.5}px)`,t.style.opacity=1-e/700)});var C=document.getElementById(`contactForm`),w=document.getElementById(`contactFormMessage`);function T(e){return/\S+@\S+\.\S+/.test(e)}C&&w&&C.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(C),n=(t.get(`name`)||``).toString().trim(),r=(t.get(`email`)||``).toString().trim(),i=(t.get(`message`)||``).toString().trim();if(w.classList.remove(`success`,`error`),!n||!r||!i){w.textContent=`Please fill in your name, email, and a short message so I can respond meaningfully.`,w.classList.add(`error`);return}if(!T(r)){w.textContent=`Please enter a valid email address so I can reach you.`,w.classList.add(`error`);return}C.reset(),w.textContent=`Thank you for reaching out. Your inquiry has been noted and you will receive a response via email.`,w.classList.add(`success`)}),console.log(`Asha Suhasini Raja - Website Initialized Successfully!`);var E=[],D=-1;function O(e){if(!e)return[];if(/^(https?:)?\/\//.test(e)||e.startsWith(`data:`)||e.startsWith(`blob:`))return[e];let t=e.replace(/\\/g,`/`).replace(/^\.\//,``).replace(/^\/+/,``),n=[`./${t}`,t,`../${t}`,`/${t}`];return[...new Set(n)]}function k(e,t){let n=O(t||e.getAttribute(`src`)||``);n.length!==0&&(e.src=n[0],e.dataset.pathTriedIndex=`0`,e.addEventListener(`error`,()=>{let t=Number(e.dataset.pathTriedIndex||0)+1;t>=n.length||(e.dataset.pathTriedIndex=String(t),e.src=n[t])}))}function A(e,t,n=-1,r=``){D=n;let i=t===`video`?`<video src="${e}" controls autoplay playsinline></video>`:`<img src="${e}" alt="${r||`Gallery image`}">`,a=`<a class="download-btn" href="${e}" download style="text-decoration:none;"><button class="btn btn-primary" tabindex="-1"><span>Download</span></button></a>`,o=E.length>1?`<div class="modal-controls"><button class="btn btn-outline" aria-label="Previous" onclick="galleryPrev()"><span>&larr; Prev</span></button><div style="flex:1"></div><button class="btn btn-outline" aria-label="Next" onclick="galleryNext()"><span>Next &rarr;</span></button></div>`:``,s=`<div style="margin-top:.5rem; text-align:right">${a}</div>`;m.innerHTML=`
        <div class="modal-header">
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            ${i}
            ${r?`<div class="modal-caption">${r}</div>`:``}
            ${o}
            ${s}
        </div>
    `,p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let c=document.getElementById(`bookingDate`);c&&(c.min=new Date().toISOString().split(`T`)[0])}function j(){if(E.length===0)return;let e=(D-1+E.length)%E.length,t=E[e];A(t.src,t.type,e,t.caption)}function M(){if(E.length===0)return;let e=(D+1)%E.length,t=E[e];A(t.src,t.type,e,t.caption)}function N(){E=[],Array.from(document.querySelectorAll(`.media-item > img`)).forEach((e,t)=>{let n=e.src,r=`image`,i=e.alt||``;E.push({src:n,type:r,caption:i}),e.setAttribute(`loading`,`lazy`),k(e,n),e.style.cursor=`pointer`,e.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),A(n,r,t,i)})}),(document.querySelectorAll(`.video-thumb`)||[]).forEach(e=>{let t=e.dataset.src,n=e.dataset.caption||e.getAttribute(`aria-label`)||``,r=E.length;E.push({src:t,type:`video`,caption:n});let i=e.querySelector(`img`);i&&k(i,i.getAttribute(`src`)||``),e.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),A(t,`video`,r,n)}),e.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),A(t,`video`,r,n))})}),document.addEventListener(`keydown`,e=>{m.classList.contains(`active`)&&(e.key===`ArrowLeft`&&j(),e.key===`ArrowRight`&&M(),e.key===`Escape`&&_())})}N();var P=window.location.hostname===`localhost`||window.location.hostname===`127.0.0.1`?`http://localhost:3000`:`https://asha-mental-wellness-the-therapyst.onrender.com`;async function F(){let e=document.getElementById(`bookingDate`).value,t=document.getElementById(`timeSlots`),n=document.getElementById(`bookingFormDetails`),r=document.getElementById(`bookingSuccessMessage`),i=document.getElementById(`slotLabel`);if(n.style.display=`none`,r&&(r.style.display=`none`),!e){t.innerHTML=`<p class="text-muted">Please select a date first.</p>`,i&&(i.innerText=`Available Slots`);return}let[a,o,s]=e.split(`-`),c=new Date(a,o-1,s).getDay()===0,l=c?[`12:00 PM`,`1:00 PM`,`2:00 PM`,`3:00 PM`]:[`5:00 PM`,`6:00 PM`,`7:00 PM`,`8:00 PM`];i&&(i.innerText=c?`Available Slots (12:00 PM - 4:00 PM)`:`Available Slots (5:00 PM - 9:00 PM)`),t.innerHTML=`<p class="text-muted">Loading available slots...</p>`;let u=[];try{let t=await fetch(`${P}/api/booked-slots?date=${e}`);t.ok?u=(await t.json()).booked||[]:console.warn(`Backend unavailable, using strict local check as fallback for rendering only.`)}catch(e){console.error(`Backend connection failed:`,e)}t.innerHTML=``;let d=!1;l.forEach(e=>{if(!u.includes(e)){d=!0;let n=document.createElement(`button`);n.className=`btn btn-outline time-slot-btn`,n.textContent=e,n.onclick=()=>I(n,e),t.appendChild(n)}}),d||(t.innerHTML=`<p class="text-muted">No slots available for this date. Please select another date.</p>`)}function I(e,t){document.querySelectorAll(`.time-slot-btn`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`),document.getElementById(`selectedSlot`).value=t,document.getElementById(`bookingFormDetails`).style.display=`block`;let n=document.getElementById(`bookingSuccessMessage`);n&&(n.style.display=`none`)}async function L(){let e=document.getElementById(`bookingDate`).value,t=document.getElementById(`selectedSlot`).value,n=document.getElementById(`bookingName`).value,r=document.getElementById(`bookingEmail`).value;if(!e||!t||!n||!r){alert(`Please fill in all fields to confirm booking.`);return}let i=document.querySelector(`#bookingFormDetails button`),a=i.innerHTML;i.innerHTML=`Processing...`,i.disabled=!0;try{let i=await fetch(`${P}/api/book`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:n,email:r,date:e,slot:t})}),a=await i.json();if(i.ok){document.getElementById(`bookingFormDetails`).style.display=`none`,document.getElementById(`timeSlots`).innerHTML=``;let i=document.getElementById(`bookingSuccessMessage`);i||(i=document.createElement(`div`),i.id=`bookingSuccessMessage`,i.style.cssText=`margin-top: 1rem; padding: 1rem; background: #e6f4ea; color: #1e4620; border-radius: 8px;`,document.getElementById(`bookingSystem`).appendChild(i)),i.style.display=`block`,i.innerHTML=`
                <h4 style="margin-top:0; color:#1e4620;">Session Booked Successfully</h4>
                <p><strong>Name:</strong> ${n}</p>
                <p><strong>Email:</strong> ${r}</p>
                <p><strong>Date:</strong> ${e}</p>
                <p><strong>Time:</strong> ${t}</p>
                <p style="margin-bottom:0; margin-top:10px; font-size:0.9em;">Confirmation emails have been sent.</p>
            `}else alert(`Booking failed: `+(a.error||`Please try again.`)),F()}catch(e){alert(`Failed to connect to the booking server. Please ensure the backend is running.`),console.error(e)}finally{i.innerHTML=a,i.disabled=!1}}window.renderTimeSlots=F,window.selectSlot=I,window.confirmBooking=L,window.openGoogleCalendarBooking=s,window.scrollToSection=o,window.openModal=g,window.closeModal=_,window.openServiceModal=y,window.openExperienceModal=b,window.openTherapyModal=x,window.openWorkshopModal=S,window.galleryPrev=j,window.galleryNext=M;var R=document.querySelectorAll(`.testimonial-card`),z=document.querySelectorAll(`.indicator`),B=document.querySelector(`.prev-btn`),V=document.querySelector(`.next-btn`),H=0;function U(e){R.forEach(e=>e.classList.remove(`active`)),z.forEach(e=>e.classList.remove(`active`)),R[e].classList.add(`active`),z[e].classList.add(`active`)}B&&V&&(B.addEventListener(`click`,()=>{H=H>0?H-1:R.length-1,U(H)}),V.addEventListener(`click`,()=>{H=H<R.length-1?H+1:0,U(H)}),z.forEach((e,t)=>{e.addEventListener(`click`,()=>{H=t,U(H)})}),setInterval(()=>{H=H<R.length-1?H+1:0,U(H)},6e3));async function W(){try{let e=await fetch(`${P}/api/reviews`);if(!e.ok)throw Error(`Failed to fetch reviews`);let t=(await e.json()).reviews||[],n=document.querySelector(`.testimonials-carousel`),r=document.getElementById(`reviewsList`);if(t.length===0){let e=`
                <div style="text-align:center; padding: 40px; background:#fff; border-radius:12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <h3 style="color:#1e4620; margin-bottom:10px;">No Reviews Yet</h3>
                    <p style="color:#666;">Be the first to share your experience!</p>
                </div>
            `;n&&(n.innerHTML=e),r&&(r.innerHTML=e);return}if(n){let e=``,r=`<div class="carousel-controls"><button class="btn-icon prev-btn" aria-label="Previous testimonial">&#8592;</button><div class="carousel-indicators">`;t.forEach((t,n)=>{let i=n===0?`active`:``,a=`★`.repeat(t.rating)+`☆`.repeat(5-t.rating);e+=`
                    <div class="testimonial-card ${i}">
                        <div class="quote-icon">"</div>
                        <div style="color: #f59e0b; font-size: 1.2rem; margin-bottom: 10px;">${a}</div>
                        <p class="testimonial-text">${G(t.message)}</p>
                        <div class="testimonial-author">
                            <h4>${G(t.name)}</h4>
                        </div>
                    </div>
                `,r+=`<button class="indicator ${i}" data-index="${n}" aria-label="Go to slide ${n+1}"></button>`}),r+=`</div><button class="btn-icon next-btn" aria-label="Next testimonial">&#8594;</button></div>`,n.innerHTML=e+r,K()}if(r){let e=``;t.forEach(t=>{let n=`★`.repeat(t.rating)+`☆`.repeat(5-t.rating);e+=`
                    <div style="background:#fff; padding:20px; border-radius:8px; margin-bottom:15px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                        <div style="color:#f59e0b; margin-bottom:10px;">${n}</div>
                        <p style="margin-bottom:15px; color:#444;">"${G(t.message)}"</p>
                        <h4 style="color:#1e4620; margin:0; font-size:0.95rem;">- ${G(t.name)}</h4>
                    </div>
                `}),r.innerHTML=e}}catch(e){console.error(`Error rendering reviews:`,e)}}function G(e){return e.replace(/[&<>'"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,"'":`&#39;`,'"':`&quot;`})[e]||e)}function K(){let e=document.querySelectorAll(`.testimonial-card`),t=document.querySelectorAll(`.indicator`),n=document.querySelector(`.prev-btn`),r=document.querySelector(`.next-btn`),i=0;if(!e.length)return;function a(n){e.forEach(e=>e.classList.remove(`active`)),t.forEach(e=>e.classList.remove(`active`)),e[n]&&e[n].classList.add(`active`),t[n]&&t[n].classList.add(`active`)}n&&n.addEventListener(`click`,()=>{i=(i-1+e.length)%e.length,a(i)}),r&&r.addEventListener(`click`,()=>{i=(i+1)%e.length,a(i)}),t.forEach((e,t)=>{e.addEventListener(`click`,()=>{i=t,a(i)})})}function q(){let e=document.getElementById(`reviewForm`),t=document.querySelectorAll(`.star-btn`),n=document.getElementById(`reviewRating`),r=document.getElementById(`reviewFormMessage`);e&&(t.forEach(e=>{e.addEventListener(`click`,()=>{let r=parseInt(e.getAttribute(`data-value`),10);n.value=r,t.forEach((e,t)=>{t<r?e.style.color=`#f59e0b`:e.style.color=`#ccc`})})}),e.addEventListener(`submit`,async i=>{i.preventDefault();let a=document.getElementById(`reviewerName`).value.trim(),o=document.getElementById(`reviewerEmail`).value.trim(),s=n.value,c=document.getElementById(`reviewText`).value.trim();if(!a||!o||!s||!c){r.textContent=`Please fill out all fields and select a star rating.`,r.style.color=`red`;return}let l=e.querySelector(`button[type="submit"]`),u=l.innerHTML;l.innerHTML=`Submitting...`,l.disabled=!0;try{let i=await fetch(`${P}/api/reviews`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:a,email:o,rating:s,message:c})}),l=await i.json();i.ok?(e.reset(),t.forEach(e=>e.style.color=`#ccc`),n.value=``,r.textContent=`Thank you! Your review has been submitted and is pending approval.`,r.style.color=`green`):(r.textContent=l.error||`Failed to submit review.`,r.style.color=`red`)}catch{r.textContent=`Server connection failed. Please try again later.`,r.style.color=`red`}finally{l.innerHTML=u,l.disabled=!1}}))}document.addEventListener(`DOMContentLoaded`,()=>{W(),q()});