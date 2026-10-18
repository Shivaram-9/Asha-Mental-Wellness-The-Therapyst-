(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`menuToggle`),t=document.getElementById(`desktopMenuToggle`),n=document.getElementById(`menuClose`),r=document.getElementById(`sidebar`),i=document.getElementById(`sidebarOverlay`);function a(){if(window.innerWidth>1024)document.body.classList.toggle(`desktop-sidebar-closed`);else{r.classList.toggle(`open`),i.classList.toggle(`active`);let t=r.classList.contains(`open`);e&&e.setAttribute(`aria-expanded`,t?`true`:`false`),document.body.style.overflow=t?`hidden`:``}}e&&e.addEventListener(`click`,a),t&&t.addEventListener(`click`,a),n&&n.addEventListener(`click`,a),i&&i.addEventListener(`click`,a),document.querySelectorAll(`.nav-link`).forEach(e=>{e.addEventListener(`click`,()=>{r&&r.classList.contains(`open`)&&a()})}),window.addEventListener(`resize`,()=>{window.innerWidth>1024&&r&&r.classList.contains(`open`)&&(r.classList.remove(`open`),i.classList.remove(`active`),e&&e.setAttribute(`aria-expanded`,`false`),document.body.style.overflow=``)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&r&&r.classList.contains(`open`)&&a()});function o(e){let t=document.getElementById(e);t&&t.scrollIntoView({behavior:`smooth`,block:`start`})}function s(){window.open(`https://calendar.google.com/calendar/u/0/r/eventedit?text=Therapy%20Session%20with%20Asha%20Suhasini%20Raja%20G&details=Please%20share%20your%20concern%20briefly.%20Contact%3A%20asha.suhasinim%40gmail.com&location=Online%20Session&add=asha.suhasinim%40gmail.com`,`_blank`,`noopener,noreferrer`)}document.querySelectorAll(`a[href^="#"]`).forEach(e=>{e.addEventListener(`click`,function(e){e.preventDefault(),o(this.getAttribute(`href`).substring(1))})});function c(e){let t=parseInt(e.getAttribute(`data-target`));if(isNaN(t))return;let n=e.getAttribute(`data-suffix`)||``,r=Math.max(1,t/(1500/16)),i=0,a=setInterval(()=>{i+=r,i>=t?(e.textContent=t+n,clearInterval(a)):e.textContent=Math.floor(i)+n},16)}var l=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(document.querySelectorAll(`.stat-number`).forEach(e=>{c(e)}),l.unobserve(e.target))})},{threshold:.1}),u=document.querySelector(`.hero`);u&&l.observe(u);var d=document.querySelectorAll(`.reveal`),f=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`active`)})},{threshold:.1});d.forEach(e=>{f.observe(e)});var p=document.getElementById(`modalOverlay`),m=document.getElementById(`modalContainer`),h;function g(e){h&&clearTimeout(h),r!==void 0&&r&&r.classList.contains(`open`)&&a(),m.innerHTML=v(e),p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let t=document.getElementById(`bookingDate`);t&&(t.min=new Date().toISOString().split(`T`)[0])}function _(){O=-1,p.classList.remove(`active`),m.classList.remove(`active`),document.body.style.overflow=`auto`,h&&clearTimeout(h),h=setTimeout(()=>{m.classList.contains(`active`)||(m.innerHTML=``)},300)}function v(e){return{educationModal:`
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
        `,certificationModal:`
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
        `,specializationModal:`
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
        `,bookingModal:`
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
                    <div id="bookingSuccessMessage" style="display:none; margin-top: 1rem; padding: 1rem; background: rgba(130, 168, 157, 0.15); border: 1px solid rgba(130, 168, 157, 0.3); color: var(--primary); border-radius: 8px;">
                        Booking confirmed! Your time slot has been successfully reserved.
                    </div>
                </div>
                
                <p style="margin-top: 2rem; padding: 1.5rem; background: #FDFCF9; border: 1px solid rgba(130, 168, 157, 0.15); border-radius: 15px;">
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
        `}[e]||``}function y(e){h!==void 0&&h&&clearTimeout(h);let t={individual:{title:` Individual Therapy`,description:`Personalized one-on-one psychotherapy sessions designed to address your unique mental health needs.`,details:[`Evidence-based therapeutic approaches including CBT, REBT, and DBT`,`Treatment for depression, anxiety, stress, and other mental health concerns`,`Personalized treatment plans tailored to your specific goals`,`Safe, confidential, and non-judgmental environment`,`Focus on building coping strategies and emotional resilience`],duration:`50-minute sessions`,format:`Available online`},family:{title:` Family & Marital Therapy`,description:`Strengthen relationships and resolve conflicts through compassionate family and couples counselling.`,details:[`Improve communication and understanding between family members`,`Address marital conflicts and relationship challenges`,`Navigate major life transitions together`,`Develop healthy relationship patterns`,`Create stronger emotional bonds`],duration:`60-minute sessions`,format:`Online options available`},corporate:{title:` Corporate Wellness`,description:`Comprehensive mental health programs designed to enhance workplace well-being and productivity.`,details:[`Employee counselling and support services`,`Stress management workshops`,`Leadership coaching programs`,`Team building and communication training`,`Crisis intervention and support`,`Customized wellness initiatives`],duration:`Flexible program duration`,format:`On-site and virtual programs`},coaching:{title:` Life Skills Coaching`,description:`Personalized coaching programs to build confidence, achieve goals, and develop lasting resilience.`,details:[`Goal setting and achievement strategies`,`Building self-confidence and self-esteem`,`Developing effective communication skills`,`Time management and productivity`,`Emotional intelligence development`,`Career guidance and professional development`],duration:`Customized session length`,format:`Individual and group coaching available`},trauma:{title:` Trauma Counselling`,description:`Specialized support for healing from traumatic experiences and critical incidents.`,details:[`PTSD treatment and management`,`Grief and loss counselling`,`Critical Incident Stress Debriefing (CISD)`,`Trauma-informed therapeutic approaches`,`Building post-traumatic resilience`,`Safe processing of difficult experiences`],duration:`Flexible based on needs`,format:`Sensitive, confidential support`},student:{title:` Student Counselling`,description:`Academic support and personal development guidance for students of all ages.`,details:[`Exam stress and academic pressure management`,`Career guidance and educational planning`,`Study skills and time management`,`Social and emotional development`,`Peer relationship issues`,`Building confidence and self-esteem`],duration:`45-50 minute sessions`,format:`Age-appropriate counselling methods`}}[e];if(!t)return;m.innerHTML=`
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
            
            <div style="background: #FDFCF9; border: 1px solid rgba(130, 168, 157, 0.15); padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <p><strong>Session Duration:</strong> ${t.duration}</p>
                <p style="margin-bottom: 0;"><strong>Format:</strong> ${t.format}</p>
            </div>
            
            <button class="btn btn-primary contact-button" style="margin-top: 2rem; width: 100%;" onclick="closeModal(); openModal('bookingModal')"><span>
                Book a Session
            </span></button>
        </div>
    `,p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let n=document.getElementById(`bookingDate`);n&&(n.min=new Date().toISOString().split(`T`)[0])}function b(e){h!==void 0&&h&&clearTimeout(h);let t={klh:{title:`KLH University`,role:`Consulting Psychotherapist`,period:`2023 - Present`,location:`Hyderabad`,description:`Providing comprehensive psychological support to university students and faculty members.`,responsibilities:[`Individual counselling for students dealing with academic stress and personal challenges`,`Conducting mental health awareness workshops and psychoeducation seminars`,`Crisis intervention, emotional regulation, and psychological first aid`,`Collaborating with faculty to create a supportive campus environment`,`Developing mental wellness programs for the university community`]},modern:{title:`Modern Health`,role:`(Affiliate) Mental Wellness Consultant & Psychotherapist for India`,period:`Oct 2021 - Present`,location:`Arizona, USA / Remote`,description:`Delivering evidence-based teletherapy and corporate mental wellness consulting for multinational companies in Hyderabad and international clientele.`,responsibilities:[`Counselling individuals and adults with emotional challenges, mood regulation, and life transitions`,`Corporate wellness consultant for multinational corporations (MNCs) in Hyderabad`,`Providing evidence-based teletherapy to diverse international clients through a leading digital mental health platform`,`Maintaining highest clinical standards of care, confidentiality, and ethics in virtual settings`,`Adapting therapeutic approaches for online delivery with global accessibility`]},private:{title:`Private Practice`,role:`Psychological Wellness Consultant & Psychotherapist`,period:`April 2014 - Present`,location:`Hyderabad / Online Sessions`,description:`Independent private practice providing evidence-based psychotherapy, child & adolescent guidance, and family counselling globally.`,responsibilities:[`Practicing through virtual platforms and clinical consultations for individual and family mental health needs`,`Counselling individuals with mental and emotional health challenges, marital discord, and parenting issues`,`Identifying younger age groups with Autism Spectrum Disorder (ASD), Learning Difficulties (LD), and developmental delays, guiding families toward early intervention`,`Counselling adolescents and young adults with anxiety, performance fear, and exam stress`,`Restructuring and regulating emotional patterns with evidence-based therapies (CBT, SFBT, Gestalt, REBT, Family Therapy)`]},hdw:{title:`Head Digital Works (A23 Gaming)`,role:`Senior Psychological Consultant & Psychotherapist (RG Escalations)`,period:`March 2023 - September 2023`,location:`Hyderabad (Full-time)`,description:`Full-time Senior Psychological Consultant for Responsible Gaming (RG) escalation calls and clinical risk management.`,responsibilities:[`Guiding the Responsible Gaming care team in managing suicide threats and acute crisis escalation calls`,`Leading the team in handling calls related to gaming addictions, distress, and financial vulnerabilities`,`Successfully neutralizing players suicide threat calls and establishing crisis de-escalation protocols`,`Created RG website page content, employee presentations, and training modules to build empathy-oriented communication`,`Contributed to call audit sheet revisions, coaching executives to handle unexpected hostility and temper lash-outs calmly`]},mbr:{title:`Mind Body Resolve`,role:`Chief Psychotherapist for Counselling & Therapeutic Strategies`,period:`May 2022 - January 2023`,location:`Hyderabad`,description:`Executive clinical leadership, senior trauma consultant for VIP clients, and single point of contact for corporate wellness webinars.`,responsibilities:[`Senior consultant for trauma counselling for VIP and executive clients`,`Single point of contact (POC) for MNCs for finalizing and conducting corporate mental wellness webinars`,`Led and supervised a multidisciplinary team of 10 psychologists and therapists on board`,`Chief content editor for mental health communications, social platforms, client follow-ups, and email promotions`,`Developed and executed evidence-based therapeutic programs across corporate and private sectors`]},nift:{title:`NIFT Hyderabad`,role:`Guest Faculty & Leadership Coach`,period:`September 2021 - May 2022`,location:`Hyderabad`,description:`Guest faculty leading specially designed leadership and emotional intelligence programs for students.`,responsibilities:[`Leadership coach for specially designed student leadership programs`,`Conducted interactive modules on emotional intelligence, transition management, and decision-making`,`Provided mentorship to help students navigate creative performance anxiety and professional transitions`,`Fostered self-confidence, interpersonal communication, and constructive conflict resolution`,`Received consistent positive feedback from students and academic administration`]},morneau:{title:`Morneau Shepell`,role:`(Affiliate) Specialist in CISD Services & Trauma Counselling`,period:`May 2021 - May 2022`,location:`Canada / India (Remote)`,description:`Specialist trauma counsellor and Critical Incident Stress Debriefing (CISD) facilitator for multinational corporations in India.`,responsibilities:[`Provided acute trauma counselling and grief support during the pandemic`,`Facilitated Critical Incident Stress Debriefing (CISD) for corporate teams facing critical incidents`,`Emergency psychological response and acute crisis intervention for MNCs across India`,`Trained corporate personnel on stress management techniques and psychological first aid`,`Received exceptional reviews and commendations from multinational corporate partners`]},manah:{title:`Manah Wellness`,role:`Senior Mental Wellness Consultant`,period:`Prior Engagement`,location:`Remote`,description:`Affiliated as a senior consultant delivering teletherapy and corporate mental wellness programs.`,responsibilities:[`Remote counselling and psychotherapy for diverse employee populations`,`Mental wellness program development and client mental health assessments`,`Collaborative care with multidisciplinary corporate health teams`,`Supporting individuals across different time zones with structured therapeutic interventions`]},jain:{title:`Jain Heritage International Cambridge School`,role:`Student Counsellor (Part Time)`,period:`June 2018 - March 2020 & Dec 2014 - Aug 2016`,location:`Kondapur, Hyderabad`,description:`Student counsellor delivering holistic emotional, behavioural, and educational guidance across two distinct tenures.`,responsibilities:[`Counselling students facing emotional, behavioural, and educational challenges`,`Identifying children with special educational needs (SEN) and guiding families toward early intervention and therapy`,`Conducting workshops for teaching and non-teaching staff on child development and emotional learning`,`Delivered regular motivating talks, building trust and bridging communication gaps between teachers, students, and parents`,`Assured delivery of quality support through constant feedback surveys with Principal, teachers, and students`]},hcsipl:{title:`HCSIPL`,role:`Corporate Trainer & Communication Coach (Part Time)`,period:`May 2019 - October 2019`,location:`Hi-Tech City, Hyderabad`,description:`Corporate trainer and communication coach helping individuals optimize their workplace potential and communication effectiveness.`,responsibilities:[`Coaching corporate professionals to realize their peak personal and professional potential`,`Conducting targeted communication workshops and interpersonal skills training`,`Fostering workplace emotional resilience, assertive communication, and professional confidence`,`Received consistent positive feedback from participants and corporate management`]},hyundai:{title:`Hyundai Mobis`,role:`Affiliate Psychological Consultant (Part Time)`,period:`June 2018 - October 2018`,location:`Mindspace, Hyderabad`,description:`Corporate psychological consultant delivering employee counselling, transition workshops, and suicide awareness programs.`,responsibilities:[`Counselled adults on workplace stress, performance anxiety, depression, decision-making, and marital challenges`,`Conducted transition anxiety and performance enhancement workshops for new and young joiners`,`Conducted focused suicide sensitization workshops, equipping employees with practical stress control techniques`,`Applied scientifically proven modalities including SFBT, Gestalt, RET, and CBT to resolve complex personal and workplace concerns`,`Received widespread positive feedback, with clients consistently referring colleagues for support`]},birbal:{title:`Birbal Life Solutions`,role:`Senior Consulting Psychologist & Psychotherapist (Part Time)`,period:`March 2017 - December 2018`,location:`Hitech City, Hyderabad`,description:`Senior consulting psychologist delivering psychotherapy, marital discord counselling, and customized corporate/school workshops.`,responsibilities:[`Counselling individuals and families facing mental health challenges, marital discord, parenting issues, and teen challenges`,`Designing and conducting customized psychological packages and workshops for schools and colleges`,`Facilitating teen life-skills programs, career guidance packages, and public mental health seminars`,`Delivering corporate counselling and stress management workshops across high-demand sectors`,`Received consistent positive feedback from clients, families, and educational institutions`]},hal:{title:`HAL Secondary School`,role:`Student Counsellor (Contract)`,period:`June 2010 - November 2014`,location:`HAL Campus, Balanagar, Secunderabad`,description:`Appointed as the first school counsellor in HAL School history, providing comprehensive emotional and developmental support.`,responsibilities:[`Counselled students across pre-school, primary, middle, and secondary school levels`,`Identified learning difficulties (LD) and developmental delays, guiding families toward appropriate clinical intervention`,`Officially implemented and endorsed CBSE concession guidelines for special children in collaboration with the Principal`,`Designed and conducted 3-day life skills workshops for teens on transition stages, peer pressure, anger management, and college readiness`,`Conducted teacher training workshops on learning disabilities and emotional disturbances, equipping educators with screening tools`]},children:{title:`Children Hospital`,role:`Psychological Consultant & Psychotherapist`,period:`November 2005 - June 2010`,location:`KPHB, Kukatpally, Hyderabad`,description:`Clinical psychological consultant affiliated with pediatricians, undertaking referred child and adult cases.`,responsibilities:[`Clinical psychological assessment and psychotherapy for referred pediatric and adult cases`,`Diagnostic evaluations for developmental, behavioral, and emotional challenges in children`,`Parental counselling and family guidance for managing childhood emotional and learning difficulties`,`Established collaborative care pathways with medical pediatric specialists`,`Maintained consistent positive feedback from parents and healthcare professionals`]},manoshakthi:{title:`Manoshakthi Psychological Services (Bandra Family Court)`,role:`Intern Clinical Psychologist & Assistant Psychotherapist`,period:`September 2003 - January 2005`,location:`Bandra Family Court, Mumbai`,description:`Clinical psychologist intern and assistant psychotherapist providing clinical assessments and court-assisting reports under Dr. Lakshmipriya.`,responsibilities:[`Counselling couples and families undergoing divorce and reconciliation proceedings`,`Providing specialized counselling for children and parents regarding child access and custody`,`Conducting clinical psychological assessments and preparing unbiased mental health status reports to assist judges`,`Applied effective therapeutic techniques and strategies yielding positive reconciliation and resolution outcomes`,`Commended for outstanding clinical performance and handling complex high-conflict domestic cases`]},mgm:{title:`MGM Hospital`,role:`HIV/AIDS Counsellor (MSACS / PMTCT Pilot Project)`,period:`June 2002 - March 2003`,location:`Kalamboli, New Mumbai`,description:`Appointed counsellor on behalf of Maharashtra State AIDS Control Society (MSACS) in their landmark PMTCT pilot study under NACO guidelines.`,responsibilities:[`Provided pre-test and post-test counselling to HIV-positive patients and couples, alleviating acute emotional distress`,`Evaluated the administration of single-dose Nevirapine in reducing viral transmission during labour under NACO PMTCT protocol`,`Delivered compassionate psycho-social support to pregnant mothers and vulnerable families`,`Maintained strict clinical ethics, confidentiality, and medical coordination during high-stress obstetrical care`]}}[e];if(!t)return;m.innerHTML=`
        <div class="modal-header">
            <h2>${t.title}</h2>
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            <div style="background: rgba(130, 168, 157, 0.15); border: 1px solid rgba(130, 168, 157, 0.3); color: var(--text-primary); padding: 1rem 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
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
            
            <div style="background: rgba(235, 215, 215, 0.3); border: 1px solid rgba(235, 215, 215, 0.5); color: var(--text-primary); padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <h4 style="margin-top: 0; color: var(--primary); font-family: var(--font-display);">Best For</h4>
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
            
            <p style="margin-top: 1.5rem; padding: 1rem; background: #FDFCF9; border-radius: 10px; border: 1px solid rgba(130, 168, 157, 0.2); border-left: 4px solid rgba(130, 168, 157, 0.8);">
                <strong>Note:</strong> Workshops can be customized for schools, corporate organizations, and community groups.
            </p>
            
            <button class="btn btn-primary contact-button" style="margin-top: 2rem; width: 100%;" onclick="closeModal(); openModal('inquiryModal')"><span>
                Inquire About This Workshop
            </span></button>
        </div>
    `,p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let n=document.getElementById(`bookingDate`);n&&(n.min=new Date().toISOString().split(`T`)[0])}p.addEventListener(`click`,_),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&_()}),window.addEventListener(`scroll`,()=>{let e=window.pageYOffset,t=document.querySelector(`.hero-content`);t&&(t.style.transform=`translateY(${e*.5}px)`,t.style.opacity=1-e/700)});var C=window.location.hostname===`localhost`||window.location.hostname===`127.0.0.1`?`http://localhost:3000`:`https://asha-mental-wellness-the-therapyst.onrender.com`,w=document.getElementById(`contactForm`),T=document.getElementById(`contactFormMessage`);function E(e){return/\S+@\S+\.\S+/.test(e)}w&&T&&w.addEventListener(`submit`,async e=>{e.preventDefault();let t=new FormData(w),n=(t.get(`name`)||``).toString().trim(),r=(t.get(`email`)||``).toString().trim(),i=(t.get(`supportType`)||``).toString().trim(),a=(t.get(`mode`)||``).toString().trim(),o=(t.get(`message`)||``).toString().trim();if(T.classList.remove(`success`,`error`),!n||!r||!o){T.textContent=`Please fill in your name, email, and a short message so I can respond meaningfully.`,T.classList.add(`error`);return}if(!E(r)){T.textContent=`Please enter a valid email address so I can reach you.`,T.classList.add(`error`);return}let s=w.querySelector(`button[type="submit"]`),c=s?s.innerHTML:``;s&&(s.disabled=!0,s.innerHTML=`<span>Submitting Inquiry...</span>`);try{let e=await fetch(`${C}/api/contact`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:n,email:r,supportType:i,mode:a,message:o})}),t=await e.json().catch(()=>null);e.ok&&t&&t.success&&t.emailSent?(w.reset(),T.textContent=`Thank you for reaching out. Your inquiry has been noted and you will receive a response via email.`,T.classList.add(`success`)):t&&t.saved&&!t.emailSent?(T.textContent=`Your inquiry was recorded, but the email notification could not be delivered at this moment. You may also contact us directly at asha.suhasinim@gmail.com.`,T.classList.add(`error`)):(T.textContent=t&&(t.error||t.message)?t.error||t.message:`Unable to submit your inquiry at this moment. Please check your connection and try again.`,T.classList.add(`error`))}catch(e){console.error(`Contact form submission network error:`,e),T.textContent=`Unable to submit your inquiry at this moment. Please check your connection and try again.`,T.classList.add(`error`)}finally{s&&(s.disabled=!1,s.innerHTML=c)}}),console.log(`Asha Suhasini Raja - Website Initialized Successfully!`);var D=[],O=-1;function k(e){if(!e)return[];if(/^(https?:)?\/\//.test(e)||e.startsWith(`data:`)||e.startsWith(`blob:`))return[e];let t=e.replace(/\\/g,`/`).replace(/^\.\//,``).replace(/^\/+/,``),n=[`./${t}`,t,`../${t}`,`/${t}`];return[...new Set(n)]}function A(e,t){let n=k(t||e.getAttribute(`src`)||``);n.length!==0&&(e.src=n[0],e.dataset.pathTriedIndex=`0`,e.addEventListener(`error`,()=>{let t=Number(e.dataset.pathTriedIndex||0)+1;t>=n.length||(e.dataset.pathTriedIndex=String(t),e.src=n[t])}))}function j(e,t=`image`,n=-1,r=``){O=n,m.innerHTML=`
        <div class="modal-header">
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            <img src="${e}" alt="${r||`Gallery photograph`}">
        </div>
    `,p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let i=document.getElementById(`bookingDate`);i&&(i.min=new Date().toISOString().split(`T`)[0])}function M(){if(D.length===0)return;let e=(O-1+D.length)%D.length,t=D[e];j(t.src,t.type,e,t.caption)}function N(){if(D.length===0)return;let e=(O+1)%D.length,t=D[e];j(t.src,t.type,e,t.caption)}function P(){D=[],Array.from(document.querySelectorAll(`.media-item > img`)).forEach((e,t)=>{let n=e.src,r=`image`,i=e.alt||``;D.push({src:n,type:r,caption:i}),e.setAttribute(`loading`,`lazy`),A(e,n),e.style.cursor=`pointer`,e.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),j(n,r,t,i)})}),document.addEventListener(`keydown`,e=>{if(!m.classList.contains(`active`))return;if(e.key===`Escape`){_();return}let t=document.activeElement?document.activeElement.tagName:``,n=t===`INPUT`||t===`TEXTAREA`||document.activeElement&&document.activeElement.isContentEditable;O>=0&&!n&&(e.key===`ArrowLeft`&&(e.preventDefault(),M()),e.key===`ArrowRight`&&(e.preventDefault(),N()))})}P();async function F(){let e=document.getElementById(`bookingDate`).value,t=document.getElementById(`timeSlots`),n=document.getElementById(`bookingFormDetails`),r=document.getElementById(`bookingSuccessMessage`),i=document.getElementById(`slotLabel`);if(n.style.display=`none`,r&&(r.style.display=`none`),!e){t.innerHTML=`<p class="text-muted">Please select a date first.</p>`,i&&(i.innerText=`Available Slots`);return}let[a,o,s]=e.split(`-`),c=new Date(a,o-1,s).getDay()===0,l=c?[`12:00 PM`,`1:00 PM`,`2:00 PM`,`3:00 PM`]:[`5:00 PM`,`6:00 PM`,`7:00 PM`,`8:00 PM`];i&&(i.innerText=c?`Available Slots (12:00 PM - 4:00 PM)`:`Available Slots (5:00 PM - 9:00 PM)`),t.innerHTML=`<p class="text-muted">Loading available slots...</p>`;let u=[];try{let t=await fetch(`${C}/api/booked-slots?date=${e}`,{cache:`no-store`});t.ok?u=(await t.json()).booked||[]:console.warn(`Backend unavailable, using strict local check as fallback for rendering only.`)}catch(e){console.error(`Backend connection failed:`,e)}t.innerHTML=``;let d=!1;l.forEach(e=>{if(!u.includes(e)){d=!0;let n=document.createElement(`button`);n.className=`btn btn-outline time-slot-btn`,n.textContent=e,n.onclick=()=>I(n,e),t.appendChild(n)}}),d||(t.innerHTML=`<p class="text-muted">No slots available for this date. Please select another date.</p>`)}function I(e,t){document.querySelectorAll(`.time-slot-btn`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`),document.getElementById(`selectedSlot`).value=t,document.getElementById(`bookingFormDetails`).style.display=`block`;let n=document.getElementById(`bookingSuccessMessage`);n&&(n.style.display=`none`)}async function L(){let e=document.getElementById(`bookingDate`).value,t=document.getElementById(`selectedSlot`).value,n=document.getElementById(`bookingName`).value,r=document.getElementById(`bookingEmail`).value,i=document.getElementById(`mode`)?document.getElementById(`mode`).value:`online`;if(!e||!t||!n||!r){alert(`Please fill in all fields to confirm booking.`);return}let a=document.querySelector(`#bookingFormDetails button`),o=a.innerHTML;a.innerHTML=`Processing...`,a.disabled=!0;try{let a=await fetch(`${C}/api/book`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:n,email:r,date:e,slot:t,sessionFormat:i})}),o=await a.json();if(a.ok){document.getElementById(`bookingFormDetails`).style.display=`none`,await F();let i=document.getElementById(`bookingSuccessMessage`);i||(i=document.createElement(`div`),i.id=`bookingSuccessMessage`,i.style.cssText=`margin-top: 1rem; padding: 1rem; background: rgba(130, 168, 157, 0.15); border: 1px solid rgba(130, 168, 157, 0.3); color: var(--primary); border-radius: 8px;`,document.getElementById(`bookingSystem`).appendChild(i)),i.style.display=`block`,i.innerHTML=`
                <h4 style="margin-top:0; color:var(--primary);">Booking Request Submitted</h4>
                <p>Your online session request has been received and is awaiting confirmation. You will receive a confirmation email once your request is approved.</p>
                <p><strong>Name:</strong> ${n}</p>
                <p><strong>Email:</strong> ${r}</p>
                <p><strong>Date:</strong> ${e}</p>
                <p><strong>Time:</strong> ${t}</p>
                <p><strong>Session:</strong> Online Session</p>
                <p style="margin-bottom:0; margin-top:10px; font-weight:bold;">Status: Awaiting Confirmation</p>
            `}else alert(`Booking failed: `+(o.error||`Please try again.`)),F()}catch(e){alert(`Failed to connect to the booking server. Please ensure the backend is running.`),console.error(e)}finally{a.innerHTML=o,a.disabled=!1}}window.renderTimeSlots=F,window.selectSlot=I,window.confirmBooking=L,window.openGoogleCalendarBooking=s,window.scrollToSection=o,window.openModal=g,window.closeModal=_,window.openServiceModal=y,window.openExperienceModal=b,window.openTherapyModal=x,window.openWorkshopModal=S;var R=document.querySelectorAll(`.testimonial-card`),z=document.querySelectorAll(`.indicator`),B=document.querySelector(`.prev-btn`),V=document.querySelector(`.next-btn`),H=0;function U(e){R.forEach(e=>e.classList.remove(`active`)),z.forEach(e=>e.classList.remove(`active`)),R[e].classList.add(`active`),z[e].classList.add(`active`)}B&&V&&(B.addEventListener(`click`,()=>{H=H>0?H-1:R.length-1,U(H)}),V.addEventListener(`click`,()=>{H=H<R.length-1?H+1:0,U(H)}),z.forEach((e,t)=>{e.addEventListener(`click`,()=>{H=t,U(H)})}),setInterval(()=>{H=H<R.length-1?H+1:0,U(H)},6e3));function W(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}var G=1;async function K(){try{let e=await fetch(`${C}/api/reviews/stats`,{cache:`no-store`});if(!e.ok)return;let t=await e.json(),n=document.getElementById(`averageRating`),r=document.getElementById(`averageStars`),i=document.querySelectorAll(`.review-total-count, #reviewCount, #reviewsHeaderCount`);if(!t||t.totalRatings===void 0||t.totalRatings===0){n&&(n.textContent=`0.0`),r&&(r.innerHTML=`&#9734;&#9734;&#9734;&#9734;&#9734;`),i.forEach(e=>e.textContent=`0`);for(let e=1;e<=5;e++){let t=document.getElementById(`ratingCount`+e);t&&(t.textContent=`0`);let n=document.getElementById(`ratingBar`+e);n&&(n.style.width=`0%`)}return}let a=t.averageRating.toFixed(2);a.endsWith(`0`)&&(a=t.averageRating.toFixed(1)),n&&(n.textContent=a),r&&(r.innerHTML=`&#9733;`.repeat(Math.round(t.averageRating))+`&#9734;`.repeat(5-Math.round(t.averageRating))),i.forEach(e=>e.textContent=t.totalRatings);for(let e=1;e<=5;e++){let n=t.distribution&&(t.distribution[e]??t.distribution[String(e)])||0,r=document.getElementById(`ratingCount`+e);r&&(r.textContent=n);let i=t.totalRatings>0?n/t.totalRatings*100:0,a=document.getElementById(`ratingBar`+e);a&&(a.style.width=i+`%`)}}catch(e){console.error(`Stats error:`,e)}}async function q(e=1,t=!1){try{let n=await fetch(`${C}/api/reviews?page=${e}&limit=6`,{cache:`no-store`});if(!n.ok)throw Error(`Failed to fetch reviews`);let r=await n.json(),i=r.reviews||[],a=r.pagination,o=document.getElementById(`publicReviewsContainer`),s=document.getElementById(`loadMoreReviewsBtn`);if(!t&&i.length===0){o&&(o.innerHTML=`<p style="text-align:center; color:var(--text-secondary); font-style:italic; margin-top:20px; grid-column: 1 / -1; width: 100%;">No reviews yet. Be the first to share your experience!</p>`),s&&(s.style.display=`none`);return}let c=``;i.forEach(e=>{let t=`&#9733;`.repeat(e.rating)+`&#9734;`.repeat(5-e.rating),n=[];e.city&&n.push(W(e.city)),e.state&&n.push(W(e.state)),e.country&&n.push(W(e.country));let r=n.join(`, `);c+=`
                <div class="review-display-card">
                    <div class="review-card-top">
                        <h4 class="review-card-name">${W(e.name)}</h4>
                        <div class="review-card-stars" aria-label="${e.rating} out of 5 stars">${t}</div>
                    </div>
                    <p class="review-card-body">"${W(e.message)}"</p>
                    <div class="review-card-footer">
                        <span class="review-card-location">${r?`📍 `+r:`Verified Client`}</span>
                    </div>
                </div>
            `}),o&&(t?o.insertAdjacentHTML(`beforeend`,c):o.innerHTML=c),s&&(a&&a.hasNextPage?(s.style.display=`inline-flex`,s.onclick=()=>{s.textContent=`Loading reviews...`,s.disabled=!0,G++,q(G,!0).then(()=>{s.textContent=`Load More Reviews`,s.disabled=!1})}):s.style.display=`none`)}catch(e){console.error(`Error fetching reviews:`,e);let t=document.getElementById(`loadMoreReviewsBtn`);t&&(t.textContent=`Error loading reviews`,setTimeout(()=>{t.textContent=`Load More Reviews`,t.disabled=!1},2e3))}}function J(){let e=document.getElementById(`reviewForm`),t=document.getElementById(`reviewFormMessage`),n=document.querySelectorAll(`.star-btn`),r=document.getElementById(`reviewRating`);if(!e||!r)return;let i=0;n.forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-value`),10);i=t,r.value=t,n.forEach(e=>{parseInt(e.getAttribute(`data-value`),10)<=t?(e.innerHTML=`<span>&#9733;</span>`,e.style.color=`#c5a66a`):(e.innerHTML=`<span>&#9734;</span>`,e.style.color=`rgba(130, 168, 157, 0.3)`)})})}),e.addEventListener(`submit`,async a=>{if(a.preventDefault(),t.textContent=``,t.className=`contact-form-message`,!i||i<1||i>5){t.textContent=`Please select a rating.`,t.classList.add(`error`);return}let o=e.querySelector(`button[type="submit"]`),s=o.innerHTML;o.innerHTML=`Submitting...`,o.disabled=!0;try{let a={name:document.getElementById(`reviewerName`).value,email:document.getElementById(`reviewerEmail`).value,rating:i,message:document.getElementById(`reviewText`).value,country:document.getElementById(`reviewerCountry`).value,state:document.getElementById(`reviewerState`).value,city:document.getElementById(`reviewerCity`).value},o=await fetch(`${C}/api/reviews`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(a)}),s=await o.json();o.ok?(t.textContent=`Thank you! Your review has been submitted and is pending administrator moderation.`,t.classList.add(`success`),e.reset(),i=0,r.value=``,n.forEach(e=>{e.innerHTML=`<span>&#9734;</span>`,e.style.color=`rgba(130, 168, 157, 0.3)`})):(t.textContent=s.error||`Submission failed.`,t.classList.add(`error`))}catch{t.textContent=`Network error. Please try again.`,t.classList.add(`error`)}finally{o.innerHTML=s,o.disabled=!1}})}document.addEventListener(`DOMContentLoaded`,()=>{K(),q(1,!1),J()});function Y(e){document.querySelectorAll(`.timeline-content-wrapper.is-open`).forEach(e=>{e.classList.remove(`is-open`)}),e.closest(`.timeline-content-wrapper`).classList.add(`is-open`),document.addEventListener(`keydown`,Z)}function X(e){e.closest(`.timeline-content-wrapper`).classList.remove(`is-open`),document.removeEventListener(`keydown`,Z)}function Z(e){e.key===`Escape`&&(document.querySelectorAll(`.timeline-content-wrapper.is-open`).forEach(e=>{e.classList.remove(`is-open`)}),document.removeEventListener(`keydown`,Z))}window.openExperiencePanel=Y,window.closeExperiencePanel=X;