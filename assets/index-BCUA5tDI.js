(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),window.addEventListener(`load`,()=>{setTimeout(()=>{document.getElementById(`loadingScreen`).classList.add(`hidden`)},1500)});var e=document.getElementById(`navbar`);window.addEventListener(`scroll`,()=>{window.scrollY>100?e.classList.add(`scrolled`):e.classList.remove(`scrolled`)});var t=document.getElementById(`menuToggle`),n=document.getElementById(`navLinks`);t.addEventListener(`click`,()=>{n.classList.toggle(`active`),t.classList.toggle(`active`);let e=n.classList.contains(`active`);t.setAttribute(`aria-expanded`,e?`true`:`false`)}),document.querySelectorAll(`.nav-link`).forEach(e=>{e.addEventListener(`click`,()=>{n.classList.remove(`active`),t.classList.remove(`active`),t.setAttribute(`aria-expanded`,`false`)})});function r(e){let t=document.getElementById(e);t&&t.scrollIntoView({behavior:`smooth`,block:`start`})}function i(){window.open(`https://calendar.google.com/calendar/u/0/r/eventedit?text=Therapy%20Session%20with%20Asha%20Suhasini%20Raja%20G&details=Please%20share%20your%20concern%20briefly.%20Contact%3A%20ashasuhasini02%40gmail.com&location=Online%20or%20Hyderabad&add=ashasuhasini02%40gmail.com`,`_blank`,`noopener,noreferrer`)}document.querySelectorAll(`a[href^="#"]`).forEach(e=>{e.addEventListener(`click`,function(e){e.preventDefault(),r(this.getAttribute(`href`).substring(1))})});function a(e){let t=parseInt(e.getAttribute(`data-target`)),n=t/(2e3/16),r=0,i=setInterval(()=>{r+=n,r>=t?(e.textContent=t,clearInterval(i)):e.textContent=Math.floor(r)},16)}var o=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(document.querySelectorAll(`.stat-number`).forEach(e=>{a(e)}),o.unobserve(e.target))})},{threshold:.5}),s=document.querySelector(`.hero`);s&&o.observe(s);var c=document.querySelectorAll(`.reveal`),l=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`active`)})},{threshold:.1});c.forEach(e=>{l.observe(e)});var u=document.getElementById(`modalOverlay`),d=document.getElementById(`modalContainer`);function f(e){d.innerHTML=m(e),u.classList.add(`active`),d.classList.add(`active`),document.body.style.overflow=`hidden`}function p(){u.classList.remove(`active`),d.classList.remove(`active`),document.body.style.overflow=`auto`,setTimeout(()=>{d.innerHTML=``},300)}function m(e){return{educationModal:`
            <div class="modal-header">
                <h2>ðŸŽ“ Education</h2>
                <button class="modal-close" onclick="closeModal()">Ã—</button>
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
                <h2>ðŸ“œ Certifications & Registration</h2>
                <button class="modal-close" onclick="closeModal()">Ã—</button>
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
                <h2>â­ Areas of Specialization</h2>
                <button class="modal-close" onclick="closeModal()">Ã—</button>
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
                <h2>ðŸ“… Book a Session</h2>
                <button class="modal-close" onclick="closeModal()">Ã—</button>
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
                <p>âœ“ In-person sessions (Hyderabad)</p>
                <p>âœ“ Online video consultations</p>
                <p>âœ“ Phone consultations</p>
                
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
        `,inquiryModal:`
            <div class="modal-header">
                <h2>ðŸ’¬ General Inquiry</h2>
                <button class="modal-close" onclick="closeModal()">Ã—</button>
            </div>
            <div class="modal-body">
                <h3>Get in Touch</h3>
                <p>For general inquiries about services, workshops, or corporate programs, please reach out through the following channels:</p>
                
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 15px; margin: 1.5rem 0;">
                    <h4 style="margin-top: 0;">ðŸ“§ Email</h4>
                    <p>ashasuhasini02@gmail.com</p>
                    
                    <h4>ðŸ“ Location</h4>
                    <p>Hyderabad, Telangana, India</p>
                    
                    <h4>â° Response Time</h4>
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
        `}[e]||``}function h(e){let t={individual:{title:`ðŸ’­ Individual Therapy`,description:`Personalized one-on-one psychotherapy sessions designed to address your unique mental health needs.`,details:[`Evidence-based therapeutic approaches including CBT, REBT, and DBT`,`Treatment for depression, anxiety, stress, and other mental health concerns`,`Personalized treatment plans tailored to your specific goals`,`Safe, confidential, and non-judgmental environment`,`Focus on building coping strategies and emotional resilience`],duration:`50-minute sessions`,format:`Available online and in-person`},family:{title:`ðŸ‘¨â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦ Family & Marital Therapy`,description:`Strengthen relationships and resolve conflicts through compassionate family and couples counseling.`,details:[`Improve communication and understanding between family members`,`Address marital conflicts and relationship challenges`,`Navigate major life transitions together`,`Develop healthy relationship patterns`,`Create stronger emotional bonds`],duration:`60-minute sessions`,format:`In-person and online options available`},corporate:{title:`ðŸ’¼ Corporate Wellness`,description:`Comprehensive mental health programs designed to enhance workplace well-being and productivity.`,details:[`Employee counseling and support services`,`Stress management workshops`,`Leadership coaching programs`,`Team building and communication training`,`Crisis intervention and support`,`Customized wellness initiatives`],duration:`Flexible program duration`,format:`On-site and virtual programs`},coaching:{title:`ðŸŽ¯ Life Skills Coaching`,description:`Personalized coaching programs to build confidence, achieve goals, and develop lasting resilience.`,details:[`Goal setting and achievement strategies`,`Building self-confidence and self-esteem`,`Developing effective communication skills`,`Time management and productivity`,`Emotional intelligence development`,`Career guidance and professional development`],duration:`Customized session length`,format:`Individual and group coaching available`},trauma:{title:`ðŸŒ± Trauma Counseling`,description:`Specialized support for healing from traumatic experiences and critical incidents.`,details:[`PTSD treatment and management`,`Grief and loss counseling`,`Critical Incident Stress Debriefing (CISD)`,`Trauma-informed therapeutic approaches`,`Building post-traumatic resilience`,`Safe processing of difficult experiences`],duration:`Flexible based on needs`,format:`Sensitive, confidential support`},student:{title:`ðŸ“š Student Counseling`,description:`Academic support and personal development guidance for students of all ages.`,details:[`Exam stress and academic pressure management`,`Career guidance and educational planning`,`Study skills and time management`,`Social and emotional development`,`Peer relationship issues`,`Building confidence and self-esteem`],duration:`45-50 minute sessions`,format:`Age-appropriate counseling methods`}}[e];t&&(d.innerHTML=`
        <div class="modal-header">
            <h2>${t.title}</h2>
            <button class="modal-close" onclick="closeModal()">Ã—</button>
        </div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 1.5rem;">${t.description}</p>
            
            <h3>What to Expect</h3>
            <ul>
                ${t.details.map(e=>`<li>${e}</li>`).join(``)}
            </ul>
            
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <p><strong>Session Duration:</strong> ${t.duration}</p>
                <p style="margin-bottom: 0;"><strong>Format:</strong> ${t.format}</p>
            </div>
            
            <button class="contact-button" style="margin-top: 2rem; width: 100%;" onclick="closeModal(); openModal('bookingModal')">
                Book a Session
            </button>
        </div>
    `,u.classList.add(`active`),d.classList.add(`active`),document.body.style.overflow=`hidden`)}function g(e){let t={klh:{title:`KLH University`,role:`Consulting Psychotherapist`,period:`2023 - Present`,location:`Hyderabad`,description:`Providing comprehensive psychological support to university students and faculty members.`,responsibilities:[`Individual counseling for students dealing with academic stress and personal challenges`,`Conducting mental health awareness workshops`,`Crisis intervention and support services`,`Collaborating with faculty to create a supportive campus environment`,`Developing mental wellness programs for the university community`]},modern:{title:`Modern Health`,role:`Psychological Consultant & Psychotherapist`,period:`Current`,location:`Arizona, USA (Remote)`,description:`Delivering evidence-based mental health care to a global clientele through a leading digital mental health platform.`,responsibilities:[`Providing teletherapy to diverse international clients`,`Utilizing digital tools for effective remote counseling`,`Maintaining highest standards of care in virtual settings`,`Adapting therapeutic approaches for online delivery`,`Contributing to global mental health accessibility`]},private:{title:`Private Practice`,role:`Independent Psychotherapist`,period:`Since 2006`,location:`Global Clientele`,description:`Building a trusted practice over 19+ years, serving individuals, families, and organizations worldwide.`,responsibilities:[`Individual and family therapy across diverse age groups`,`Specialized trauma counseling and PTSD treatment`,`Life skills coaching and personal development`,`Corporate wellness consulting`,`Building long-term therapeutic relationships based on trust`]},manah:{title:`Manah Wellness`,role:`Senior Mental Wellness Consultant`,period:`Previous`,location:`Remote`,description:`Affiliated as a senior consultant, offering guidance and therapy to clients globally.`,responsibilities:[`Remote counseling and psychotherapy`,`Mental wellness program development`,`Client assessment and treatment planning`,`Collaborative care with multidisciplinary teams`,`Supporting diverse populations across different time zones`]},morneau:{title:`Morneau Shepell`,role:`Trauma Counseling Specialist & CISD Facilitator`,period:`Previous`,location:`Canada (Remote)`,description:`Specialized in trauma counseling and Critical Incident Stress Debriefing during challenging times.`,responsibilities:[`Providing grief and trauma counseling`,`Facilitating Critical Incident Stress Debriefing (CISD)`,`Supporting organizations during the pandemic`,`Emergency response and crisis intervention`,`Training staff on stress management techniques`]},hyundai:{title:`Hyundai Mobis`,role:`Corporate Mental Wellness Consultant`,period:`Previous`,location:`Hi-Tech City, Hyderabad`,description:`Leading mental wellness initiatives for corporate employees in a high-tech environment.`,responsibilities:[`Employee counseling and support services`,`Developing workplace wellness programs`,`Conducting stress management workshops`,`Leadership coaching for executives`,`Creating a mentally healthy workplace culture`]}}[e];t&&(d.innerHTML=`
        <div class="modal-header">
            <h2>${t.title}</h2>
            <button class="modal-close" onclick="closeModal()">Ã—</button>
        </div>
        <div class="modal-body">
            <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 1rem 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                <p style="margin: 0; font-weight: 600;">${t.role}</p>
                <p style="margin: 0.3rem 0 0 0; opacity: 0.9;">${t.period} â€¢ ${t.location}</p>
            </div>
            
            <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 1.5rem;">${t.description}</p>
            
            <h3>Key Responsibilities</h3>
            <ul>
                ${t.responsibilities.map(e=>`<li>${e}</li>`).join(``)}
            </ul>
        </div>
    `,u.classList.add(`active`),d.classList.add(`active`),document.body.style.overflow=`hidden`)}function ee(e){let t={cbt:{title:`Cognitive Behavioural Therapy (CBT)`,description:`CBT is a structured, goal-oriented therapy that focuses on identifying and changing negative thought patterns and behaviors.`,benefits:[`Effective for treating depression, anxiety, and stress`,`Practical strategies for managing difficult situations`,`Focus on present problems and solutions`,`Teaches skills that last a lifetime`,`Evidence-based approach with proven results`],ideal:`Ideal for individuals dealing with anxiety, depression, phobias, and stress-related disorders.`},rebt:{title:`Rational Emotive Behaviour Therapy (REBT)`,description:`REBT helps identify irrational beliefs and replace them with healthier, more rational thoughts.`,benefits:[`Challenge and change irrational thinking patterns`,`Develop emotional resilience`,`Take responsibility for emotions and behaviors`,`Build unconditional self-acceptance`,`Achieve long-term emotional well-being`],ideal:`Perfect for those looking to transform negative thinking and build stronger emotional health.`},dbt:{title:`Dialectical Behaviour Therapy (DBT)`,description:`DBT combines cognitive-behavioral techniques with mindfulness practices to help regulate emotions.`,benefits:[`Enhanced emotional regulation`,`Improved interpersonal effectiveness`,`Mindfulness and distress tolerance skills`,`Effective for borderline personality disorder`,`Reduces self-destructive behaviors`],ideal:`Beneficial for individuals with intense emotions and relationship difficulties.`},sfbt:{title:`Solution-Focused Brief Therapy (SFBT)`,description:`SFBT is a goal-directed approach that focuses on solutions rather than problems.`,benefits:[`Quick, efficient therapeutic process`,`Focus on strengths and resources`,`Goal-oriented and practical`,`Empowers clients to find their own solutions`,`Positive, future-focused approach`],ideal:`Great for individuals seeking specific, achievable goals in a shorter timeframe.`},fmt:{title:`Family & Marital Therapy (FMT)`,description:`FMT addresses relationship issues and family dynamics to improve communication and resolve conflicts.`,benefits:[`Improved family communication`,`Conflict resolution strategies`,`Strengthened emotional bonds`,`Better understanding of family roles`,`Healthier relationship patterns`],ideal:`Essential for families and couples facing relationship challenges or major transitions.`},gestalt:{title:`Gestalt Therapy`,description:`Gestalt therapy emphasizes personal responsibility and focuses on present experience and awareness.`,benefits:[`Increased self-awareness`,`Better emotional expression`,`Living in the present moment`,`Personal growth and authenticity`,`Improved relationships and communication`],ideal:`Suitable for those seeking deeper self-understanding and personal growth.`}}[e];t&&(d.innerHTML=`
        <div class="modal-header">
            <h2>${t.title}</h2>
            <button class="modal-close" onclick="closeModal()">Ã—</button>
        </div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 1.5rem;">${t.description}</p>
            
            <h3>Key Benefits</h3>
            <ul>
                ${t.benefits.map(e=>`<li>${e}</li>`).join(``)}
            </ul>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <h4 style="margin-top: 0; color: white;">Best For</h4>
                <p style="margin: 0;">${t.ideal}</p>
            </div>
        </div>
    `,u.classList.add(`active`),d.classList.add(`active`),document.body.style.overflow=`hidden`)}function te(e){let t={confidence:{title:`Building Confidence in Children`,description:`Empowering young minds with self-belief and resilience.`,content:[`Understanding child psychology and development`,`Techniques to boost self-esteem in children`,`Handling criticism and building resilience`,`Encouraging positive self-talk`,`Creating supportive home environments`,`Practical exercises for parents and educators`],duration:`2-3 hours interactive workshop`,audience:`Parents, teachers, and caregivers`},exam:{title:`Managing Exam Stress`,description:`Proven techniques for academic success and stress reduction.`,content:[`Understanding exam anxiety and its effects`,`Effective study techniques and time management`,`Relaxation and mindfulness exercises`,`Building confidence before exams`,`Handling performance pressure`,`Post-exam coping strategies`],duration:`2 hours interactive session`,audience:`Students, parents, and educators`},parenting:{title:`Conscious Parenting`,description:`Building deeper emotional connections with your children.`,content:[`Understanding emotional intelligence in parenting`,`Effective communication with children`,`Setting healthy boundaries with love`,`Dealing with challenging behaviors`,`Building trust and emotional security`,`Creating mindful family practices`],duration:`3-hour comprehensive workshop`,audience:`Parents and expecting parents`},mindset:{title:`Developing a Winning Mindset`,description:`Cultivating resilience, determination, and success orientation.`,content:[`Growth mindset vs fixed mindset`,`Overcoming limiting beliefs`,`Goal setting and achievement strategies`,`Building mental toughness`,`Handling failure and setbacks`,`Developing positive habits`],duration:`Half-day workshop`,audience:`Professionals, students, and individuals`}}[e];t&&(d.innerHTML=`
        <div class="modal-header">
            <h2>${t.title}</h2>
            <button class="modal-close" onclick="closeModal()">Ã—</button>
        </div>
        <div class="modal-body">
            <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 1.5rem;">${t.description}</p>
            
            <h3>Workshop Content</h3>
            <ul>
                ${t.content.map(e=>`<li>${e}</li>`).join(``)}
            </ul>
            
            <div style="background: var(--card-bg); padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <p><strong>Duration:</strong> ${t.duration}</p>
                <p style="margin-bottom: 0;"><strong>Target Audience:</strong> ${t.audience}</p>
            </div>
            
            <p style="margin-top: 1.5rem; padding: 1rem; background: #fff3cd; border-radius: 10px; border-left: 4px solid #ffc107;">
                <strong>Note:</strong> Workshops can be customized for schools, corporate organizations, and community groups.
            </p>
            
            <button class="contact-button" style="margin-top: 2rem; width: 100%;" onclick="closeModal(); openModal('inquiryModal')">
                Inquire About This Workshop
            </button>
        </div>
    `,u.classList.add(`active`),d.classList.add(`active`),document.body.style.overflow=`hidden`)}u.addEventListener(`click`,p),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&p()}),window.addEventListener(`scroll`,()=>{let e=window.pageYOffset,t=document.querySelector(`.hero-content`);t&&(t.style.transform=`translateY(${e*.5}px)`,t.style.opacity=1-e/700)});var _=document.getElementById(`themeToggle`),v=_?_.querySelector(`.theme-toggle-icon`):null;function y(e){e===`dark`?(document.body.setAttribute(`data-theme`,`dark`),v&&(v.textContent=`â˜€ï¸`)):(document.body.removeAttribute(`data-theme`),v&&(v.textContent=`ðŸŒ™`))}function ne(){let e=localStorage.getItem(`asha-theme`),t=window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).matches;y(e||(t?`dark`:`light`))}_&&(ne(),_.addEventListener(`click`,()=>{let e=document.body.getAttribute(`data-theme`)===`dark`?`light`:`dark`;y(e),localStorage.setItem(`asha-theme`,e)}));var b=document.getElementById(`contactForm`),x=document.getElementById(`contactFormMessage`);function S(e){return/\S+@\S+\.\S+/.test(e)}b&&x&&b.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(b),n=(t.get(`name`)||``).toString().trim(),r=(t.get(`email`)||``).toString().trim(),i=(t.get(`message`)||``).toString().trim();if(x.classList.remove(`success`,`error`),!n||!r||!i){x.textContent=`Please fill in your name, email, and a short message so I can respond meaningfully.`,x.classList.add(`error`);return}if(!S(r)){x.textContent=`Please enter a valid email address so I can reach you.`,x.classList.add(`error`);return}b.reset(),x.textContent=`Thank you for reaching out. Your inquiry has been noted and you will receive a response via email.`,x.classList.add(`success`)});var C=document.getElementById(`reviewForm`),w=document.getElementById(`reviewFormMessage`),T=document.getElementById(`reviewsList`),E=document.getElementById(`averageRating`),D=document.getElementById(`averageStars`),O=document.getElementById(`reviewCount`),k={5:document.getElementById(`ratingCount5`),4:document.getElementById(`ratingCount4`),3:document.getElementById(`ratingCount3`),2:document.getElementById(`ratingCount2`),1:document.getElementById(`ratingCount1`)},A={5:document.getElementById(`ratingBar5`),4:document.getElementById(`ratingBar4`),3:document.getElementById(`ratingBar3`),2:document.getElementById(`ratingBar2`),1:document.getElementById(`ratingBar1`)},j=`asha-client-reviews`,M=[{name:`Client A`,rating:5,text:`Very supportive and practical guidance. I felt heard and understood.`,date:`2026-03-01`},{name:`Workshop Participant`,rating:5,text:`The workshop was insightful and easy to apply in day-to-day life.`,date:`2026-03-10`}];function N(){try{let e=localStorage.getItem(j);if(!e)return M.slice();let t=JSON.parse(e);return Array.isArray(t)?t.filter(e=>e&&e.name&&e.text&&Number(e.rating)):M.slice()}catch{return M.slice()}}function P(e){localStorage.setItem(j,JSON.stringify(e))}function F(e){return[e.name||``,e.date||``,e.text||``].join(`|`)}function I(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function re(){let e=N(),t=e.filter(e=>{let t=(e.name||``).toLowerCase(),n=(e.text||``).toLowerCase();return!(t.includes(`nandhan`)&&n.includes(`safe person to walk to for help`))});t.length!==e.length&&P(t)}function L(e){return`${`â˜…`.repeat(Math.max(0,Math.min(5,e)))}${`â˜†`.repeat(5-Math.max(0,Math.min(5,e)))}`}function ie(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:t.toLocaleDateString(void 0,{year:`numeric`,month:`short`,day:`numeric`})}function R(){if(!T||!E||!D||!O)return;let e=N(),t=e.reduce((e,t)=>e+Number(t.rating||0),0),n=e.length?t/e.length:0,r={1:0,2:0,3:0,4:0,5:0};if(e.forEach(e=>{let t=Number(e.rating||0);r[t]!==void 0&&(r[t]+=1)}),E.textContent=n.toFixed(1),D.textContent=L(Math.round(n)),O.textContent=String(e.length),[5,4,3,2,1].forEach(t=>{let n=r[t],i=e.length?n/e.length*100:0;k[t]&&(k[t].textContent=String(n)),A[t]&&(A[t].style.width=`${i}%`)}),e.length===0){T.innerHTML=`<p class="review-text">No reviews yet. Be the first to share your feedback.</p>`;return}T.innerHTML=e.slice().reverse().map(e=>`
            <article class="review-card">
                <div class="review-card-header">
                    <span class="review-name">${I(e.name)}</span>
                    <span class="review-stars" aria-label="${e.rating} out of 5 stars">${L(Number(e.rating))}</span>
                </div>
                <div class="review-actions">
                    <button class="review-delete-btn" type="button" onclick="deleteReview('${encodeURIComponent(F(e))}')">Delete</button>
                </div>
                <p class="review-date">${ie(e.date)}</p>
                <p class="review-text">${I(e.text)}</p>
            </article>
        `).join(``)}function z(e){let t=decodeURIComponent(e);P(N().filter(e=>F(e)!==t)),R()}window.deleteReview=z,C&&w&&(re(),R(),C.addEventListener(`submit`,e=>{e.preventDefault(),w.classList.remove(`success`,`error`);let t=new FormData(C),n=(t.get(`reviewerName`)||``).toString().trim(),r=Number((t.get(`reviewRating`)||``).toString()),i=(t.get(`reviewText`)||``).toString().trim();if(!n||!r||!i){w.textContent=`Please fill your name, rating, and review before submitting.`,w.classList.add(`error`);return}if(r<1||r>5){w.textContent=`Please select a valid rating between 1 and 5.`,w.classList.add(`error`);return}let a=N();a.push({name:n,rating:r,text:i,date:new Date().toISOString()}),P(a),R(),C.reset(),w.textContent=`Thank you! Your review has been added.`,w.classList.add(`success`)})),console.log(`Asha Suhasini Raja - Website Initialized Successfully!`);var B=[],V=-1;function H(e){if(!e)return[];if(/^(https?:)?\/\//.test(e)||e.startsWith(`data:`)||e.startsWith(`blob:`))return[e];let t=e.replace(/\\/g,`/`).replace(/^\.\//,``).replace(/^\/+/,``),n=[`./${t}`,t,`../${t}`,`/${t}`];return[...new Set(n)]}function U(e,t){let n=H(t||e.getAttribute(`src`)||``);n.length!==0&&(e.src=n[0],e.dataset.pathTriedIndex=`0`,e.addEventListener(`error`,()=>{let t=Number(e.dataset.pathTriedIndex||0)+1;t>=n.length||(e.dataset.pathTriedIndex=String(t),e.src=n[t])}))}function W(e,t,n=-1,r=``){V=n;let i=t===`video`?`<video src="${e}" controls autoplay playsinline></video>`:`<img src="${e}" alt="${r||`Gallery image`}">`,a=`<a class="download-btn" href="${e}" download><button class="download-btn">Download</button></a>`,o=B.length>1?`<div class="modal-controls"><button class="nav-btn" aria-label="Previous" onclick="galleryPrev()">â† Prev</button><div style="flex:1"></div><button class="nav-btn" aria-label="Next" onclick="galleryNext()">Next â†’</button></div>`:``,s=`<div style="margin-top:.5rem; text-align:right">${a}</div>`;d.innerHTML=`
        <div class="modal-header">
            <button class="modal-close" onclick="closeModal()">Ã—</button>
        </div>
        <div class="modal-body">
            ${i}
            ${r?`<div class="modal-caption">${r}</div>`:``}
            ${o}
            ${s}
        </div>
    `,u.classList.add(`active`),d.classList.add(`active`),document.body.style.overflow=`hidden`}function G(){if(B.length===0)return;let e=(V-1+B.length)%B.length,t=B[e];W(t.src,t.type,e,t.caption)}function K(){if(B.length===0)return;let e=(V+1)%B.length,t=B[e];W(t.src,t.type,e,t.caption)}function q(){B=[],Array.from(document.querySelectorAll(`.media-item > img`)).forEach((e,t)=>{let n=e.src,r=`image`,i=e.alt||``;B.push({src:n,type:r,caption:i}),e.setAttribute(`loading`,`lazy`),U(e,n),e.style.cursor=`pointer`,e.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),W(n,r,t,i)})}),(document.querySelectorAll(`.video-thumb`)||[]).forEach(e=>{let t=e.dataset.src,n=e.dataset.caption||e.getAttribute(`aria-label`)||``,r=B.length;B.push({src:t,type:`video`,caption:n});let i=e.querySelector(`img`);i&&U(i,i.getAttribute(`src`)||``),e.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),W(t,`video`,r,n)}),e.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),W(t,`video`,r,n))})}),document.addEventListener(`keydown`,e=>{d.classList.contains(`active`)&&(e.key===`ArrowLeft`&&G(),e.key===`ArrowRight`&&K(),e.key===`Escape`&&p())})}q(),window.openGoogleCalendarBooking=i,window.scrollToSection=r,window.openModal=f,window.closeModal=p,window.openServiceModal=h,window.openExperienceModal=g,window.openTherapyModal=ee,window.openWorkshopModal=te;var J=document.querySelectorAll(`.testimonial-card`),Y=document.querySelectorAll(`.indicator`),X=document.querySelector(`.prev-btn`),Z=document.querySelector(`.next-btn`),Q=0;function $(e){J.forEach(e=>e.classList.remove(`active`)),Y.forEach(e=>e.classList.remove(`active`)),J[e].classList.add(`active`),Y[e].classList.add(`active`)}X&&Z&&(X.addEventListener(`click`,()=>{Q=Q>0?Q-1:J.length-1,$(Q)}),Z.addEventListener(`click`,()=>{Q=Q<J.length-1?Q+1:0,$(Q)}),Y.forEach((e,t)=>{e.addEventListener(`click`,()=>{Q=t,$(Q)})}),setInterval(()=>{Q=Q<J.length-1?Q+1:0,$(Q)},6e3));