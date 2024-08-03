import React, { useEffect } from 'react';
import '../style/styles.css';

export default function MainPage(): JSX.Element {
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
              style={{ backgroundImage: 'url(/img/vin-base.png)' }}
            />
            <div
              className="layer layers__middle"
              style={{ backgroundImage: 'url(/img/vin-middle.png)' }}
            />
            <div
              className="layer layers__front"
              style={{ backgroundImage: 'url(/img/vin-front.png)' }}
            />
          </div>
          <div className="layer layers__front" style={{ backgroundImage: 'url(/img/fon-2.png)' }} />
          <div className="layer layers__front" style={{ marginTop:'0px', backgroundImage: 'url(/img/vin2-front.png)' }} />
        </header>

        <article className="main-article" style={{ backgroundImage: 'url(/img/.jpg)' }}>
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
            <div className="gallery">
              <div className="gallery-item">
                <img src="/img/work1.jpg" alt="Работа 1" />
                <p>Описание работы 1</p>
              </div>
              <div className="gallery-item">
                <img src="/img/work2.jpg" alt="Работа 2" />
                <p>Описание работы 2</p>
              </div>
              <div className="gallery-item">
                <img src="/img/work3.jpg" alt="Работа 3" />
                <p>Описание работы 3</p>
              </div>
              <div className="gallery-item">
                <img src="/img/work4.jpg" alt="Работа 4" />
                <p>Описание работы 4</p>
              </div>
              <div className="gallery-item">
                <img src="/img/work5.jpg" alt="Работа 5" />
                <p>Описание работы 5</p>
              </div>
              <div className="gallery-item">
                <img src="/img/work6.jpg" alt="Работа 6" />
                <p>Описание работы 6</p>
              </div>
            </div>
          </div>
          <div className="copy">Vinyl Paradise</div>
        </article>
      </div>
    </div>
  );
}
