import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/styles.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import VinylCard from '../ui/OrderCard';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { hash } = useLocation();

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      document.documentElement.style.setProperty('--scrollTop', `${scrollTop}px`);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const scrollToElement = (elementId: string, offset: number = 0, duration: number = 1000): void => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const elementPosition = element.getBoundingClientRect().top;
      const startingY = window.pageYOffset;
      const diff = elementPosition - startingY + offset;
      let start: number | null = null;

      window.requestAnimationFrame(function step(timestamp: number) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = Math.min(time / duration, 1);

        window.scrollTo(0, startingY + diff * percent);

        if (time < duration) {
          window.requestAnimationFrame(step);
        }
      });
    };

    if (hash) {
      setTimeout(() => {
        const elementId = hash.substring(1);
        scrollToElement(elementId, -240, 1000);
      }, 0);
    }
  }, [hash]);

  return (
    <div className="wrapper">
      <div className="content">
        <header className="main-header">
          <div className="layers">
            <div className="layer__header">
              <div className="layers__caption">Добро пожаловать в мир винила</div>
              <div className="layers__title">Custom Vinyl</div>
            </div>
            <div
              className="layer layers__base"
              style={{ backgroundImage: 'url(/img/vin-base3.png)' }}
            />
            <div
              className="layer layers__middle"
              style={{ backgroundImage: 'url(/img/vin-middle3.png)' }}
            />
            <div
              className="layer layers__front"
              style={{ backgroundImage: 'url(/img/vin-front3.png)' }}
            />
          </div>
          <div className="layer layers__front" style={{ backgroundImage: 'url(/img/fv-3.png)' }} />
          {/* <div className="layer layers__front" style={{ marginTop:'0px', backgroundImage: 'url(/img/vin2-front.png)' }} /> */}
        </header>

        <article className="main-article" style={{ backgroundImage: 'url(/img/fon-3.jpg)' }}>
          <div id="about" className="main-article__content">
            <h2 className="main-article__header">Custom Vinyl</h2>
            <p id="about" className="main-article__paragraph">
              В нашем магазине вы найдете уникальные виниловые пластинки, которые мы красим и
              наносим на них изображения по вашему заказу. Также мы предлагаем услугу записи ваших
              любимых треков на винил. Создайте свою идеальную коллекцию с нами!
            </p>
          </div>
          <div className="copy">Vinyl Paradise</div>
        </article>

        <article className="main-article" style={{ backgroundImage: 'url(/img/3.jpg)' }}>
          <div className="main-article__content">
            <h2 className="main-article__header">Наши работы:</h2>
            <p id="our-works" className="main-article__paragraph">
              В нашем магазине вы найдете уникальные виниловые пластинки, которые мы красим и
              наносим на них изображения по вашему заказу. Также мы предлагаем услугу записи ваших
              любимых треков на винил. Создайте свою идеальную коллекцию с нами!
            </p>
            {/* <div className="gallery">
              {vinyls.map((el) => (
              <VinylCard vinyl={el} key={el.id} />
              ))}
            </div> */}
          </div>
          <div className="copy">Vinyl Paradise</div>
        </article>
      </div>
    </div>
  );
}
