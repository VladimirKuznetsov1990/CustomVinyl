import React, { useEffect } from 'react';
import '../style/styles.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import VinylCard from '../ui/OrderCard';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  
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
