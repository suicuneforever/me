import { useState } from 'react';
import './AboutMe.scss';

const PARENT_CLASS = 'AboutMe';

type Section = {
  title: string;
  id: string;
};

const SECTIONS: Section[] = [
  { title: 'about', id: 'ABOUT' },
  { title: 'interests', id: 'INTERESTS' },
  { title: 'music', id: 'MUSIC' },
  { title: 'art', id: 'ART' },
  { title: 'updates', id: 'UPDATES' },
  { title: 'to-do list', id: 'TODO_LIST' },
  { title: 'guestbook', id: 'GUESTBOOK' },
  { title: 'credits', id: 'CREDITS' },
];

function AboutMe() {
  const [sectionId, setSectionId] = useState<string>('ABOUT');

  return (
    <div className={`${PARENT_CLASS}`}>
      <div className={`${PARENT_CLASS}__container`}>
        <div className={`${PARENT_CLASS}__header`}>
          <div className={`${PARENT_CLASS}__card`}>welcome to my site</div>
        </div>
        <div className={`${PARENT_CLASS}__body`}>
          <div className={`${PARENT_CLASS}__sidebar`}>
            <div className={`${PARENT_CLASS}__sidebar-links`}>
              <div className={`${PARENT_CLASS}__title`}>menu</div>
              {SECTIONS.map((section) => (
                <button key={section.id} onClick={() => setSectionId(section.id)}>
                  <img src="/images/staricon.gif" />
                  {section.title}
                </button>
              ))}
            </div>
            <div className={`${PARENT_CLASS}__card`}>
              <div className={`${PARENT_CLASS}__title`}>visitors</div>
            </div>
          </div>
          <div className={`${PARENT_CLASS}__card`}>
            <div className={`${PARENT_CLASS}__section`}>
              {sectionId === 'ABOUT' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>about me</div>
                  <div className={`${PARENT_CLASS}__text`}>
                    hi hi, welcome to my page! my name is dani jaramillo. i am a programmer with a focus in web
                    development and a passion for frontend. i love the intersection of tech and art! i started drawing
                    ever since i could pick up a pencil, and my first introduction to computers was when my dad brought
                    home a compaq desktop machine in the early 2000s. once we got internet access via AOL dail-up, i
                    fell in love with the internet. i quickly disocvered neopets.com which was my first introduction to
                    coding, specifically using html + css to personalize my neopets profile :-)
                  </div>
                </>
              ) : null}
              {sectionId === 'INTERESTS' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>interests</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
              {sectionId === 'MUSIC' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>music</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
              {sectionId === 'ART' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>art</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
              {sectionId === 'UPDATES' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>updates</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
              {sectionId === 'TODO_LIST' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>to-do list</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
              {sectionId === 'GUESTBOOK' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>guestbook</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
              {sectionId === 'CREDITS' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>credits</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;

const About = () => {};

//https://int10h.org/oldschool-pc-fonts/
//https://codepen.io/sarahwfox/pen/pNrYGb
//https://miserabledolly.net/home
//https://www.fillster.com/
