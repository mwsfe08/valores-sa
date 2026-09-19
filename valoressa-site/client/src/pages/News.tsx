import { ArrowRight, CalendarDays, Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { NewsShell, WhatsappFloat } from "@/components/NewsChrome";
import { trpc } from "@/lib/trpc";

type NewsItem = {
  id: number;
  slug: string;
  title: string;
  category: string;
  imageUrl: string | null;
  publishedAt: Date;
  excerpt: string;
};

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(date));
}

function ImageBlock({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  if (item.imageUrl) return <img className={featured ? "news-card__image news-card__image--featured" : "news-card__image"} src={item.imageUrl} alt="" />;
  return <div className={`news-image-placeholder ${featured ? "news-image-placeholder--featured" : ""}`}><span>VALORES SA</span><strong>{item.category}</strong><i /></div>;
}

function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  return (
    <a className={`news-card ${featured ? "news-card--featured" : ""}`} href={`/noticias/${item.slug}`}>
      <ImageBlock item={item} featured={featured} />
      <div className="news-card__body">
        <div className="news-card__meta"><span>{item.category}</span><time dateTime={new Date(item.publishedAt).toISOString()}><CalendarDays size={14} />{formatDate(item.publishedAt)}</time></div>
        <h2>{item.title}</h2>
        <p>{item.excerpt}</p>
        <span className="news-card__link">Ler notícia <ArrowRight size={17} /></span>
      </div>
    </a>
  );
}

export default function News() {
  const { data, isLoading, isError } = trpc.news.list.useQuery();
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const news = (data ?? []) as NewsItem[];
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(news.map((item) => item.category)))], [news]);
  const filtered = useMemo(() => news.filter((item) => {
    const matchesCategory = category === "Todos" || item.category === category;
    const needle = search.trim().toLowerCase();
    return matchesCategory && (!needle || `${item.title} ${item.excerpt}`.toLowerCase().includes(needle));
  }), [category, news, search]);

  return (
    <NewsShell>
      <main>
        <section className="news-hero">
          <div className="news-hero__orb" />
          <div className="news-container news-hero__inner">
            <div>
              <p className="eyebrow">CONTEÚDOS PARA DECIDIR MELHOR</p>
              <h1>Notícias para deixar sua empresa <em>um passo à frente.</em></h1>
              <p className="news-hero__lede">Informação contábil, financeira e empresarial em uma linguagem clara, prática e conectada à realidade de quem empreende.</p>
            </div>
            <div className="news-hero__mark"><span>01</span><strong>Ideias que<br /><em>movem</em> negócios.</strong><i /></div>
          </div>
        </section>

        <section className="news-listing news-container" aria-labelledby="news-listing-title">
          <div className="news-listing__toolbar">
            <div><p className="eyebrow">ATUALIZAÇÕES DA VALORES SA</p><h2 id="news-listing-title">Conteúdos recentes</h2></div>
            <label className="news-search"><Search size={17} /><span className="sr-only">Buscar notícias</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar notícia" /></label>
          </div>
          {categories.length > 1 && <div className="news-filters" role="tablist" aria-label="Filtrar por categoria">{categories.map((item) => <button key={item} className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>}
          {isLoading && <div className="news-state"><Loader2 className="spin" size={24} /><p>Carregando conteúdos…</p></div>}
          {isError && <div className="news-state"><p>Não foi possível carregar as notícias agora. Tente novamente em instantes.</p></div>}
          {!isLoading && !isError && filtered.length > 0 && <div className="news-grid">{filtered.map((item, index) => <NewsCard key={item.id} item={item} featured={index === 0} />)}</div>}
          {!isLoading && !isError && filtered.length === 0 && <div className="news-empty"><span className="news-empty__number">01</span><div><p className="eyebrow">EM BREVE</p><h3>{news.length === 0 ? "Estamos preparando novos conteúdos." : "Nenhuma notícia encontrada."}</h3><p>{news.length === 0 ? "Assim que uma nova notícia for publicada, ela aparecerá automaticamente nesta página." : "Tente outra busca ou selecione uma categoria diferente."}</p>{news.length === 0 && <a href="/#contato" className="inline-link">Fale com a Valores SA <ArrowRight size={17} /></a>}</div></div>}
        </section>
      </main>
      <WhatsappFloat />
    </NewsShell>
  );
}
