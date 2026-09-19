import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleDollarSign,
  FileCheck2,
  Landmark,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const whatsappNumber = "559284240515";
const whatsappLink = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

function WhatsappIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.91c0 2.1.55 4.15 1.6 5.96L.08 24l6.27-1.64a11.9 11.9 0 0 0 5.72 1.46h.01c6.56 0 11.9-5.34 11.9-11.91 0-3.18-1.24-6.16-3.46-8.43Zm-8.44 18.34h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.88 9.88 0 0 1-1.51-5.29C2.2 6.47 6.63 2.04 12.08 2.04c2.64 0 5.12 1.03 6.98 2.9a9.86 9.86 0 0 1 2.89 7.02c0 5.45-4.43 9.86-9.87 9.86Zm5.41-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" fill="currentColor" />
    </svg>
  );
}

const services = [
  {
    icon: FileCheck2,
    title: "Assessoria Contábil",
    description:
      "Rigor técnico e informações confiáveis para uma operação fiscal organizada.",
    benefit: "Mais segurança para decidir.",
    href: "https://valoressa.com.br/assessoria-contabil/",
  },
  {
    icon: BarChart3,
    title: "Consultoria Empresarial",
    description:
      "Análise de processos, indicadores e oportunidades para ampliar a competitividade.",
    benefit: "Mais estratégia para crescer.",
    href: "https://valoressa.com.br/consultoria-empresarial/",
  },
  {
    icon: CircleDollarSign,
    title: "BPO Financeiro",
    description:
      "Rotinas financeiras, fluxo de caixa e relatórios gerenciais em uma visão clara.",
    benefit: "Mais controle da operação.",
    href: "#contato",
  },
  {
    icon: Sparkles,
    title: "Educação Corporativa",
    description:
      "Treinamentos práticos e atualizados para elevar a eficiência da sua gestão.",
    benefit: "Mais preparo para resultados.",
    href: "#contato",
  },
];

const challenges = [
  {
    problem: "Finanças pessoais e empresariais misturadas",
    help: "Estruturamos uma rotina financeira independente e organizada.",
    benefit: "Visibilidade real sobre o negócio.",
  },
  {
    problem: "Pendências e documentação sem controle",
    help: "Apoiamos a legalização e o acompanhamento das exigências.",
    benefit: "Regularidade para atuar com confiança.",
  },
  {
    problem: "Processos indefinidos ou confusos",
    help: "Organizamos sistemas, registros e fluxos de informação.",
    benefit: "Decisões mais claras e consistentes.",
  },
  {
    problem: "Gestão financeira fragilizada",
    help: "Transformamos rotinas em relatórios úteis para a gestão.",
    benefit: "Controle para priorizar o que importa.",
  },
  {
    problem: "Carga tributária elevada",
    help: "Analisamos atividades e regimes para um planejamento responsável.",
    benefit: "Tributos alinhados à realidade da empresa.",
  },
];

const differentials = [
  "Segurança fiscal",
  "Gestão financeira",
  "Planejamento tributário",
  "Informações para decisão",
  "Atendimento consultivo",
  "Tecnologia e processos",
];

const faqItems = [
  {
    question: "Sou MEI, preciso de contabilidade?",
    answer:
      "O MEI não é obrigado a ter contabilidade, mas o apoio de um contador ajuda a manter as obrigações em dia, organizar as finanças do negócio, planejar e assessorar seu crescimento.",
  },
  {
    question: "Fui desenquadrado do MEI. E agora?",
    answer:
      "Ao ser desenquadrada do MEI, sua empresa passa a ser Microempresa (ME), e a contabilidade se torna essencial. Surgem novas obrigações fiscais e contábeis; a assessoria especializada ajuda a regularizar a situação, verificar o regime tributário adequado e gerar relatórios para a gestão.",
  },
  {
    question: "Quero abrir uma empresa. O que preciso?",
    answer:
      "É preciso definir as atividades econômicas (CNAE), o tipo jurídico, o capital social e o regime tributário mais adequado. Também são exigidos documentos dos sócios, endereço empresarial e registros nos órgãos competentes. A assessoria de um contador é essencial para iniciar a empresa de forma regular e segura.",
  },
  {
    question: "Qual é a diferença entre BPO Financeiro e contabilidade?",
    answer:
      "O BPO Financeiro atua na rotina diária do negócio: contas a pagar e a receber, conciliação bancária, fluxo de caixa e relatórios de acompanhamento. A contabilidade recebe a movimentação do período para cumprir exigências legais, apurar impostos, enviar declarações e elaborar demonstrativos como DRE e Balanço Patrimonial.",
  },
  {
    question: "Fui notificado pela Receita Federal. O que devo fazer?",
    answer:
      "Não ignore a notificação. Verifique o tipo de pendência e o prazo informado, então procure um contador para analisar a situação e orientar a regularização, os esclarecimentos ou o tratamento de débitos, evitando multas maiores e outras penalidades.",
  },
  {
    question: "Quero trocar de contador. O que preciso fazer?",
    answer:
      "A troca de contador é simples e legal. Basta formalizar o encerramento do contrato atual e autorizar o novo escritório a solicitar a documentação contábil e fiscal. A nova contabilidade conduz a migração dos dados para garantir continuidade nas obrigações e regularidade da empresa.",
  },
  {
    question: "O escritório oferece apoio na organização financeira?",
    answer:
      "Sim. Apoiamos a organização de entradas e saídas para estruturar o fluxo de caixa. Também oferecemos BPO Financeiro, com controle de contas a pagar e receber, conciliações bancárias e relatórios gerenciais para dar mais controle, clareza e segurança à gestão.",
  },
  {
    question: "Quais relatórios são elaborados pela contabilidade?",
    answer:
      "Os demonstrativos contábeis produzidos e entregues ao cliente incluem Balancete, Demonstração do Resultado do Exercício (DRE) e Balanço Patrimonial. Conforme a necessidade e o contrato, também podem ser elaboradas a Demonstração das Mutações do Patrimônio Líquido (DMPL), a Demonstração do Valor Adicionado (DVA) e Notas Explicativas.",
  },
  {
    question: "Qual é a função da contabilidade para a minha empresa?",
    answer:
      "A contabilidade fornece informações financeiras e contábeis essenciais para a gestão, a tomada de decisão e o crescimento sustentável. Também ajuda a empresa a manter conformidade com a legislação fiscal, trabalhista e societária, com a correta apuração de impostos e o cumprimento das obrigações legais.",
  },
  {
    question: "Como o escritório atua na segurança das informações?",
    answer:
      "Utilizamos sistemas contábeis seguros, controle de acesso aos dados, rotinas de backup e práticas alinhadas à Lei Geral de Proteção de Dados (LGPD), buscando assegurar confidencialidade, integridade e proteção das informações dos clientes.",
  },
  {
    question: "Acho que pago muito imposto. Há algo que eu possa fazer?",
    answer:
      "É possível verificar o enquadramento tributário da empresa e realizar um planejamento para identificar oportunidades legais de redução de impostos. Com a análise adequada da atividade, do faturamento e das despesas, é possível avaliar o regime mais vantajoso e evitar o pagamento de tributos indevidos.",
  },
  {
    question: "Preciso emitir nota fiscal de todas as minhas vendas?",
    answer:
      "Sim. Todo processo de venda de produtos ou prestação de serviços exige emissão de nota fiscal, conforme a legislação aplicável. Nas compras de produtos, mercadorias e serviços, a nota fiscal também deve ser exigida para comprovar a aplicação dos recursos da empresa.",
  },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow--light" : ""}`}>{children}</p>;
}

function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={`button button--primary ${className}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.open(whatsappLink("Olá! Preenchi o formulário e gostaria de falar com um especialista da Valores SA."), "_blank", "noopener,noreferrer");
  };

  return (
    <main id="inicio" className="site-shell">
      <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
        <div className="nav-wrap">
          <a href="#inicio" className="brand" aria-label="Valores SA — início" onClick={closeMenu}>
            <img src="/manus-storage/valores-sa-logo_230362ff.png" alt="Valores SA Contabilidade" />
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#inicio">Início</a>
            <a href="#servicos">Soluções</a>
            <a href="#diferenciais">Diferenciais</a>
            <a href="#sobre">Sobre</a>
            <a href="/noticias">Notícias</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="nav-actions">
            <a className="nav-contact" href="#contato">Falar conosco</a>
            <button className="menu-toggle" aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>
              {isMenuOpen ? <X size={22} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? "mobile-menu--open" : ""}`} aria-hidden={!isMenuOpen}>
          <a href="#inicio" onClick={closeMenu}>Início</a>
          <a href="#servicos" onClick={closeMenu}>Soluções</a>
          <a href="#diferenciais" onClick={closeMenu}>Diferenciais</a>
          <a href="#sobre" onClick={closeMenu}>Sobre</a>
          <a href="/noticias" onClick={closeMenu}>Notícias</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a href="#contato" onClick={closeMenu}>Falar conosco</a>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />
        <div className="hero-grid container">
          <div className="hero-copy reveal">
            <Eyebrow>CONTABILIDADE CONSULTIVA</Eyebrow>
            <h1 id="hero-title">Mais que contabilidade.<br /><em>Estratégia</em> para o seu negócio.</h1>
            <p className="hero-lede">Unimos precisão contábil, gestão e tecnologia para dar clareza às decisões que movem sua empresa.</p>
            <div className="hero-actions">
              <PrimaryButton href={whatsappLink("Olá! Quero falar com um especialista da Valores SA.")}>Falar com um especialista</PrimaryButton>
              <a className="button button--text" href="#servicos">Conhecer soluções <ArrowRight size={17} /></a>
            </div>
            <div className="hero-note"><span className="live-dot" /> Atendimento consultivo para empresas que querem avançar</div>
          </div>

          <div className="hero-visual reveal reveal--delayed" aria-label="Especialistas da Valores SA analisando estratégias de negócio">
            <div className="hero-image-frame">
              <img src="/manus-storage/valores-sa-hero_9c698091.jpg" alt="Equipe de consultoria analisando informações estratégicas de uma empresa" />
            </div>
            <div className="insight-card insight-card--top">
              <span className="insight-card__icon"><BarChart3 size={18} /></span>
              <div><strong>Clareza para decidir</strong><small>Informação que vira direção</small></div>
            </div>
            <div className="insight-card insight-card--bottom">
              <span className="insight-card__icon"><ShieldCheck size={18} /></span>
              <div><strong>Base segura</strong><small>Rigor técnico e acompanhamento</small></div>
            </div>
            <div className="visual-line" />
          </div>
        </div>
      </section>

      <section className="pillars" aria-label="Pilares da Valores SA">
        <div className="container pillars-grid">
          <span>Contabilidade</span><i />
          <span>Gestão</span><i />
          <span>Estratégia</span><i />
          <span>Tecnologia</span>
        </div>
      </section>

      <section id="descomplicamos" className="section challenges" aria-labelledby="challenges-title">
        <div className="container">
          <div className="section-heading section-heading--wide">
            <div>
              <Eyebrow>DO DESAFIO À DIREÇÃO</Eyebrow>
              <h2 id="challenges-title">Descomplicamos o que <em>trava</em> o seu negócio.</h2>
            </div>
            <p>Olhar contábil, financeiro e estratégico para transformar pontos críticos da gestão em caminhos claros de evolução.</p>
          </div>

          <div className="challenge-layout">
            <div className="challenge-nav" role="tablist" aria-label="Desafios empresariais">
              {challenges.map((challenge, index) => (
                <button key={challenge.problem} role="tab" aria-selected={activeChallenge === index} className={activeChallenge === index ? "is-active" : ""} onClick={() => setActiveChallenge(index)}>
                  <span>0{index + 1}</span>{challenge.problem}<ArrowRight size={18} />
                </button>
              ))}
            </div>
            <article className="challenge-detail" aria-live="polite">
              <p className="challenge-detail__label">COMO A VALORES SA AJUDA</p>
              <h3>{challenges[activeChallenge].help}</h3>
              <div className="challenge-benefit"><Check size={18} /><span>{challenges[activeChallenge].benefit}</span></div>
              <a href="#contato" className="inline-link">Quero organizar minha empresa <ArrowRight size={17} /></a>
            </article>
          </div>
        </div>
      </section>

      <section id="servicos" className="section services" aria-labelledby="services-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>SOLUÇÕES QUE CONECTAM</Eyebrow>
              <h2 id="services-title">Uma atuação completa.<br /><em>Uma visão integrada.</em></h2>
            </div>
            <a href="#contato" className="inline-link">Encontre a solução ideal <ArrowRight size={17} /></a>
          </div>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className="service-card" key={service.title}>
                  <div className="service-card__top"><span className="service-index">0{index + 1}</span><span className="service-icon"><Icon size={22} /></span></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-benefit"><Check size={16} />{service.benefit}</div>
                  <a href={service.href} target={service.href.startsWith("http") ? "_blank" : undefined} rel={service.href.startsWith("http") ? "noreferrer" : undefined} className="service-link">Saiba mais <ArrowRight size={17} /></a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="diferenciais" className="differentials" aria-labelledby="differentials-title">
        <div className="differentials__glow" />
        <div className="container differentials__inner">
          <div className="differentials__intro">
            <Eyebrow light>POR QUE VALORES SA</Eyebrow>
            <h2 id="differentials-title">A contabilidade é a base.<br /><em>A inteligência é o diferencial.</em></h2>
            <p>Trabalhamos para que sua empresa tenha informações mais organizadas, escolhas mais seguras e um parceiro presente na evolução do negócio.</p>
            <a href={whatsappLink("Olá! Gostaria de entender como a Valores SA pode apoiar a minha empresa.")} target="_blank" rel="noreferrer" className="button button--light">Conhecer nossa abordagem <ArrowRight size={17} /></a>
          </div>
          <ol className="differential-list">
            {differentials.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowRight size={17} /></li>)}
          </ol>
        </div>
      </section>

      <section id="sobre" className="section about" aria-labelledby="about-title">
        <div className="container about-grid">
          <div className="about-image-wrap reveal">
            <img src="/manus-storage/valores-sa-about_d5d50501.jpg" alt="Equipe revisando informações e planejando a gestão empresarial" />
            <div className="about-image-caption"><span>Valores SA</span><strong>Precisão para operar.<br />Visão para avançar.</strong></div>
          </div>
          <div className="about-copy">
            <Eyebrow>SOBRE A VALORES SA</Eyebrow>
            <h2 id="about-title">Contabilidade como uma <em>ferramenta de gestão.</em></h2>
            <p>Na Valores SA, acreditamos que uma operação contábil bem conduzida deve oferecer mais do que conformidade. Ela deve trazer contexto, organização e segurança para que empresários tomem decisões melhores.</p>
            <p>Com processos digitais e atendimento próximo, simplificamos a rotina e criamos uma base confiável para o crescimento de cada negócio.</p>
            <div className="values-grid" aria-label="Princípios da Valores SA">
              {["Precisão", "Estratégia", "Tecnologia", "Proximidade", "Crescimento"].map((value) => <span key={value}>{value}</span>)}
            </div>
            <a className="inline-link" href="#contato">Converse sobre sua empresa <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section id="faq" className="section faq" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div className="faq-intro">
            <Eyebrow>DÚVIDAS FREQUENTES</Eyebrow>
            <h2 id="faq-title">Perguntas claras.<br /><em>Decisões mais tranquilas.</em></h2>
            <p>Reunimos respostas para dúvidas comuns de quem empreende, organiza ou está estruturando uma empresa.</p>
            <a href={whatsappLink("Olá! Tenho uma dúvida e gostaria de falar com a Valores SA.")} target="_blank" rel="noreferrer" className="button button--secondary">Ainda tem dúvidas? <ArrowRight size={17} /></a>
          </div>
          <div className="accordion-list">
            {faqItems.map((item, index) => (
              <details key={item.question} className="faq-item" open={index === 0}>
                <summary>{item.question}<ChevronDown size={19} /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="contact" aria-labelledby="contact-title">
        <div className="container contact-grid">
          <div className="contact-copy">
            <Eyebrow light>VAMOS CONVERSAR?</Eyebrow>
            <h2 id="contact-title">O próximo passo para uma gestão mais <em>clara</em> começa aqui.</h2>
            <p>Conte brevemente o que sua empresa precisa. Um especialista da Valores SA entrará em contato para entender o melhor caminho.</p>
            <div className="contact-direct">
              <Phone size={18} /><div><span>Atendimento via WhatsApp</span><a href={whatsappLink("Olá! Quero falar com um especialista da Valores SA.")} target="_blank" rel="noreferrer">(92) 98424-0515</a></div>
            </div>
          </div>
          <form className="contact-form" onSubmit={submitContact}>
            <div className="form-row"><label>Nome<input required name="name" placeholder="Como podemos chamar você?" /></label><label>Empresa<input name="company" placeholder="Nome da empresa (opcional)" /></label></div>
            <div className="form-row"><label>WhatsApp<input required type="tel" name="phone" placeholder="(00) 00000-0000" /></label><label>E-mail<input required type="email" name="email" placeholder="voce@empresa.com" /></label></div>
            <label>Como podemos ajudar?<select required name="need" defaultValue=""><option value="" disabled>Selecione uma opção</option><option value="contabilidade">Contratar serviços de contabilidade</option><option value="trocar">Trocar de contabilidade</option><option value="abrir">Abrir empresa</option><option value="outros">Outros</option></select></label>
            <button type="submit" className="button button--form">Falar com um especialista <ArrowRight size={17} /></button>
            <p className="form-note">Ao enviar, abriremos o WhatsApp para continuar o atendimento.</p>
            {submitted && <p className="form-success" role="status">Abrindo o WhatsApp para você.</p>}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand"><img src="/manus-storage/valores-sa-logo_230362ff.png" alt="Valores SA Contabilidade" /><p>Oferecemos soluções contábeis completas, unindo rigor técnico, organização fiscal e apoio estratégico para empresas que buscam segurança e crescimento.</p></div>
          <div><h3>Explorar</h3><a href="#servicos">Soluções</a><a href="#diferenciais">Diferenciais</a><a href="#sobre">Sobre nós</a><a href="#faq">Perguntas frequentes</a></div>
          <div><h3>Fale conosco</h3><a href="mailto:atendimento@valoressa.com.br">atendimento@valoressa.com.br</a><a href={whatsappLink("Olá! Quero falar com a Valores SA.")} target="_blank" rel="noreferrer">(92) 98424-0515</a><p>Atendimento de 08h às 19h</p></div>
          <div><h3>Institucional</h3><p>CNPJ: 49.674.254/0001-84</p><p>CRC 000939/O</p><a href="#contato">Contato</a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Valores SA Contabilidade. Todos os direitos reservados.</span><a href="#inicio">Voltar ao início <ArrowRight size={15} /></a></div>
      </footer>

      <a className="whatsapp-float" href={whatsappLink("Olá! Quero falar com um especialista da Valores SA.")} target="_blank" rel="noreferrer" aria-label="Falar com um especialista pelo WhatsApp"><WhatsappIcon /><span>Falar com um especialista</span></a>
    </main>
  );
}
