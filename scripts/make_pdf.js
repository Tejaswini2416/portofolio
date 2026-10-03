const fs = require('fs');
const path = require('path');

function createResumePDF() {
  const objects = [];
  
  function addObject(content) {
    objects.push(content);
    return objects.length; // 1-indexed object number
  }

  // Text stream operations
  const ops = [];
  
  // Helper to add text
  // Coordinates: (0,0) is bottom-left, width 595.28, height 841.89 (A4)
  
  // Header background banner
  ops.push('0.039 0.070 0.137 rg'); // Dark Navy #0a1223
  ops.push('0 755 595.28 86.89 re f');
  
  // Accent line
  ops.push('0.0 0.85 0.95 rg'); // Cyan #00d9f2
  ops.push('0 752 595.28 3 re f');
  
  // Name
  ops.push('BT');
  ops.push('/F2 22 Tf'); // Helvetica-Bold 22pt
  ops.push('1 1 1 rg'); // White
  ops.push('36 798 Td');
  ops.push('(TEJASWINI KUMMARI) Tj');
  ops.push('ET');

  // Title / Subtitle
  ops.push('BT');
  ops.push('/F1 10.5 Tf'); // Helvetica 10.5pt
  ops.push('0.0 0.85 0.95 rg'); // Cyan
  ops.push('36 782 Td');
  ops.push('(Computer Science & Engineering | AI/ML & Full-Stack Developer | GATE 2026 Qualified) Tj');
  ops.push('ET');

  // Contact Info
  ops.push('BT');
  ops.push('/F1 8.5 Tf');
  ops.push('0.85 0.90 0.95 rg');
  ops.push('36 766 Td');
  ops.push('(Email: tejaswinikummari17@gmail.com   |   Phone: +91 8919912916   |   Location: Telangana, India) Tj');
  ops.push('ET');

  ops.push('BT');
  ops.push('/F1 8.5 Tf');
  ops.push('0.85 0.90 0.95 rg');
  ops.push('36 756 Td');
  ops.push('(LinkedIn: linkedin.com/in/tejaswini-kummari-192425313/   |   GitHub: github.com/Tejaswini2416) Tj');
  ops.push('ET');

  let curY = 734;

  function renderSectionHeader(title) {
    ops.push('0.039 0.070 0.137 rg'); // Dark cyan/navy
    ops.push(`36 ${curY - 3} 523.28 16 re f`);
    ops.push('0.0 0.75 0.90 rg');
    ops.push(`36 ${curY - 3} 4 16 re f`); // Left border accent
    
    ops.push('BT');
    ops.push('/F2 10 Tf');
    ops.push('0.0 0.92 0.98 rg');
    ops.push(`46 ${curY + 1} Td`);
    ops.push(`(${title.toUpperCase()}) Tj`);
    ops.push('ET');
    curY -= 16;
  }

  function renderText(text, x, y, font = '/F1', size = 8.5, color = [0.15, 0.15, 0.15]) {
    ops.push('BT');
    ops.push(`${font} ${size} Tf`);
    ops.push(`${color[0]} ${color[1]} ${color[2]} rg`);
    ops.push(`${x} ${y} Td`);
    // Escape parentheses
    const escaped = text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    ops.push(`(${escaped}) Tj`);
    ops.push('ET');
  }

  // --- 1. EDUCATION & ACADEMIC EXCELLENCE ---
  renderSectionHeader('Education & Academic Milestones');
  curY -= 2;

  // B.Tech
  renderText('B.Tech in Computer Science and Engineering (CSE)', 40, curY, '/F2', 9, [0.05, 0.1, 0.2]);
  renderText('2023 - 2027', 480, curY, '/F2', 8.5, [0.2, 0.3, 0.5]);
  curY -= 11;
  renderText('Vignana Bharathi Institute of Technology (VBIT), Ghatkesar, Telangana', 40, curY, '/F1', 8.5, [0.25, 0.25, 0.25]);
  renderText('CGPA: 8.77 / 10.0', 480, curY, '/F2', 8.5, [0.0, 0.5, 0.3]);
  curY -= 10;
  renderText('- Core Coursework: Data Structures & Algorithms, Artificial Intelligence, Operating Systems, DBMS, Machine Learning', 45, curY, '/F1', 8, [0.35, 0.35, 0.35]);
  curY -= 13;

  // Intermediate
  renderText('Intermediate (MPC - Mathematics, Physics, Chemistry)', 40, curY, '/F2', 9, [0.05, 0.1, 0.2]);
  renderText('2021 - 2023', 480, curY, '/F2', 8.5, [0.2, 0.3, 0.5]);
  curY -= 11;
  renderText('Vision Junior College, Boduppal, Telangana', 40, curY, '/F1', 8.5, [0.25, 0.25, 0.25]);
  renderText('CGPA: 9.8 / 10.0', 480, curY, '/F2', 8.5, [0.0, 0.5, 0.3]);
  curY -= 13;

  // SSC
  renderText('Secondary School Certificate (SSC)', 40, curY, '/F2', 9, [0.05, 0.1, 0.2]);
  renderText('2020 - 2021', 480, curY, '/F2', 8.5, [0.2, 0.3, 0.5]);
  curY -= 11;
  renderText('Vijay Ratna High School, Boduppal, Telangana', 40, curY, '/F1', 8.5, [0.25, 0.25, 0.25]);
  renderText('CGPA: 10.0 / 10.0 (Perfect Score)', 480, curY, '/F2', 8.5, [0.0, 0.5, 0.3]);
  curY -= 14;

  // --- 2. COMPETITIVE ACHIEVEMENTS & EXAMS ---
  renderSectionHeader('Honors & Competitive Qualifications');
  curY -= 2;
  renderText('GATE 2026 Qualified - Data Science & Artificial Intelligence (DA)', 40, curY, '/F2', 9, [0.05, 0.1, 0.2]);
  renderText('All India Rank: AIR 10,000', 440, curY, '/F2', 8.5, [0.7, 0.1, 0.2]);
  curY -= 11;
  renderText('- National Examination testing Linear Algebra, Calculus, Probability, ML Algorithms, AI, and Data Structures.', 45, curY, '/F1', 8, [0.35, 0.35, 0.35]);
  curY -= 10;
  renderText('- Participant in IGNIS-XR-AI Hackathon (2025) & HMEL Energy Quest National Case Competition (2026).', 45, curY, '/F1', 8, [0.35, 0.35, 0.35]);
  curY -= 14;

  // --- 3. TECHNICAL SKILLS ---
  renderSectionHeader('Technical Skills & Core Competencies');
  curY -= 2;
  renderText('Languages:', 40, curY, '/F2', 8.5, [0.1, 0.2, 0.4]);
  renderText('Java, Python, C, JavaScript (ES6+), SQL, HTML5, CSS3', 120, curY, '/F1', 8.5, [0.2, 0.2, 0.2]);
  curY -= 11;
  renderText('Frameworks/Web:', 40, curY, '/F2', 8.5, [0.1, 0.2, 0.4]);
  renderText('React.js, Node.js, Express.js, Flask, Streamlit, Tailwind CSS, REST APIs', 120, curY, '/F1', 8.5, [0.2, 0.2, 0.2]);
  curY -= 11;
  renderText('AI/ML & Data:', 40, curY, '/F2', 8.5, [0.1, 0.2, 0.4]);
  renderText('Data Analytics, NLP, NumPy, Pandas, Scikit-Learn, Anomaly Detection, Generative AI', 120, curY, '/F1', 8.5, [0.2, 0.2, 0.2]);
  curY -= 11;
  renderText('Databases & Tools:', 40, curY, '/F2', 8.5, [0.1, 0.2, 0.4]);
  renderText('SQLite, MS SQL Server, ServiceNow, Git & GitHub, Docker Basics, VS Code', 120, curY, '/F1', 8.5, [0.2, 0.2, 0.2]);
  curY -= 14;

  // --- 4. KEY ENGINEERING PROJECTS ---
  renderSectionHeader('Key Engineering Projects');
  curY -= 2;

  // Project 1
  renderText('RazorPulse - High-Performance Transaction Monitoring Platform', 40, curY, '/F2', 9, [0.05, 0.1, 0.2]);
  renderText('React, Node.js, Express, REST APIs, Tailwind CSS', 370, curY, '/F1', 7.5, [0.3, 0.3, 0.5]);
  curY -= 10;
  renderText('GitHub: github.com/Tejaswini2416/razorpulse_agent   |   Live: razorpulse.vercel.app', 40, curY, '/F1', 7.5, [0.0, 0.4, 0.7]);
  curY -= 9;
  renderText('- Engineered real-time telemetry dashboard monitoring financial transaction streams with sub-120ms latency.', 45, curY, '/F1', 8, [0.3, 0.3, 0.3]);
  curY -= 9;
  renderText('- Implemented intelligent alert filtering engine processing 2.1M+ transaction throughput with 99.6% reliability.', 45, curY, '/F1', 8, [0.3, 0.3, 0.3]);
  curY -= 12;

  // Project 2
  renderText('Smart Aadhaar Analytics Platform - Pipeline & Anomaly Detection', 40, curY, '/F2', 9, [0.05, 0.1, 0.2]);
  renderText('Python, Pandas, NumPy, SQL Server, Streamlit', 375, curY, '/F1', 7.5, [0.3, 0.3, 0.5]);
  curY -= 10;
  renderText('GitHub: github.com/Tejaswini2416/Smart-Aadhaar-Analytics-Platform   |   Live: Streamlit Cloud', 40, curY, '/F1', 7.5, [0.0, 0.4, 0.7]);
  curY -= 9;
  renderText('- Built automated data ingestion and cleaning pipeline in Python/Pandas detecting duplicate identity records (99.2% accuracy).', 45, curY, '/F1', 8, [0.3, 0.3, 0.3]);
  curY -= 9;
  renderText('- Optimized SQL aggregation queries reducing database retrieval latency by 25%; deployed interactive Streamlit dashboard.', 45, curY, '/F1', 8, [0.3, 0.3, 0.3]);
  curY -= 12;

  // Project 3
  renderText('NLP-Powered AI Conversational Chatbot Microservice', 40, curY, '/F2', 9, [0.05, 0.1, 0.2]);
  renderText('Python, Flask, NLP, NLTK, Scikit-Learn, REST APIs', 370, curY, '/F1', 7.5, [0.3, 0.3, 0.5]);
  curY -= 10;
  renderText('GitHub: github.com/Tejaswini2416/nlp-ai-chatbot', 40, curY, '/F1', 7.5, [0.0, 0.4, 0.7]);
  curY -= 9;
  renderText('- Constructed NLP microservice with tokenization, multi-class intent classifier (93.8% accuracy), and sentiment analysis.', 45, curY, '/F1', 8, [0.3, 0.3, 0.3]);
  curY -= 9;
  renderText('- Streamlined request pipelines to achieve <180ms response roundtrips for real-time customer query resolution.', 45, curY, '/F1', 8, [0.3, 0.3, 0.3]);
  curY -= 14;

  // --- 5. PROFESSIONAL CERTIFICATIONS & SIMULATIONS ---
  renderSectionHeader('Certifications & Enterprise Job Simulations');
  curY -= 2;
  renderText('- ServiceNow Certified System Administrator (CSA) - ServiceNow (2025)', 40, curY, '/F2', 8.5, [0.1, 0.2, 0.3]);
  curY -= 10;
  renderText('  Platform administration, business rules, workflows, incident management, ITSM best practices, user access control.', 45, curY, '/F1', 8, [0.35, 0.35, 0.35]);
  curY -= 10;
  renderText('- Data Structures & Algorithms using Python (Part 1 & 2) - Infosys Springboard (2024)', 40, curY, '/F2', 8.5, [0.1, 0.2, 0.3]);
  curY -= 10;
  renderText('- GenAI Powered Data Analytics Specialization (2025)', 40, curY, '/F2', 8.5, [0.1, 0.2, 0.3]);
  curY -= 10;
  renderText('- Deloitte Australia - Technology Consulting Job Simulation (2024)', 40, curY, '/F1', 8.5, [0.2, 0.2, 0.2]);
  curY -= 10;
  renderText('- JPMorgan Chase & Co. - Software Engineering Job Simulation (2024)', 40, curY, '/F1', 8.5, [0.2, 0.2, 0.2]);

  const streamContent = ops.join('\n');
  const streamLength = Buffer.byteLength(streamContent, 'utf-8');

  // PDF Object building
  const streamObj = `<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream`;
  
  const obj1 = '<< /Type /Catalog /Pages 2 0 R >>';
  const obj2 = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
  const obj3 = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>';
  const obj4 = streamObj;
  const obj5 = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  const obj6 = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';

  const allObjs = [obj1, obj2, obj3, obj4, obj5, obj6];

  let body = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const offsets = [];

  for (let i = 0; i < allObjs.length; i++) {
    offsets.push(Buffer.byteLength(body, 'utf-8'));
    body += `${i + 1} 0 obj\n${allObjs[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(body, 'utf-8');
  body += 'xref\n';
  body += `0 ${allObjs.length + 1}\n`;
  body += '0000000000 65535 f \n';
  for (const offset of offsets) {
    body += `${String(offset).padStart(10, '0')} 00000 n \n`;
  }
  body += 'trailer\n';
  body += `<< /Size ${allObjs.length + 1} /Root 1 0 R >>\n`;
  body += 'startxref\n';
  body += `${xrefOffset}\n`;
  body += '%%EOF\n';

  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outPath1 = path.join(publicDir, 'Tejaswini_Kummari_Resume.pdf');
  const outPath2 = path.join(publicDir, 'resume.pdf');

  fs.writeFileSync(outPath1, body, 'binary');
  fs.writeFileSync(outPath2, body, 'binary');
  console.log('Successfully generated:', outPath1, 'and', outPath2);
}

createResumePDF();
