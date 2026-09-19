import { ArrowLeft, Check, ImagePlus, Loader2, Pencil, Plus, Save, Trash2, Upload, X } from "lucide-react";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type FormState = {
  id?: number;
  title: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageData?: string;
  isPublished: boolean;
};

const emptyForm = (): FormState => ({ title: "", category: "Gestão", publishedAt: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16), excerpt: "", content: "", imageUrl: "", isPublished: true });

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date));
}

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminNews() {
  const { user, loading } = useAuth({ redirectOnUnauthenticated: true });
  const [form, setForm] = useState<FormState>(emptyForm);
  const [preview, setPreview] = useState("");
  const utils = trpc.useUtils();
  const { data: items, isLoading } = trpc.news.adminList.useQuery(undefined, { enabled: user?.role === "admin" });
  const create = trpc.news.create.useMutation({ onSuccess: () => { toast.success("Notícia publicada."); utils.news.adminList.invalidate(); utils.news.list.invalidate(); resetForm(); } });
  const update = trpc.news.update.useMutation({ onSuccess: () => { toast.success("Notícia atualizada."); utils.news.adminList.invalidate(); utils.news.list.invalidate(); resetForm(); } });
  const remove = trpc.news.remove.useMutation({ onSuccess: () => { toast.success("Notícia removida."); utils.news.adminList.invalidate(); utils.news.list.invalidate(); } });
  const busy = create.isPending || update.isPending || remove.isPending;

  function resetForm() { setForm(emptyForm()); setPreview(""); }
  function editItem(item: NonNullable<typeof items>[number]) {
    setForm({ id: item.id, title: item.title, category: item.category, publishedAt: new Date(item.publishedAt).toISOString().slice(0, 16), excerpt: item.excerpt, content: item.content, imageUrl: item.imageUrl ?? "", isPublished: item.isPublished });
    setPreview(item.imageUrl ?? "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Escolha uma imagem válida."); return; }
    if (file.size > 8 * 1024 * 1024) { toast.error("A imagem deve ter no máximo 8 MB."); return; }
    const data = await readFile(file);
    setForm((current) => ({ ...current, imageData: data, imageUrl: "" }));
    setPreview(data);
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { ...form, publishedAt: new Date(form.publishedAt), imageUrl: form.imageUrl || undefined, imageData: form.imageData };
    if (form.id) await update.mutateAsync({ ...payload, id: form.id }); else await create.mutateAsync(payload);
  }

  if (loading) return <div className="admin-loading"><Loader2 className="spin" size={25} /><p>Verificando acesso…</p></div>;
  if (!user) return null;
  if (user.role !== "admin") return <div className="admin-gate"><h1>Acesso restrito</h1><p>Somente administradores podem gerenciar as notícias.</p><button className="admin-button" onClick={() => startLogin()}>Entrar com outro usuário</button><a href="/">Voltar ao site</a></div>;

  return <div className="admin-page">
    <header className="admin-header"><a href="/" className="admin-brand"><img src="/manus-storage/valores-sa-logo_230362ff.png" alt="Valores SA" /></a><div><span className="admin-kicker">ÁREA ADMINISTRATIVA</span><strong>Gestão de notícias</strong></div><a href="/noticias" className="admin-back"><ArrowLeft size={16} /> Ver página pública</a></header>
    <main className="admin-main">
      <section className="admin-intro"><div><p className="eyebrow">CENTRAL DE CONTEÚDO</p><h1>Publique informação que <em>move</em> negócios.</h1><p>Cadastre títulos, imagens, categorias e conteúdo completo. Ao publicar, a notícia aparece automaticamente na página Notícias.</p></div><div className="admin-stat"><span>{items?.length ?? 0}</span><small>notícias cadastradas</small></div></section>
      <section className="admin-editor">
        <div className="admin-editor__heading"><div><p className="admin-label">{form.id ? "EDITAR NOTÍCIA" : "NOVA NOTÍCIA"}</p><h2>{form.id ? "Atualize o conteúdo" : "Cadastre uma notícia"}</h2></div>{form.id && <button className="admin-cancel" onClick={resetForm}><X size={16} /> Cancelar edição</button>}</div>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form__grid"><label>Título<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Ex.: Como organizar o fluxo de caixa" /></label><label>Categoria<input required value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} placeholder="Gestão, Contabilidade…" /></label></div>
          <div className="admin-form__grid"><label>Data de publicação<input required type="datetime-local" value={form.publishedAt} onChange={(event) => setForm({ ...form, publishedAt: event.target.value })} /></label><label>Imagem por URL <span>(opcional)</span><input value={form.imageUrl} onChange={(event) => { setForm({ ...form, imageUrl: event.target.value, imageData: undefined }); setPreview(event.target.value); }} placeholder="https://…" /></label></div>
          <label className="admin-upload">Imagem da notícia <span>(JPG, PNG ou WebP, até 8 MB)</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} /><span className="admin-upload__box"><Upload size={18} />Escolher imagem do computador</span></label>
          {preview && <div className="admin-image-preview"><img src={preview} alt="Pré-visualização da notícia" /><button type="button" onClick={() => { setPreview(""); setForm({ ...form, imageUrl: "", imageData: undefined }); }} aria-label="Remover imagem"><X size={16} /></button></div>}
          <label>Resumo <span>(aparece nos cards)</span><textarea required rows={3} value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} placeholder="Uma introdução curta e clara para despertar o interesse do leitor." /></label>
          <label>Conteúdo completo <span>(separe parágrafos com uma linha em branco)</span><textarea required rows={10} value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} placeholder="Escreva aqui o conteúdo completo da notícia…" /></label>
          <div className="admin-form__footer"><label className="admin-checkbox"><input type="checkbox" checked={form.isPublished} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} /><span><Check size={14} /></span>Publicar imediatamente</label><button disabled={busy} className="admin-button" type="submit">{busy ? <Loader2 className="spin" size={17} /> : form.id ? <Save size={17} /> : <Plus size={17} />}{form.id ? "Salvar alterações" : "Publicar notícia"}</button></div>
        </form>
      </section>
      <section className="admin-list"><div className="admin-list__heading"><div><p className="admin-label">BIBLIOTECA</p><h2>Notícias cadastradas</h2></div><span>{items?.length ?? 0} itens</span></div>{isLoading && <div className="admin-empty"><Loader2 className="spin" size={22} /><p>Carregando biblioteca…</p></div>}{!isLoading && items?.length === 0 && <div className="admin-empty"><ImagePlus size={25} /><p>Ainda não há notícias. Cadastre a primeira acima.</p></div>}{!isLoading && items && items.length > 0 && <div className="admin-table">{items.map((item) => <article key={item.id} className="admin-row"><div className="admin-row__thumb">{item.imageUrl ? <img src={item.imageUrl} alt="" /> : <span>{item.category.slice(0, 2).toUpperCase()}</span>}</div><div className="admin-row__content"><div><span className={`admin-status ${item.isPublished ? "is-published" : ""}`}>{item.isPublished ? "Publicado" : "Rascunho"}</span><span className="admin-row__category">{item.category}</span></div><h3>{item.title}</h3><p>{formatDate(item.publishedAt)} · {item.excerpt}</p></div><div className="admin-row__actions"><button onClick={() => editItem(item)} disabled={busy} aria-label={`Editar ${item.title}`}><Pencil size={16} /></button><button onClick={() => window.confirm("Remover esta notícia?") && remove.mutate({ id: item.id })} disabled={busy} aria-label={`Remover ${item.title}`}><Trash2 size={16} /></button></div></article>)}</div>}</section>
    </main>
  </div>;
}
