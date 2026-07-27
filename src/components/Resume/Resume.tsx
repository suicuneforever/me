import './Resume.scss';

const PARENT_CLASS = 'Resume';

function Resume() {
  return (
    <div className={`${PARENT_CLASS}__background`}>
      <div className={`${PARENT_CLASS}__page`}>
        <div className={`${PARENT_CLASS}__heading`}>
          <div className={`${PARENT_CLASS}__heading__summary`}>
            <h1>Dani Jaramillo</h1>
            <span>
              Fullstack software engineer with 7+ years of experience building performant, user-facing web applications
              with a focus on web development. Passionate about visuals and the merging of technology and art.
            </span>
          </div>
          <div className={`${PARENT_CLASS}__heading__info`}>
            <ul>
              <li>New York City, USA</li>
              <li>www.danisroom.com</li>
              <li>danijrmllo@gmail.com</li>
              <li>520 909 4492</li>
              <li>in/danijaramillo</li>
            </ul>
          </div>
        </div>
        <div className={`${PARENT_CLASS}__body`}>
          <div className={`${PARENT_CLASS}__body__experience`}>
            <h2>Work Experience</h2>
            <div className={`${PARENT_CLASS}__body__experience__section`}>
              <h2>Senior Software Engineer</h2>
              <h3>
                Deloitte<span> · January 2024 - Present</span>
              </h3>
              <ul>
                <li>
                  Led a team of three engineers to deliver an alpha version of a full stack utility installation
                  tracking application using Next.js, React, and Prisma, owning the frontend architecture and UI
                  implementation end to end.
                </li>
                <li>
                  Designed and shipped responsive, performant, and accessible user interfaces, working closely with
                  product and design to translate business requirements into polished engineering solutions.
                </li>
                <li>
                  Drove front-end technical vision for an interactive exhibit at the 2024 Paris Olympics, using React
                  and Framer Motion to implement smooth animations and visually rich user experiences that ran reliably
                  under heavy traffic.
                </li>
                <li>
                  Built a proof-of-concept web application for a major pharmaceutical client using Next.js and React
                  that integrated GenAI models into an intuitive UI, enabling scientists to explore molecule research in
                  the browser.
                </li>
                <li>
                  Collaborated with cross-functional stakeholders (clients, PMs, designers) to break down complex
                  problems, scope frontend work, and ship features on time in a fast-paced consulting environment.
                </li>
              </ul>
            </div>
            <div className={`${PARENT_CLASS}__body__experience__section`}>
              <h2>Software Engineer</h2>
              <h3>
                Giant Machines (aquired by Deloitte)<span> · May 2021 - January 2024</span>
              </h3>
              <ul>
                <li>
                  Developed a data visualization web application for a major automotive manufacturer using React,
                  GraphQL, Serverless, and AWS to help users track electric vehicle efficiency at scale.
                </li>
                <li>
                  Built a React Native mobile application and web frontend for a major utility company to digitize field
                  worker tasks previously performed on paper, improving usability and data quality.
                </li>
                <li>
                  Created a Chrome extension using React to streamline browser workflows for a large clinical trials
                  organization, focusing on fast, intuitive UX for power users.
                </li>
                <li>
                  Conducted technical interviews, helped develop interview questions, and contributed to onboarding
                  documentation and best practices, supporting a culture of excellence and high engineering standards.
                </li>
              </ul>
            </div>
            <div className={`${PARENT_CLASS}__body__experience__section`}>
              <h2>Software Engineer</h2>
              <h3>
                AstreaX<span> · May 2017 - June 2019</span>
              </h3>
              <ul>
                <li>
                  Built frontend features and backend RESTful API services using TypeScript, Angular, HTML/CSS, and
                  C#/.NET to support seamless user experiences across internal and external web applications.
                </li>
                <li>
                  Partnered with the Arizona Department of Transportation to rebuild a decade-old application from the
                  ground up, modernizing the UI, improving performance, and enhancing accessibility and maintainability.
                </li>
                <li>
                  Implemented an internal time-logging interface that surfaced Azure DevOps project data in a single,
                  easy-to-read timesheet, simplifying workflows for employees and managers.
                </li>
              </ul>
            </div>
            <div className={`${PARENT_CLASS}__body__experience__section`}>
              <h2>English Teacher</h2>
              <h3>
                Seoul Metropolitan Office of Education<span> · August 2019 - August 2020</span>
              </h3>
              <ul>
                <li>Planned and taught English lessons in collaboration with a Korean co-teacher for students.</li>
                <li>
                  Worked in Korean and English to support learning and classroom management, strengthening
                  cross-cultural communication and adaptability.
                </li>
              </ul>
            </div>
          </div>
          <div className={`${PARENT_CLASS}__body__skills`}>
            <h2>Skills</h2>
            <div className={`${PARENT_CLASS}__body__skills__section`}>
              <h3>Languages</h3>
              <ul>
                <li>Typescript</li>
                <li>Javascript</li>
                <li>Java</li>
                <li>C#</li>
                <li>HTML/CSS</li>
                <li>SQL</li>
              </ul>
            </div>
            <div className={`${PARENT_CLASS}__body__skills__section`}>
              <h3>Libraries & Tools</h3>
              <ul>
                <li>React, React Native</li>
                <li>Angular</li>
                <li>Next.js</li>
                <li>Node</li>
                <li>Express.js</li>
                <li>.NET Core</li>
                <li>REST APIs</li>
                <li>GraphQL</li>
                <li>Prisma</li>
              </ul>
            </div>
            <div className={`${PARENT_CLASS}__body__skills__section`}>
              <h3>Infrastructure & Platforms</h3>
              <ul>
                <li>AWS</li>
                <li>Serverless</li>
                <li>Azure DevOps</li>
                <li>Vercel</li>
                <li>Chrome Extensions</li>
              </ul>
            </div>
            <h2>Education</h2>
            <div className={`${PARENT_CLASS}__body__skills__section`}>
              <h3>Bachelor's of Science in Computer Science</h3>
              <p>University of Arizona</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${PARENT_CLASS}__clippy`}>
        <div className={`${PARENT_CLASS}__clippy__bubble`}>
          <div className={`${PARENT_CLASS}__clippy__bubble__text`}>Want to download my resume? Click below :-)</div>
          <a href="/docs/DaniJaramillo_Resume2026.pdf" download="DaniJaramillo_Resume2026.pdf">
            Download Resume
          </a>
        </div>
        <img src="/images/clippy.png" />
      </div>
    </div>
  );
}

export default Resume;
