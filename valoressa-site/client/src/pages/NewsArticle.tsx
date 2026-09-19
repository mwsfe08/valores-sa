import { ArrowLeft, ArrowRight, CalendarDays, Loader2 } from "lucide-react";
import { useRoute } from "wouter";
import { NewsShell, WhatsappFloat } from "@/components/NewsChrome";
import { trpc } from "@/lib/trpc";

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(date));
}

export default function NewsArticle() {
  const [, params] = useRoute("/noticias/:slug");
  const { data, isLoading } = trpc.news.bySlug.useQuery({ slug: params?.slug ?? "" }, { enabled: Boolean(params?.slug) });

  return (
    <NewsShell>
      <main className="article-page">
        {isLoading && <div className="news-state article-state"><Loader2 className="spin" size={24} /><p>Carregando notícia…</p></div>}
        {!isLoading && !data && <div className="news-state article-state"><p>Esta notícia não está disponível.</p><a href="/noticias" className="inline-link">Voltar para Notícias <ArrowRight size={17} /></a></div>}
        {!isLoading && data && <article>
          <div className="news-container article__top"><a href="/noticias" className="article__back"><ArrowLeft size={17} /> Todas as notícias</a><div className="article__meta"><span>{data.category}</span><time dateTime={new Date(data.publishedAt).toISOString()}><CalendarDays size={14} />{formatDate(data.publishedAt)}</time></div><h1>{data.title}</h1><p className="article__excerpt">{data.excerpt}</p></div>
          <div className="news-container article__media">{data.imageUrl ? <img src={data.imageUrl} alt="" /> : <div className="news-image-placeholder news-image-placeholder--article"><span>VALORES SA</span><strong>{data.category}</strong><i /></div>}</div>
          <div className="news-container article__content"><div className="article__body">{data.content.split(/\n{2,}/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><aside><p className="eyebrow">VALORES SA</p><h2>Informação que vira direção.</h2><p>Converse com nosso time para entender como podemos apoiar a organização e o crescimento da sua empresa.</p><a href="/#contato" className="button button--primary">Falar com um especialista <ArrowRight size={17} /></a></aside></div>
        </article>}
      </main>
      <WhatsappFloat />
    </NewsShell>
  );
}
