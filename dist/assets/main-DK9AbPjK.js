(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),``+new URL(`phonepe-qr-BRlZTh1B.jpg`,import.meta.url).href;var e=document.getElementById(`menuToggle`),t=document.getElementById(`desktopMenuToggle`),n=document.getElementById(`menuClose`),r=document.getElementById(`sidebar`),i=document.getElementById(`sidebarOverlay`);function a(){if(window.innerWidth>1024)document.body.classList.toggle(`desktop-sidebar-closed`);else{r.classList.toggle(`open`),i.classList.toggle(`active`);let t=r.classList.contains(`open`);e&&e.setAttribute(`aria-expanded`,t?`true`:`false`),document.body.style.overflow=t?`hidden`:``}}e&&e.addEventListener(`click`,a),t&&t.addEventListener(`click`,a),n&&n.addEventListener(`click`,a),i&&i.addEventListener(`click`,a),document.querySelectorAll(`.nav-link`).forEach(e=>{e.addEventListener(`click`,()=>{r&&r.classList.contains(`open`)&&a()})}),window.addEventListener(`resize`,()=>{window.innerWidth>1024&&r&&r.classList.contains(`open`)&&(r.classList.remove(`open`),i.classList.remove(`active`),e&&e.setAttribute(`aria-expanded`,`false`),document.body.style.overflow=``)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&r&&r.classList.contains(`open`)&&a()});function o(e){let t=document.getElementById(e);t&&t.scrollIntoView({behavior:`smooth`,block:`start`})}function s(){window.open(`https://calendar.google.com/calendar/u/0/r/eventedit?text=Therapy%20Session%20with%20Asha%20Suhasini%20Raja%20G&details=Please%20share%20your%20concern%20briefly.%20Contact%3A%20asha.suhasinim%40gmail.com&location=Online%20Session&add=asha.suhasinim%40gmail.com`,`_blank`,`noopener,noreferrer`)}document.querySelectorAll(`a[href^="#"]`).forEach(e=>{e.addEventListener(`click`,function(e){e.preventDefault(),o(this.getAttribute(`href`).substring(1))})});function c(e){let t=parseInt(e.getAttribute(`data-target`));if(isNaN(t))return;let n=e.getAttribute(`data-suffix`)||``,r=Math.max(1,t/(1500/16)),i=0,a=setInterval(()=>{i+=r,i>=t?(e.textContent=t+n,clearInterval(a)):e.textContent=Math.floor(i)+n},16)}var l=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(document.querySelectorAll(`.stat-number`).forEach(e=>{c(e)}),l.unobserve(e.target))})},{threshold:.1}),u=document.querySelector(`.hero`);u&&l.observe(u);var d=document.querySelectorAll(`.reveal`),f=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`active`)})},{threshold:.1});d.forEach(e=>{f.observe(e)});var p=document.getElementById(`modalOverlay`),m=document.getElementById(`modalContainer`),h;function g(e){h&&clearTimeout(h),r!==void 0&&r&&r.classList.contains(`open`)&&a(),m.innerHTML=v(e),p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let t=document.getElementById(`bookingDate`);t&&(t.min=new Date().toISOString().split(`T`)[0])}function _(){D=-1,p.classList.remove(`active`),m.classList.remove(`active`),document.body.style.overflow=`auto`,h&&clearTimeout(h),h=setTimeout(()=>{m.classList.contains(`active`)||(m.innerHTML=``)},300)}function v(e){return{educationModal:`
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
                            <input type="text" id="bookingName" placeholder="Your Name" class="form-input" required autocomplete="name">
                        </div>
                        <div class="form-field">
                            <input type="email" id="bookingEmail" placeholder="Your Email" class="form-input" required autocomplete="email">
                        </div>
                        <div class="form-field">
                            <input type="tel" id="bookingPhone" placeholder="Phone Number (Optional)" class="form-input" autocomplete="tel">
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
                            <img id="paymentQrImage" src="${``+new URL(`phonepe-qr-BRlZTh1B.jpg`,import.meta.url).href||`./assets/images/phonepe-qr.jpg`}" alt="PhonePe QR Code - GULLA ASHA SUHASINI RAJA" class="payment-qr-img">
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
    `,p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let n=document.getElementById(`bookingDate`);n&&(n.min=new Date().toISOString().split(`T`)[0])}function ee(e){h!==void 0&&h&&clearTimeout(h);let t={confidence:{title:`Building Confidence in Children`,description:`Empowering young minds with self-belief and resilience.`,content:[`Understanding child psychology and development`,`Techniques to boost self-esteem in children`,`Handling criticism and building resilience`,`Encouraging positive self-talk`,`Creating supportive home environments`,`Practical exercises for parents and educators`],duration:`2-3 hours interactive workshop`,audience:`Parents, teachers, and caregivers`},exam:{title:`Managing Exam Stress`,description:`Proven techniques for academic success and stress reduction.`,content:[`Understanding exam anxiety and its effects`,`Effective study techniques and time management`,`Relaxation and mindfulness exercises`,`Building confidence before exams`,`Handling performance pressure`,`Post-exam coping strategies`],duration:`2 hours interactive session`,audience:`Students, parents, and educators`},parenting:{title:`Conscious Parenting`,description:`Building deeper emotional connections with your children.`,content:[`Understanding emotional intelligence in parenting`,`Effective communication with children`,`Setting healthy boundaries with love`,`Dealing with challenging behaviors`,`Building trust and emotional security`,`Creating mindful family practices`],duration:`3-hour comprehensive workshop`,audience:`Parents and expecting parents`},mindset:{title:`Developing a Winning Mindset`,description:`Cultivating resilience, determination, and success orientation.`,content:[`Growth mindset vs fixed mindset`,`Overcoming limiting beliefs`,`Goal setting and achievement strategies`,`Building mental toughness`,`Handling failure and setbacks`,`Developing positive habits`],duration:`Half-day workshop`,audience:`Professionals, students, and individuals`}}[e];if(!t)return;m.innerHTML=`
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
    `,p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let n=document.getElementById(`bookingDate`);n&&(n.min=new Date().toISOString().split(`T`)[0])}p.addEventListener(`click`,_),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&_()}),window.addEventListener(`scroll`,()=>{let e=window.pageYOffset,t=document.querySelector(`.hero-content`);t&&(t.style.transform=`translateY(${e*.5}px)`,t.style.opacity=1-e/700)});var S=window.location.hostname===`localhost`||window.location.hostname===`127.0.0.1`?`http://localhost:3000`:`https://asha-mental-wellness-the-therapyst.onrender.com`,C=document.getElementById(`contactForm`),w=document.getElementById(`contactFormMessage`);function T(e){return/\S+@\S+\.\S+/.test(e)}C&&w&&C.addEventListener(`submit`,async e=>{e.preventDefault();let t=new FormData(C),n=(t.get(`name`)||``).toString().trim(),r=(t.get(`email`)||``).toString().trim(),i=(t.get(`supportType`)||``).toString().trim(),a=(t.get(`mode`)||``).toString().trim(),o=(t.get(`message`)||``).toString().trim();if(w.classList.remove(`success`,`error`),!n||!r||!o){w.textContent=`Please fill in your name, email, and a short message so I can respond meaningfully.`,w.classList.add(`error`);return}if(!T(r)){w.textContent=`Please enter a valid email address so I can reach you.`,w.classList.add(`error`);return}let s=C.querySelector(`button[type="submit"]`),c=s?s.innerHTML:``;s&&(s.disabled=!0,s.innerHTML=`<span>Submitting Inquiry...</span>`);try{let e=await fetch(`${S}/api/contact`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:n,email:r,supportType:i,mode:a,message:o})}),t=await e.json().catch(()=>null);e.ok&&t&&t.success&&t.emailSent?(C.reset(),w.textContent=`Thank you for reaching out. Your inquiry has been noted and you will receive a response via email.`,w.classList.add(`success`)):t&&t.saved&&!t.emailSent?(w.textContent=`Your inquiry was recorded, but the email notification could not be delivered at this moment. You may also contact us directly at asha.suhasinim@gmail.com.`,w.classList.add(`error`)):(w.textContent=t&&(t.error||t.message)?t.error||t.message:`Unable to submit your inquiry at this moment. Please check your connection and try again.`,w.classList.add(`error`))}catch(e){console.error(`Contact form submission network error:`,e),w.textContent=`Unable to submit your inquiry at this moment. Please check your connection and try again.`,w.classList.add(`error`)}finally{s&&(s.disabled=!1,s.innerHTML=c)}}),console.log(`Asha Suhasini Raja - Website Initialized Successfully!`);var E=[],D=-1;function O(e){if(!e)return[];if(/^(https?:)?\/\//.test(e)||e.startsWith(`data:`)||e.startsWith(`blob:`))return[e];let t=e.replace(/\\/g,`/`).replace(/^\.\//,``).replace(/^\/+/,``),n=[`./${t}`,t,`../${t}`,`/${t}`];return[...new Set(n)]}function k(e,t){let n=O(t||e.getAttribute(`src`)||``);n.length!==0&&(e.src=n[0],e.dataset.pathTriedIndex=`0`,e.addEventListener(`error`,()=>{let t=Number(e.dataset.pathTriedIndex||0)+1;t>=n.length||(e.dataset.pathTriedIndex=String(t),e.src=n[t])}))}function A(e,t=`image`,n=-1,r=``){D=n,m.innerHTML=`
        <div class="modal-header">
            <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>
        </div>
        <div class="modal-body">
            <img src="${e}" alt="${r||`Gallery photograph`}">
        </div>
    `,p.classList.add(`active`),m.classList.add(`active`),document.body.style.overflow=`hidden`;let i=document.getElementById(`bookingDate`);i&&(i.min=new Date().toISOString().split(`T`)[0])}function j(){if(E.length===0)return;let e=(D-1+E.length)%E.length,t=E[e];A(t.src,t.type,e,t.caption)}function M(){if(E.length===0)return;let e=(D+1)%E.length,t=E[e];A(t.src,t.type,e,t.caption)}function N(){E=[],Array.from(document.querySelectorAll(`.media-item > img`)).forEach((e,t)=>{let n=e.src,r=`image`,i=e.alt||``;E.push({src:n,type:r,caption:i}),e.setAttribute(`loading`,`lazy`),k(e,n),e.style.cursor=`pointer`,e.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),A(n,r,t,i)})}),document.addEventListener(`keydown`,e=>{if(!m.classList.contains(`active`))return;if(e.key===`Escape`){_();return}let t=document.activeElement?document.activeElement.tagName:``,n=t===`INPUT`||t===`TEXTAREA`||document.activeElement&&document.activeElement.isContentEditable;D>=0&&!n&&(e.key===`ArrowLeft`&&(e.preventDefault(),j()),e.key===`ArrowRight`&&(e.preventDefault(),M()))})}N();async function P(){let e=document.getElementById(`bookingDate`).value,t=document.getElementById(`timeSlots`),n=document.getElementById(`bookingFormDetails`),r=document.getElementById(`bookingSuccessMessage`),i=document.getElementById(`slotLabel`);if(n.style.display=`none`,r&&(r.style.display=`none`),!e){t.innerHTML=`<p class="text-muted">Please select a date first.</p>`,i&&(i.innerText=`Available Slots`);return}let[a,o,s]=e.split(`-`),c=new Date(a,o-1,s).getDay()===0,l=c?[`12:00 PM`,`1:00 PM`,`2:00 PM`,`3:00 PM`]:[`5:00 PM`,`6:00 PM`,`7:00 PM`,`8:00 PM`];i&&(i.innerText=c?`Available Slots (12:00 PM - 4:00 PM)`:`Available Slots (5:00 PM - 9:00 PM)`),t.innerHTML=`<p class="text-muted">Loading available slots...</p>`;let u=[];try{let t=await fetch(`${S}/api/booked-slots?date=${e}`,{cache:`no-store`});t.ok?u=(await t.json()).booked||[]:console.warn(`Backend unavailable, using strict local check as fallback for rendering only.`)}catch(e){console.error(`Backend connection failed:`,e)}t.innerHTML=``;let d=!1;l.forEach(e=>{if(!u.includes(e)){d=!0;let n=document.createElement(`button`);n.className=`btn btn-outline time-slot-btn`,n.textContent=e,n.onclick=()=>F(n,e),t.appendChild(n)}}),d||(t.innerHTML=`<p class="text-muted">No slots available for this date. Please select another date.</p>`)}function F(e,t){document.querySelectorAll(`.time-slot-btn`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`),document.getElementById(`selectedSlot`).value=t,document.getElementById(`bookingFormDetails`).style.display=`block`;let n=document.getElementById(`bookingSuccessMessage`);n&&(n.style.display=`none`)}var I={"individual-therapy":{key:`individual-therapy`,name:`Individual Therapy / Counselling`,duration:`45–60 min`,fee:3300,feeFormatted:`₹3,300`},"family-therapy":{key:`family-therapy`,name:`Family Therapy / Counselling`,duration:`45–60 min`,fee:4499,feeFormatted:`₹4,499`},"marital-therapy":{key:`marital-therapy`,name:`Marital Therapy / Counselling`,duration:`45–60 min`,fee:4499,feeFormatted:`₹4,499`},"pre-marital":{key:`pre-marital`,name:`Pre-Marital Counselling`,duration:`45–60 min`,fee:2400,feeFormatted:`₹2,400`},"student-therapy-60":{key:`student-therapy-60`,name:`Student Counselling / Therapy`,duration:`45–60 min`,fee:599,feeFormatted:`₹599`},"student-therapy-30":{key:`student-therapy-30`,name:`Student Counselling / Therapy`,duration:`30 min`,fee:299,feeFormatted:`₹299`},consultation:{key:`consultation`,name:`Consultation`,duration:`15–20 min`,fee:600,feeFormatted:`₹600`}};I[`Individual Therapy / Counselling`]=I[`individual-therapy`],I[`Family Therapy / Counselling`]=I[`family-therapy`],I[`Marital Therapy / Counselling`]=I[`marital-therapy`],I[`Pre-Marital Counselling`]=I[`pre-marital`],I[`Student Counselling / Therapy — 45–60 min (₹599)`]=I[`student-therapy-60`],I[`Student Counselling / Therapy — 30 min (₹299)`]=I[`student-therapy-30`],I[`Student Counselling / Therapy (45–60 min)`]=I[`student-therapy-60`],I[`Student Counselling / Therapy (30 min)`]=I[`student-therapy-30`],I.Consultation=I.consultation;function L(e){if(!e)return null;if(I[e])return I[e];let t=String(e).trim().toLowerCase();for(let e in I)if(e.toLowerCase()===t)return I[e];if(t.includes(`student`)&&t.includes(`30`))return I[`student-therapy-30`];if(t.includes(`student`))return I[`student-therapy-60`];for(let e in I)if(I[e].name&&I[e].name.toLowerCase()===t)return I[e];return null}function R(){let e=document.getElementById(`bookingService`),t=document.getElementById(`servicePrompt`),n=document.getElementById(`serviceSummary`),r=document.getElementById(`selectedServiceName`),i=document.getElementById(`selectedServiceDuration`),a=document.getElementById(`selectedServiceFee`);if(!e)return;let o=e.value,s=L(o);s?(r&&(r.textContent=s.name),i&&(i.textContent=s.duration),a&&(a.textContent=s.feeFormatted),t&&(t.style.display=`none`),n&&(n.style.display=`block`)):(r&&(r.textContent=`—`),i&&(i.textContent=`—`),a&&(a.textContent=`—`),t&&(t.style.display=`block`),n&&(n.style.display=`none`))}async function z(){let e=document.getElementById(`bookingService`),t=e?e.value:``,n=L(t);if(!n){alert(`Please select a service / therapy to proceed with booking.`),e&&e.focus();return}let r=document.getElementById(`bookingDate`).value,i=document.getElementById(`selectedSlot`).value,a=document.getElementById(`bookingName`).value,o=document.getElementById(`bookingEmail`).value,s=document.getElementById(`bookingPhone`),c=s?s.value.trim():``,l=document.getElementById(`mode`)?document.getElementById(`mode`).value:`online`;if(!r||!i||!a||!o){alert(`Please fill in all fields to confirm booking.`);return}let u=document.querySelector(`#bookingFormDetails button`),d=u.innerHTML;u.innerHTML=`Processing...`,u.disabled=!0;try{let e=await fetch(`${S}/api/book`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:a,email:o,phone:c,date:r,slot:i,sessionFormat:l,serviceKey:t,service:n.name,duration:n.duration,fee:n.fee,feeFormatted:n.feeFormatted})}),s=await e.json();if(e.ok){document.getElementById(`bookingFormDetails`).style.display=`none`,window.currentBooking={id:s.bookingId,name:a,email:o,phone:c||s.phone||``,date:r,slot:i,service:s.service||n.name,duration:s.duration||n.duration,fee:s.fee||n.feeFormatted,feeAmount:s.feeAmount||n.fee},await P();let e=document.getElementById(`bookingSuccessMessage`);e||(e=document.createElement(`div`),e.id=`bookingSuccessMessage`,e.style.cssText=`margin-top: 1rem; padding: 1.25rem; background: rgba(130, 168, 157, 0.12); border: 1px solid rgba(130, 168, 157, 0.35); color: var(--primary); border-radius: 12px;`,document.getElementById(`bookingSystem`).appendChild(e)),e.style.display=`block`,e.innerHTML=`
                <h4 style="margin-top:0; color:var(--primary); font-size: 1.2rem;">Booking Request Submitted</h4>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">Your online session request has been received. Please proceed to payment to complete your booking submission.</p>
                <div style="background:#ffffff; border:1px solid rgba(130, 168, 157, 0.3); border-radius:8px; padding:1rem; margin-bottom:1.25rem; font-size:0.95rem; line-height: 1.6;">
                    <p style="margin: 0.25rem 0;"><strong>Selected Service:</strong> ${X(window.currentBooking.service)}</p>
                    <p style="margin: 0.25rem 0;"><strong>Session Duration:</strong> ${X(window.currentBooking.duration)}</p>
                    <p style="margin: 0.25rem 0;"><strong>Consultation Fee:</strong> <span style="font-weight:700; color:#92400e; font-size:1.1rem;">${X(window.currentBooking.fee)}</span></p>
                    <p style="margin: 0.25rem 0;"><strong>Name:</strong> ${X(a)}</p>
                    <p style="margin: 0.25rem 0;"><strong>Email:</strong> ${X(o)}</p>
                    ${c?`<p style="margin: 0.25rem 0;"><strong>Phone:</strong> ${X(c)}</p>`:``}
                    <p style="margin: 0.25rem 0;"><strong>Date:</strong> ${X(r)}</p>
                    <p style="margin: 0.25rem 0;"><strong>Time:</strong> ${X(i)}</p>
                    <p style="margin: 0.25rem 0;"><strong>Session Format:</strong> Online Session</p>
                    <p style="margin-bottom:0; margin-top:0.5rem; font-weight:600; color: #b45309;">Status: Awaiting Payment</p>
                </div>
                <button type="button" id="proceedToPaymentBtn" class="btn btn-primary full-width" onclick="showPaymentStep()">
                    Proceed to Payment
                </button>
            `}else alert(`Booking failed: `+(s.error||`Please try again.`)),P()}catch(e){alert(`Failed to connect to the booking server. Please ensure the backend is running.`),console.error(e)}finally{u.innerHTML=d,u.disabled=!1}}function B(){if(!window.currentBooking){alert(`Please complete the booking form first.`);return}let e=document.getElementById(`bookingSuccessMessage`);e&&(e.style.display=`none`);let t=document.querySelector(`label[for="bookingService"]`)?.closest(`.form-field`);t&&(t.style.display=`none`);let n=document.getElementById(`serviceDetailsBox`);n&&(n.style.display=`none`);let r=document.querySelector(`label[for="bookingDate"]`)?.closest(`.form-field`);r&&(r.style.display=`none`);let i=document.getElementById(`slotLabel`)?.closest(`.form-field`);i&&(i.style.display=`none`);let a=document.getElementById(`paymentServiceName`),o=document.getElementById(`paymentServiceDuration`),s=document.getElementById(`paymentAmountPayable`),c=document.getElementById(`noticeAmount`);a&&(a.textContent=window.currentBooking.service),o&&(o.textContent=window.currentBooking.duration),s&&(s.textContent=window.currentBooking.fee),c&&(c.textContent=window.currentBooking.fee);let l=document.getElementById(`bookingPaymentSection`);l&&(l.style.display=`block`,l.scrollIntoView({behavior:`smooth`,block:`nearest`}))}function V(){let e=`8019749608@ybl`,t=document.getElementById(`copyUpiBtn`),n=document.getElementById(`copyUpiText`),r=()=>{if(n){let e=n.textContent;n.textContent=`✓ Copied!`,t&&(t.style.background=`#2e7d32`),setTimeout(()=>{n.textContent=e,t&&(t.style.background=``)},2e3)}};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(e).then(r).catch(()=>{H(e,r)}):H(e,r)}function H(e,t){let n=document.createElement(`textarea`);n.value=e,n.style.position=`fixed`,n.style.opacity=`0`,document.body.appendChild(n),n.focus(),n.select();try{document.execCommand(`copy`)&&t&&t()}catch(e){console.error(`Fallback copy failed`,e)}document.body.removeChild(n)}async function U(){if(!window.currentBooking||!window.currentBooking.id){alert(`No active booking request found. Please submit a booking request first.`);return}let e=document.getElementById(`paymentUtr`),t=document.getElementById(`paymentConfirmCheck`),n=document.getElementById(`paymentScreenshot`),r=document.getElementById(`submitPaymentBtn`),i=e?e.value.trim():``;if(!i){alert(`Please enter your UTR / Transaction Reference Number.`),e&&e.focus();return}if(i.length<6||i.length>35){alert(`Please enter a valid UTR / Transaction Reference Number (between 6 and 35 characters).`),e&&e.focus();return}if(t&&!t.checked){alert(`Please check the confirmation box to confirm that you have completed the payment.`),t.focus();return}let a=null;if(n&&n.files&&n.files[0]){let e=n.files[0];if(![`image/jpeg`,`image/png`,`image/webp`].includes(e.type)){alert(`Invalid file format. Please upload a JPG, PNG, or WEBP payment screenshot.`);return}if(e.size>2*1024*1024){alert(`Screenshot file is too large. Maximum size is 2MB.`);return}try{a=await new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=n,r.readAsDataURL(e)})}catch(e){console.error(`Error reading screenshot file:`,e),alert(`Failed to read the screenshot file. Please try again or submit without screenshot.`);return}}let o=r?r.innerHTML:`Submit Payment Details`;r&&(r.innerHTML=`Submitting Payment Details...`,r.disabled=!0);try{let e=await fetch(`${S}/api/book/payment`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({bookingId:window.currentBooking.id,utr:i,screenshot:a})}),t=await e.json();if(e.ok){let e=document.getElementById(`paymentSubmissionForm`);e&&(e.style.display=`none`);let n=document.querySelector(`.payment-qr-container`);n&&(n.style.display=`none`);let r=document.querySelector(`.payment-account-card`);r&&(r.style.display=`none`);let a=document.querySelector(`.payment-notice-box`);a&&(a.style.display=`none`);let o=document.querySelector(`.payment-summary-card`);o&&(o.style.display=`none`);let s=document.querySelector(`.payment-header`);s&&(s.style.display=`none`);let c=document.getElementById(`paymentStatusMessage`);c&&(c.style.display=`block`,c.innerHTML=`
                    <div class="payment-submitted-card" style="padding: 1.5rem; background: #ffffff; border: 1px solid rgba(130, 168, 157, 0.4); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                        <h4 style="margin-top:0; color: #2e7d32; display: flex; align-items: center; gap: 8px; font-size: 1.25rem;">
                            <span style="display:inline-block; width:26px; height:26px; border-radius:50%; background:#2e7d32; color:#fff; text-align:center; line-height:26px; font-size:15px; font-weight:bold;">✓</span> Payment Details Submitted
                        </h4>
                        <p style="color: var(--text-primary); line-height: 1.6; margin: 1rem 0;">
                            Thank you. Your payment reference has been submitted and is awaiting verification. Your booking will be confirmed once the payment has been verified.
                        </p>
                        <hr style="border: none; border-top: 1px dashed rgba(130, 168, 157, 0.35); margin: 1rem 0;">
                        <div class="payment-final-summary" style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.95rem;">
                            <div><strong>Selected Service:</strong> ${t.service||window.currentBooking.service}</div>
                            <div><strong>Consultation Fee:</strong> ${t.fee||window.currentBooking.fee}</div>
                            <div><strong>Date:</strong> ${t.date||window.currentBooking.date}</div>
                            <div><strong>Time:</strong> ${t.slot||window.currentBooking.slot}</div>
                            <div><strong>UTR / Reference No.:</strong> <span style="font-family:monospace; font-weight:bold; color:var(--primary);">${t.utr||i}</span></div>
                            <div style="margin-top: 0.5rem; padding: 0.6rem 0.85rem; background: rgba(180, 83, 9, 0.08); border-left: 3px solid #b45309; border-radius: 4px; font-weight: 600; color: #92400e;">
                                Payment Status: Pending Verification
                            </div>
                        </div>
                    </div>
                `)}else alert(`Payment submission failed: `+(t.error||`Please try again.`))}catch(e){console.error(`Payment submit error:`,e),alert(`Failed to connect to the booking server. Please check your internet connection.`)}finally{r&&(r.innerHTML=o,r.disabled=!1)}}window.renderTimeSlots=P,window.selectSlot=F,window.confirmBooking=z,window.handleServiceChange=R,window.getServiceData=L,window.SERVICES_MAP=I,window.showPaymentStep=B,window.copyUpiId=V,window.submitPaymentDetails=U,window.openGoogleCalendarBooking=s,window.scrollToSection=o,window.openModal=g,window.closeModal=_,window.openServiceModal=y,window.openExperienceModal=b,window.openTherapyModal=x,window.openWorkshopModal=ee;var W=document.querySelectorAll(`.testimonial-card`),G=document.querySelectorAll(`.indicator`),K=document.querySelector(`.prev-btn`),q=document.querySelector(`.next-btn`),J=0;function Y(e){W.forEach(e=>e.classList.remove(`active`)),G.forEach(e=>e.classList.remove(`active`)),W[e].classList.add(`active`),G[e].classList.add(`active`)}K&&q&&(K.addEventListener(`click`,()=>{J=J>0?J-1:W.length-1,Y(J)}),q.addEventListener(`click`,()=>{J=J<W.length-1?J+1:0,Y(J)}),G.forEach((e,t)=>{e.addEventListener(`click`,()=>{J=t,Y(J)})}),setInterval(()=>{J=J<W.length-1?J+1:0,Y(J)},6e3));function X(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}var Z=1;async function te(){try{let e=await fetch(`${S}/api/reviews/stats`,{cache:`no-store`});if(!e.ok)return;let t=await e.json(),n=document.getElementById(`averageRating`),r=document.getElementById(`averageStars`),i=document.querySelectorAll(`.review-total-count, #reviewCount, #reviewsHeaderCount`);if(!t||t.totalRatings===void 0||t.totalRatings===0){n&&(n.textContent=`0.0`),r&&(r.innerHTML=`&#9734;&#9734;&#9734;&#9734;&#9734;`),i.forEach(e=>e.textContent=`0`);for(let e=1;e<=5;e++){let t=document.getElementById(`ratingCount`+e);t&&(t.textContent=`0`);let n=document.getElementById(`ratingBar`+e);n&&(n.style.width=`0%`)}return}let a=t.averageRating.toFixed(2);a.endsWith(`0`)&&(a=t.averageRating.toFixed(1)),n&&(n.textContent=a),r&&(r.innerHTML=`&#9733;`.repeat(Math.round(t.averageRating))+`&#9734;`.repeat(5-Math.round(t.averageRating))),i.forEach(e=>e.textContent=t.totalRatings);for(let e=1;e<=5;e++){let n=t.distribution&&(t.distribution[e]??t.distribution[String(e)])||0,r=document.getElementById(`ratingCount`+e);r&&(r.textContent=n);let i=t.totalRatings>0?n/t.totalRatings*100:0,a=document.getElementById(`ratingBar`+e);a&&(a.style.width=i+`%`)}}catch(e){console.error(`Stats error:`,e)}}async function Q(e=1,t=!1){try{let n=await fetch(`${S}/api/reviews?page=${e}&limit=6`,{cache:`no-store`});if(!n.ok)throw Error(`Failed to fetch reviews`);let r=await n.json(),i=r.reviews||[],a=r.pagination,o=document.getElementById(`publicReviewsContainer`),s=document.getElementById(`loadMoreReviewsBtn`);if(!t&&i.length===0){o&&(o.innerHTML=`<p style="text-align:center; color:var(--text-secondary); font-style:italic; margin-top:20px; grid-column: 1 / -1; width: 100%;">No reviews yet. Be the first to share your experience!</p>`),s&&(s.style.display=`none`);return}let c=``;i.forEach(e=>{let t=`&#9733;`.repeat(e.rating)+`&#9734;`.repeat(5-e.rating),n=[];e.city&&n.push(X(e.city)),e.state&&n.push(X(e.state)),e.country&&n.push(X(e.country));let r=n.join(`, `);c+=`
                <div class="review-display-card">
                    <div class="review-card-top">
                        <h4 class="review-card-name">${X(e.name)}</h4>
                        <div class="review-card-stars" aria-label="${e.rating} out of 5 stars">${t}</div>
                    </div>
                    <p class="review-card-body">"${X(e.message)}"</p>
                    <div class="review-card-footer">
                        <span class="review-card-location">${r?`📍 `+r:`Verified Client`}</span>
                    </div>
                </div>
            `}),o&&(t?o.insertAdjacentHTML(`beforeend`,c):o.innerHTML=c),s&&(a&&a.hasNextPage?(s.style.display=`inline-flex`,s.onclick=()=>{s.textContent=`Loading reviews...`,s.disabled=!0,Z++,Q(Z,!0).then(()=>{s.textContent=`Load More Reviews`,s.disabled=!1})}):s.style.display=`none`)}catch(e){console.error(`Error fetching reviews:`,e);let t=document.getElementById(`loadMoreReviewsBtn`);t&&(t.textContent=`Error loading reviews`,setTimeout(()=>{t.textContent=`Load More Reviews`,t.disabled=!1},2e3))}}function ne(){let e=document.getElementById(`reviewForm`),t=document.getElementById(`reviewFormMessage`),n=document.querySelectorAll(`.star-btn`),r=document.getElementById(`reviewRating`);if(!e||!r)return;let i=0;n.forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-value`),10);i=t,r.value=t,n.forEach(e=>{parseInt(e.getAttribute(`data-value`),10)<=t?(e.innerHTML=`<span>&#9733;</span>`,e.style.color=`#c5a66a`):(e.innerHTML=`<span>&#9734;</span>`,e.style.color=`rgba(130, 168, 157, 0.3)`)})})}),e.addEventListener(`submit`,async a=>{if(a.preventDefault(),t.textContent=``,t.className=`contact-form-message`,!i||i<1||i>5){t.textContent=`Please select a rating.`,t.classList.add(`error`);return}let o=e.querySelector(`button[type="submit"]`),s=o.innerHTML;o.innerHTML=`Submitting...`,o.disabled=!0;try{let a={name:document.getElementById(`reviewerName`).value,email:document.getElementById(`reviewerEmail`).value,rating:i,message:document.getElementById(`reviewText`).value,country:document.getElementById(`reviewerCountry`).value,state:document.getElementById(`reviewerState`).value,city:document.getElementById(`reviewerCity`).value},o=await fetch(`${S}/api/reviews`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(a)}),s=await o.json();o.ok?(t.textContent=`Thank you! Your review has been submitted and is pending administrator moderation.`,t.classList.add(`success`),e.reset(),i=0,r.value=``,n.forEach(e=>{e.innerHTML=`<span>&#9734;</span>`,e.style.color=`rgba(130, 168, 157, 0.3)`})):(t.textContent=s.error||`Submission failed.`,t.classList.add(`error`))}catch{t.textContent=`Network error. Please try again.`,t.classList.add(`error`)}finally{o.innerHTML=s,o.disabled=!1}})}document.addEventListener(`DOMContentLoaded`,()=>{te(),Q(1,!1),ne()});function re(e){document.querySelectorAll(`.timeline-content-wrapper.is-open`).forEach(e=>{e.classList.remove(`is-open`)}),e.closest(`.timeline-content-wrapper`).classList.add(`is-open`),document.addEventListener(`keydown`,$)}function ie(e){e.closest(`.timeline-content-wrapper`).classList.remove(`is-open`),document.removeEventListener(`keydown`,$)}function $(e){e.key===`Escape`&&(document.querySelectorAll(`.timeline-content-wrapper.is-open`).forEach(e=>{e.classList.remove(`is-open`)}),document.removeEventListener(`keydown`,$))}window.openExperiencePanel=re,window.closeExperiencePanel=ie;