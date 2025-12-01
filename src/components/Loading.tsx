import { animate, createScope, createSpring, createDraggable} from 'animejs';
import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';

interface AnimeScope {
  revert: () => void;
  methods: Record<string, (...args: any[]) => void>;
  add: (fn: (self: AnimeScope) => void) => AnimeScope;
}

function Loading() {
  // Root DOM element reference
  const root = useRef<HTMLDivElement | null>(null);

  // Anime.js scope reference
  const scope = useRef<AnimeScope | null>(null);

  // Track number of rotations
  const [rotations, setRotations] = useState<number>(0);

  useEffect(() => {
    if (!root.current) return;

    // Initialize scope
    scope.current = createScope({ root: root.current }).add((self: AnimeScope) => {
      // Bounce animation loop
      animate('.logo', {
        scale: [
          { to: 1.25, ease: 'inOut(3)', duration: 200 },
          { to: 1, ease: createSpring({ stiffness: 300 }) }
        ],
        loop: true,
        loopDelay: 250,
      });

      // Make the logo draggable
      createDraggable('.logo', {
        container: [0, 0, 0, 0],
        releaseEase: createSpring({ stiffness: 200 })
      });

      // Register external method
      self.add('rotateLogo', (i: number) => {
        animate('.logo', {
          rotate: i * 360,
          ease: 'out(4)',
          duration: 1500,
        });
      });
    });

    // Cleanup
    return () => {
      scope.current?.revert();
    };
  }, []);

  const handleClick = () => {
    setRotations((prev) => {
      const newRotations = prev + 1;
      // Animate logo rotation
      scope.current?.methods.rotateLogo(newRotations);
      return newRotations;
    });
  };

  return (
    <div ref={root}>
      <div className="large centered row">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <div className="medium row">
        <fieldset className="controls">
          <button onClick={handleClick}>rotations: {rotations}</button>
        </fieldset>
      </div>
    </div>
  );
}

export default Loading;
