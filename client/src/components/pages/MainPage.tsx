import React, { useEffect, useRef, useState } from 'react';

import '../style/styles.css';

export default function MainPage(): JSX.Element {
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      document.documentElement.style.setProperty('--scrollTop', `${scrollTop}px`);

      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setVisibleImages([0, 1, 2, 3, 4, 5]);
        } else {
          setVisibleImages([]);
        }
      }
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

            <div
              className="layer layers__base"
              style={{ backgroundImage: 'url(/static/img/fb4.png)' }}
            />
            <div
              className="layer layers__middle"
              style={{ backgroundImage: 'url(/static/img/fm4.png)' }}
            />
            <div
              className="layer layers__front"
              style={{ backgroundImage: 'url(/static/img/ff4.png)' }}
            />
          </div>
        </header>

        <article
          className="main-article"
          style={{ backgroundImage: 'url(/static/img/fonVin2.png)' }}
        >
          <div className="main-article__content">

            <h2 className="layers__title">Custom Vinyl</h2>
            <img style={ {width: '350px'}} src="/static/img/vinyl2.png" alt="" />
            <p  id="about" className="main-article__paragraph">
              В нашем магазине вы найдете уникальные виниловые пластинки, которые мы красим и
              наносим на них изображения по вашему заказу. Также мы предлагаем услугу записи ваших
              любимых треков на винил. Создайте свою идеальную коллекцию с нами!
            </p>
          </div>
        </article>

        <article
          className="main-article"
          style={{ backgroundImage: 'url(/static/img/fonVi.png)' }}
        >
          <div className="main-article__content">
            <h2 className="main-article__header">Наши работы:</h2>
            <p id="our-works" className="main-article__paragraph">
              Мы гордимся нашими работами и рады поделиться ими с вами. В этом разделе вы найдете примеры наших уникальных виниловых пластинок, которые мы красим и наносим на них изображения по вашему заказу. Также мы предлагаем услугу записи ваших любимых треков на винил. Создайте свою идеальную коллекцию с нами!
            </p>
          </div>
          <div   style={{ padding: '100px' }} className="gallery" ref={galleryRef}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div key={index} className={`gallery-item ${visibleImages.includes(index) ? 'visible' : ''}`}>
                <img className="rotating-image" src={`/static/img/work${index + 1}.png`} alt={`Work ${index + 1}`} />
              </div>
            ))}
          </div>
        </article>

        <footer className="main-footer" style={{ backgroundImage: 'url(/static/img/fonVin2.png)', opacity: 0.6 }}>
          <div className="footer-content">
            <p>&copy; 2024 Custom Vinyl. Все права защищены.</p>
            <p>Контакты: info@customVinyl.ru</p>
            <p>Москва, ул. Орджоникидзе, 11 стр. 10 (м. Ленинский проспект)</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
