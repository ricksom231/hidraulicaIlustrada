import { useEffect, useRef, useState } from 'react';
import {
  audienceCards,
  basicItems,
  bonuses,
  checkoutLinks,
  completeItems,
  deliverablePages,
  faqs,
} from './data.js';

const TIMER_STORAGE_KEY = 'guia-hidraulico-offer-end';
const TIMER_DURATION = 25 * 60 * 1000;

function useOfferCountdown() {
  const [remaining, setRemaining] = useState(25 * 60);

  useEffect(() => {
    const stored = sessionStorage.getItem(TIMER_STORAGE_KEY);
    const endAt = stored ? Number(stored) : Date.now() + TIMER_DURATION;
    if (!stored) sessionStorage.setItem(TIMER_STORAGE_KEY, String(endAt));

    const update = () => setRemaining(Math.max(0, Math.ceil((endAt - Date.now()) / 1000)));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const items = [...document.querySelectorAll('[data-reveal]')];
    root.classList.add('revealReady');

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('isVisible'));
      return () => root.classList.remove('revealReady');
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('isVisible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      root.classList.remove('revealReady');
    };
  }, []);
}

function TopOfferTimer({ time }) {
  return (
    <div className="topCountdown" role="timer" aria-label={`Condição especial disponível por ${time}`}>
      <span className="timerDot" aria-hidden="true" />
      <strong>CONDIÇÃO ESPECIAL DISPONÍVEL POR:</strong>
      <b>{time}</b>
    </div>
  );
}

function scrollToPlans(event) {
  event?.preventDefault();
  document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function CTA({ children, className = '' }) {
  return <a href="#planos" className={`cta ${className}`} onClick={scrollToPlans}>{children}<span aria-hidden="true">↓</span></a>;
}

function Hero() {
  return (
    <section className="hero">
      <div className="heroCopy">
        <h1>Apareceu um problema hidráulico diferente e você não sabe por onde começar?</h1>
        <p className="lead">Abra no celular, encontre uma situação parecida e veja rapidamente quais sinais, peças e pontos vale conferir primeiro.</p>
      </div>
      <div className="heroMedia">
        <div className="productMockup" aria-label="Mockup do guia +180 Problemas Hidráulicos">
          <img className="mockPage mockPageBack" src="/assets/product-pages/page-02.png" alt="Página interna do guia mostrando uma torneira em corte" />
          <img className="mockPage mockPageSide" src="/assets/product-pages/page-06.png" alt="Página interna do guia mostrando uma instalação hidráulica" />
          <img className="heroImage" src="/assets/hero-product.png" alt="Capa do guia +180 Problemas Hidráulicos Explicados com Imagens" width="1055" height="1491" fetchPriority="high" />
        </div>
        <CTA className="primaryCta">QUERO ACESSAR O GUIA VISUAL</CTA>
        <p className="microcopy">Material digital para consultar no celular • Acesso imediato após a compra</p>
      </div>
    </section>
  );
}

function AudienceSection() {
  const steps = ['Abrir o guia', 'Procurar a situação', 'Comparar a imagem', 'Ver onde observar'];
  return (
    <section className="section audienceSection">
      <p className="eyebrow" data-reveal>PRA QUEM ESSE MATERIAL FAZ SENTIDO?</p>
      <h2 data-reveal>Feito para quem pega serviço hidráulico de verdade</h2>
      <div className="audienceGrid">
        {audienceCards.map(([title, text], index) => (
          <article className="audienceCard" data-reveal style={{ '--reveal-delay': `${index * 65}ms` }} key={title}>
            <span className="cardNumber">0{index + 1}</span>
            <div><h3>{title}</h3><p>{text}</p></div>
          </article>
        ))}
      </div>
      <div className="serviceFlow" data-reveal>
        <div className="flowIntro"><small>Em vez de abrir cinco pesquisas diferentes</small><strong>Você segue uma linha de consulta simples.</strong></div>
        <div className="flowSteps">{steps.map((step, index) => <span key={step}><b>0{index + 1}</b>{step}</span>)}</div>
      </div>
    </section>
  );
}

function CarouselRow({ items, reverse = false }) {
  return (
    <div className="carouselRow" aria-hidden="true">
      <div className={`deliverableTrack ${reverse ? 'trackReverse' : 'trackForward'}`}>
        {[0, 1, 2].map((loop) => (
          <div className="deliverableLoopGroup" key={`${reverse ? 'r' : 'f'}-${loop}`}>
            {items.map((src, index) => <figure className="deliverablePreview" key={`${loop}-${src}`}><img src={src} alt="" loading={loop === 0 && index < 2 ? 'eager' : 'lazy'} decoding="async" /></figure>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCarousel() {
  return (
    <section className="section demoSection">
      <p className="eyebrow" data-reveal>VEJA COMO O MATERIAL É POR DENTRO</p>
      <h2 data-reveal>Problemas reais explicados de um jeito visual</h2>
      <p className="sectionLead" data-reveal>Nem sempre o problema está onde a água aparece. Compare a situação com as imagens e veja o que vale conferir primeiro.</p>
      <div className="deliverableCarousel" role="group" aria-label="Prévia de páginas internas do guia">
        <div className="deliverableViewport">
          <div data-reveal><CarouselRow items={deliverablePages.slice(0, 5)} /></div>
          <div data-reveal style={{ '--reveal-delay': '80ms' }}><CarouselRow items={deliverablePages.slice(5)} reverse /></div>
        </div>
      </div>
      <div className="pillRow" data-reveal><span>Fácil de consultar</span><span>Organizado por categoria</span><span>Feito para abrir no celular</span></div>
    </section>
  );
}

function ImageSlot({ label, title }) {
  return (
    <figure className="imageSlot" data-image-slot={label} aria-label={`Espaço reservado para a capa de ${title}`}>
      <span className="slotIcon" aria-hidden="true">▧</span><strong>{label}</strong><small>Substituir pela imagem oficial</small>
    </figure>
  );
}

function BonusSection() {
  return (
    <section className="section bonusSection">
      <p className="eyebrow" data-reveal>BÔNUS / MATERIAIS EXTRAS</p>
      <h2 data-reveal>O Plano Completo amplia os caminhos de consulta</h2>
      <p className="sectionLead" data-reveal>Além do guia principal, você recebe quatro materiais para reconhecer instalações, peças, erros e sintomas.</p>
      <div className="bonusGrid">
        {bonuses.map((bonus, index) => (
          <article className="bonusCard" data-reveal style={{ '--reveal-delay': `${index * 65}ms` }} key={bonus.title}>
            <span className="bonusNumber">EXTRA {String(index + 1).padStart(2, '0')}</span>
            <ImageSlot label={bonus.slot} title={bonus.title} />
            <h3>{bonus.title}</h3><p>{bonus.text}</p>
            <div className="bonusPrice"><small>Valor percebido</small><s>{bonus.value}</s><strong>Incluído no Completo</strong></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BonusValueAnchor() {
  return (
    <section className="valueSection">
      <div className="valueBox" data-reveal>
        <span className="valueBadge">MATERIAIS EXTRAS INCLUÍDOS</span>
        <p>Somando tudo o que você vai levar</p>
        <h2>Tudo o que vem no Plano Completo</h2>
        <div className="valueLines">{bonuses.map((bonus) => <div key={bonus.title}><span>+ {bonus.title}</span><strong>{bonus.value}</strong></div>)}</div>
        <div className="valueTotal"><div><small>VALOR TOTAL DOS MATERIAIS EXTRAS</small><s>R$ 146,60</s></div><div><small>HOJE NO PLANO COMPLETO</small><b>GRÁTIS</b></div></div>
        <CTA className="lightCta">VER O PLANO COMPLETO</CTA>
      </div>
    </section>
  );
}

function PlanList({ items }) {
  return <ul className="planList">{items.map((item) => <li key={item}><span aria-hidden="true">✓</span><span>{item}</span></li>)}</ul>;
}

function UpgradeModal({ onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener('keydown', onKeyDown); };
  }, [onClose]);

  return (
    <div className="upgradeOverlay" role="presentation" onMouseDown={onClose}>
      <section className="upgradeModal" role="dialog" aria-modal="true" aria-labelledby="upgrade-title" onMouseDown={(event) => event.stopPropagation()}>
        <button ref={closeRef} className="upgradeClose" type="button" onClick={onClose} aria-label="Fechar oferta">×</button>
        <p className="upgradeEyebrow">ESPERE UM POUCO...</p>
        <h2 id="upgrade-title">Por apenas R$ 7,90 a mais, você pode levar o Plano Completo.</h2>
        <div className="upgradeCompare"><div><small>BÁSICO — R$ 10</small><strong>+180 problemas ilustrados</strong></div><div><small>COMPLETO — R$ 17,90</small><strong>Guia principal + 4 extras</strong><span>+80 mapas · peças · +50 erros · consulta por sintoma</span></div></div>
        <p className="upgradePriceLabel">Preço especial nesta opção</p><strong className="upgradePrice">R$ 17,90</strong>
        <a className="upgradeButton" href={checkoutLinks.completePopup}>SIM, QUERO O COMPLETO POR R$ 17,90</a>
        <a className="upgradeDecline" href={checkoutLinks.basic}>Continuar só com o Básico</a>
      </section>
    </div>
  );
}

function PricingSection({ time, onBasicClick }) {
  return (
    <section className="priceSection" id="planos">
      <div className="priceIntro" data-reveal><p className="eyebrow">ESCOLHA COMO VOCÊ QUER RECEBER</p><h2>Um material principal. Duas formas de levar.</h2><p>Os dois planos têm entrega digital. A diferença está na quantidade de referências para consultar.</p><div className="pricingTimer" role="timer"><span>OFERTA DISPONÍVEL POR:</span><strong>{time}</strong></div></div>
      <article className="basicCard" data-reveal><p className="planEyebrow">PLANO BÁSICO</p><h3>O guia principal</h3><p>Para quem quer consultar as 180 situações ilustradas.</p><div className="planPrice"><small>PAGAMENTO ÚNICO</small><strong><sup>R$</sup>10<em>,00</em></strong></div><PlanList items={basicItems} /><button className="planButton basicButton" type="button" onClick={onBasicClick}>QUERO O PLANO BÁSICO</button><p className="microcopy">Acesso digital imediato</p></article>
      <article className="completeCard" data-reveal style={{ '--reveal-delay': '80ms' }}><span className="featuredBadge">MAIS VANTAJOSO</span><p className="planEyebrow">PLANO COMPLETO</p><h3>O guia + biblioteca visual</h3><p>Para consultar por problema, instalação, peça, erro ou sintoma.</p><div className="planPrice"><small>PAGAMENTO ÚNICO</small><strong><sup>R$</sup>27<em>,90</em></strong><span>Por mais R$ 17,90, você leva os quatro materiais extras.</span></div><PlanList items={completeItems} /><a className="planButton completeButton" href={checkoutLinks.complete}>QUERO O PLANO COMPLETO →</a><p className="microcopy">Acesso imediato aos 5 materiais</p></article>
    </section>
  );
}

function GuaranteeSection() {
  return <section className="section guarantee" data-reveal><div className="guaranteeSeal"><span>GARANTIA</span><strong>7</strong><small>DIAS</small></div><div><p className="eyebrow">VOCÊ TEM TEMPO PARA OLHAR COM CALMA</p><h2>Você tem 7 dias para decidir</h2><p>Abra o material, veja as páginas, teste a navegação e entenda se ele faz sentido para o seu dia a dia. Se dentro do prazo de 7 dias você decidir que não era o que esperava, é só solicitar o reembolso conforme as regras da garantia.</p></div></section>;
}

function FAQSection() {
  return <section className="section faqSection"><p className="eyebrow" data-reveal>ANTES DE ESCOLHER</p><h2 data-reveal>Perguntas que costumam aparecer</h2><p className="sectionLead" data-reveal>O material é direto. As respostas também.</p><div className="faqGrid">{faqs.map(([question, answer], index) => <details data-reveal style={{ '--reveal-delay': `${Math.min(index, 4) * 45}ms` }} key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>;
}

function FinalCTA() {
  return <section className="finalCta" data-reveal><span className="finalMark">+180</span><div><h2>Tenha uma referência visual para quando aparecer algo diferente no serviço.</h2><p>Escolha o plano e tenha acesso ao material no celular.</p></div><CTA>VER OS PLANOS</CTA></section>;
}

export default function App() {
  const time = useOfferCountdown();
  const [showUpgrade, setShowUpgrade] = useState(false);
  useScrollReveal();

  return <><TopOfferTimer time={time} /><main><Hero /><AudienceSection /><ProductCarousel /><BonusSection /><BonusValueAnchor /><PricingSection time={time} onBasicClick={() => setShowUpgrade(true)} /><GuaranteeSection /><FAQSection /><FinalCTA /><footer><strong>+180 Problemas Hidráulicos</strong><span>Guia visual de consulta • Material digital</span></footer></main>{showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}</>;
}
