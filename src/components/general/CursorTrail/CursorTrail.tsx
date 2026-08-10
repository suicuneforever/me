import { useEffect } from 'react';
import './CursorTrail.scss';

interface CursorTrailProps {
  colour?: string;
  count?: number;
}

interface Sparkle {
  el: HTMLDivElement;
  bar1: HTMLDivElement;
  bar2: HTMLDivElement;
  y: number;
  life: number;
}

const PARENT_CLASS = 'CursorTrail';
const TICK_MS = 40;
const LIFE = 50;
const SHRINK_AT = 25;

function randomSparkleColour(): string {
  const values = [255, Math.floor(Math.random() * 256), 0];
  values[2] = Math.floor(Math.random() * (256 - values[1] / 2));
  values.sort(() => 0.5 - Math.random());
  return `rgb(${values[0]}, ${values[1]}, ${values[2]})`;
}

function createSparkle(): Sparkle {
  const el = document.createElement('div');
  el.className = `${PARENT_CLASS}__sparkle`;

  const bar1 = document.createElement('div');
  bar1.className = `${PARENT_CLASS}__bar ${PARENT_CLASS}__bar--vertical`;

  const bar2 = document.createElement('div');
  bar2.className = `${PARENT_CLASS}__bar ${PARENT_CLASS}__bar--horizontal`;

  el.appendChild(bar1);
  el.appendChild(bar2);

  return { el, bar1, bar2, y: 0, life: 0 };
}

function CursorTrail({ colour = 'random', count = 30 }: CursorTrailProps) {
  useEffect(() => {
    const container = document.createElement('div');
    container.className = `${PARENT_CLASS}__container`;
    document.body.appendChild(container);

    const sparkles: Sparkle[] = Array.from({ length: count }, createSparkle);
    sparkles.forEach((sparkle) => container.appendChild(sparkle.el));

    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;
    let nextIndex = 0;

    function handleMouseMove(event: MouseEvent) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }

    function spawnSparkle() {
      const sparkle = sparkles[nextIndex];
      nextIndex = (nextIndex + 1) % sparkles.length;

      sparkle.y = mouseY;
      sparkle.life = LIFE;

      const fill = colour === 'random' ? randomSparkleColour() : colour;
      sparkle.bar1.style.backgroundColor = fill;
      sparkle.bar2.style.backgroundColor = fill;
      sparkle.el.style.width = '5px';
      sparkle.el.style.height = '5px';
      sparkle.el.style.left = `${mouseX}px`;
      sparkle.el.style.top = `${sparkle.y}px`;
      sparkle.el.style.visibility = 'visible';
    }

    function step() {
      if (Math.abs(mouseX - lastX) > 1 || Math.abs(mouseY - lastY) > 1) {
        lastX = mouseX;
        lastY = mouseY;
        spawnSparkle();
      }

      for (const sparkle of sparkles) {
        if (sparkle.life <= 0) continue;

        sparkle.life -= 1;
        sparkle.y += 1 + Math.random() * 3;
        sparkle.el.style.top = `${sparkle.y}px`;

        if (sparkle.life === SHRINK_AT) {
          sparkle.el.style.width = '2px';
          sparkle.el.style.height = '2px';
        }

        if (sparkle.life === 0) {
          sparkle.el.style.visibility = 'hidden';
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    const intervalId = window.setInterval(step, TICK_MS);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.clearInterval(intervalId);
      container.remove();
    };
  }, [colour, count]);

  return null;
}

export default CursorTrail;
