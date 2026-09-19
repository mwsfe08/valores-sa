import { ArrowRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

const whatsappLink = (message: string) =>
  `https://wa.me/559284240515?text=${encodeURIComponent(message)}`;

export function NewsHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="news-header">
      <div className="news-header__inner">
        <a href="/#inicio" className="news-brand" aria-label="Valores SA — início" onClick={close}>
          <img src="/manus-storage/valores-sa-logo_230362ff.png" alt="Valores SA Contabilidade" />
        </a>
        <nav className="news-nav" aria-label="Navegação principal">
          <a href="/">Início</a>
          <a href="/#servicos">Soluções</a>
          <a href="/#diferenciais">Diferenciais</a>
          <a href="/#sobre">Sobre</a>
          <a className="is-current" href="/noticias">Notícias</a>
          <a href="/#faq">FAQ</a>
        </nav>
        <div className="news-header__actions">
          <a className="news-header__cta" href={whatsappLink("Olá! Quero falar com um especialista da Valores SA.")} target="_blank" rel="noreferrer">Falar conosco</a>
          <button className="news-menu-button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={21} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <div className={`news-mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <a href="/" onClick={close}>Início</a>
        <a href="/#servicos" onClick={close}>Soluções</a>
        <a href="/#diferenciais" onClick={close}>Diferenciais</a>
        <a href="/#sobre" onClick={close}>Sobre</a>
        <a href="/noticias" onClick={close}>Notícias</a>
        <a href="/#faq" onClick={close}>FAQ</a>
      </div>
    </header>
  );
}

export function NewsFooter() {
  return (
    <footer className="news-footer">
      <div className="news-footer__grid">
        <div className="news-footer__brand">
          <img src="/manus-storage/valores-sa-logo_230362ff.png" alt="Valores SA Contabilidade" />
          <p>Conteúdo para apoiar empresas que buscam segurança, organização e crescimento.</p>
        </div>
        <div><h3>Explorar</h3><a href="/">Página inicial</a><a href="/#servicos">Soluções</a><a href="/#sobre">Sobre nós</a><a href="/noticias">Notícias</a></div>
        <div><h3>Fale conosco</h3><a href="mailto:atendimento@valoressa.com.br">atendimento@valoressa.com.br</a><a href={whatsappLink("Olá! Quero falar com a Valores SA.")} target="_blank" rel="noreferrer">(92) 98424-0515</a><p>Atendimento de 08h às 19h</p></div>
        <div><h3>Institucional</h3><p>CNPJ: 49.674.254/0001-84</p><p>CRC 000939/O</p><a href="/#contato">Contato</a></div>
      </div>
      <div className="news-footer__bottom"><span>© {new Date().getFullYear()} Valores SA Contabilidade. Todos os direitos reservados.</span><a href="/#inicio">Voltar ao início <ArrowRight size={15} /></a></div>
    </footer>
  );
}

export function NewsShell({ children }: { children: ReactNode }) {
  return <div className="news-shell"><NewsHeader />{children}<NewsFooter /></div>;
}

export function WhatsappFloat() {
  return <a className="whatsapp-float news-whatsapp" href={whatsappLink("Olá! Quero falar com um especialista da Valores SA.")} target="_blank" rel="noreferrer" aria-label="Falar com um especialista pelo WhatsApp"><svg className="whatsapp-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.91c0 2.1.55 4.15 1.6 5.96L.08 24l6.27-1.64a11.9 11.9 0 0 0 5.72 1.46h.01c6.56 0 11.9-5.34 11.9-11.91 0-3.18-1.24-6.16-3.46-8.43Zm-8.44 18.34h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.88 9.88 0 0 1-1.51-5.29C2.2 6.47 6.63 2.04 12.08 2.04c2.64 0 5.12 1.03 6.98 2.9a9.86 9.86 0 0 1 2.89 7.02c0 5.45-4.43 9.86-9.87 9.86Zm5.41-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" fill="currentColor" /></svg><span>Falar com um especialista</span></a>;
}
