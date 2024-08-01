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
              <div className="layers__title">Виниловый рай</div>
            </div>
            <div
              className="layer layers__base"
              style={{ backgroundImage: 'url(/img/layer-base.png)' }}
            />
            <div
              className="layer layers__middle"
              style={{ backgroundImage: 'url(/img/layer-middle.png)' }}
            />
            <div
              className="layer layers__front"
              style={{ backgroundImage: 'url(/img/layer-front.png)' }}
            />
          </div>
        </header>

        <article className="main-article" style={{ backgroundImage: 'url(/img/dungeon.jpg)' }}>
          <div className="main-article__content">
            <h2 className="main-article__header">Виниловый Рай</h2>
            <p className="main-article__paragraph">
              В нашем магазине вы найдете уникальные виниловые пластинки, которые мы красим и
              наносим на них изображения по вашему заказу. Также мы предлагаем услугу записи ваших
              любимых треков на винил. Создайте свою идеальную коллекцию с нами!
            </p>
          </div>
          <div className="copy">Vinyl Paradise</div>
        </article>
      </div>
    </div>
  );
}
