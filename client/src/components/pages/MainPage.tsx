import React, { useEffect, useRef, useState } from 'react';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useLocation } from 'react-router-dom';
import '../style/styles.css';
import { IconButton } from '@mui/material';

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

export default function MainPage(): JSX.Element {
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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

      // Show or hide the scroll button based on scroll position
      setShowScrollButton(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash) {
      switch (hash) {
        case 'about':
          scrollToElement('about', -440, 3000);
          break;
        case 'our-works':
          scrollToElement('our-works', -70, 6000);
          break;
        default:
          break;
      }
    }
  }, [location]);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <img style={{ width: '350px' }} src="/static/img/vinyl2.png" alt="" />
            <p id="about" className="main-article__paragraph">
              В нашем магазине вы найдете уникальные виниловые пластинки, которые мы красим и
              наносим на них изображения по вашему заказу. Также мы предлагаем услугу записи ваших
              любимых треков на винил. Создайте свою идеальную коллекцию с нами!
            </p>
          </div>
        </article>

        <article className="main-article" style={{ backgroundImage: 'url(/static/img/fonVi.png)' }}>
          <div className="main-article__content">
            <h2 className="main-article__header">Наши работы:</h2>
            <p id="our-works" className="main-article__paragraph">
              Мы гордимся нашими работами и рады поделиться ими с вами. В этом разделе вы найдете
              примеры наших уникальных виниловых пластинок, которые мы красим и наносим на них
              изображения по вашему заказу. Также мы предлагаем услугу записи ваших любимых треков
              на винил. Создайте свою идеальную коллекцию с нами!
            </p>
          </div>
          <div style={{ padding: '100px' }} className="gallery" ref={galleryRef}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={`gallery-item ${visibleImages.includes(index) ? 'visible' : ''}`}
              >
                <img
                  className="rotating-image"
                  src={`/static/img/work${index + 1}.png`}
                  alt={`Work ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </article>

        {showScrollButton && (
          <IconButton
            className="scroll-to-top-button"
            onClick={scrollToTop}
            style={{
              position: 'sticky',
              bottom: '40px',
              left: '40px',
              zIndex: 1000,
              boxShadow: "2px 2px 2px #00FFFF",
              opacity: '.4'
            }}
          >
            <KeyboardDoubleArrowUpIcon sx={{width: '40px', height: '40px', color: '#00FFFF'}}/>
          </IconButton>
        )}

        <footer
          className="main-footer"
          style={{ backgroundImage: 'url(/static/img/fonVin2.png)', opacity: 0.6 }}
        >
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
