import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imersão Ruptura — Rapha Tarso | 1 e 2 de Agosto de 2026" },
      {
        name: "description",
        content:
          "Dois dias presenciais com Rapha Tarso para quebrar os pactos inconscientes que travam a sua prosperidade, paz e liberdade.",
      },
      { property: "og:title", content: "Imersão Ruptura — Rapha Tarso" },
      {
        property: "og:description",
        content:
          "O fim dos pactos inconscientes que travam a sua prosperidade, a sua paz e a sua liberdade.",
      },
    ],
  }),
  component: Index,
});

const CHECKOUT = "#checkout";
// TODO: substitua pelo número real — ex: https://wa.me/5511999999999
const WHATSAPP = "https://wa.me/55";
const EVENT_DATE = new Date("2026-08-01T09:00:00-03:00");

/* ---------- Hooks ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = now === null ? 0 : Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

function useNavVisible() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return visible;
}

/* ---------- Small components ---------- */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

function CTA({
  children,
  href = CHECKOUT,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a href={href} className={`btn-gold ${className}`}>
      {children}
    </a>
  );
}

function Verse({ children }: { children: React.ReactNode }) {
  return <blockquote className="verse">{children}</blockquote>;
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 mt-1"
      aria-hidden
      fill="none"
      stroke="url(#g)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F6D08A" />
          <stop offset="100%" stopColor="#C07A22" />
        </linearGradient>
      </defs>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 mt-1 text-[color:var(--ash)] opacity-50"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M6 18 18 6" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current shrink-0 ${className}`} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ---------- Sticky nav (aparece após scroll) ---------- */
function StickyNav({ visible }: { visible: boolean }) {
  return (
    <header
      aria-hidden={!visible}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        opacity: visible ? 1 : 0,
        background: "rgba(10,10,10,0.93)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(224,160,64,0.18)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-3 flex items-center justify-between gap-4">
        <img src="/logo-ruptura.png" alt="Imersão Ruptura" className="h-8 w-auto" />
        <div className="flex items-center gap-5">
          <span className="hidden sm:block text-[0.68rem] tracking-[0.2em] uppercase text-[color:var(--ash)]">
            <span className="gold-text font-semibold">1 e 2 Ago · 2026</span>
            <span className="mx-2 opacity-30">·</span>
            <span>São Paulo</span>
          </span>
          <CTA className="py-2 px-5 text-[0.72rem] tracking-[0.12em]">
            Garantir vaga →
          </CTA>
        </div>
      </div>
    </header>
  );
}

/* ---------- Botão flutuante WhatsApp ---------- */
function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tire suas dúvidas pelo WhatsApp"
      className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 z-50 flex items-center gap-2 text-white text-[0.68rem] font-semibold tracking-[0.12em] uppercase px-4 py-3 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "linear-gradient(135deg, #25D366, #1aad54)",
        borderRadius: "4px",
        boxShadow: "0 6px 28px rgba(37,211,102,0.45)",
      }}
    >
      <WhatsAppIcon />
      <span>Dúvidas?</span>
    </a>
  );
}

/* ---------- Ticker de informações do evento ---------- */
function EventTicker() {
  const items = [
    "São Paulo",
    "1 e 2 de Agosto de 2026",
    "Sábado e Domingo",
    "Vagas Limitadas",
    "Evento Presencial",
  ];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div
      className="overflow-hidden border-y border-[color:var(--gold)]/20 py-3"
      style={{ background: "rgba(246,208,138,0.04)" }}
      aria-hidden
    >
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-[0.65rem] tracking-[0.3em] uppercase"
            style={{
              color: i % 5 === 0 ? "#E0A040" : "rgba(235,218,190,0.5)",
              marginRight: "2.5rem",
            }}
          >
            {item}
            <span className="ml-2.5 opacity-25">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Página principal ---------- */
function Index() {
  useReveal();
  const { d, h, m, s } = useCountdown(EVENT_DATE);
  const navVisible = useNavVisible();

  return (
    <div className="relative min-h-screen bg-[color:var(--ink)] text-[color:var(--bone)] overflow-x-hidden">
      <StickyNav visible={navVisible} />
      <WhatsAppFloat />

      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex items-center pt-16 pb-24 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src="/rapha.jpg"
            alt=""
            aria-hidden
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover object-[60%_30%] opacity-70 lg:opacity-90 lg:object-[75%_30%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 75% 35%, transparent 0%, rgba(10,10,10,0.4) 35%, rgba(10,10,10,0.95) 75%, #0A0A0A 100%)",
            }}
          />
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.95) 100%)",
            }}
          />
          <div
            className="absolute inset-y-0 left-0 hidden lg:block lg:w-[65%]"
            style={{
              background:
                "linear-gradient(90deg, #0A0A0A 0%, rgba(10,10,10,0.95) 50%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            {/* Badge de evento presencial */}
            <div
              className="reveal inline-flex items-center gap-2.5 border border-[color:var(--gold)]/35 px-4 py-2 mb-8"
              style={{ background: "rgba(224,160,64,0.07)" }}
            >
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: "#E0A040", boxShadow: "0 0 7px #E0A040" }}
              />
              <span className="text-[0.65rem] tracking-[0.3em] uppercase font-semibold text-[color:var(--gold-light)]">
                Evento Presencial · São Paulo
              </span>
            </div>

            <div className="reveal">
              <p
                className="text-[color:var(--bone)]/80 font-[var(--font-label)]"
                style={{ letterSpacing: "0.4em", fontSize: "0.75rem", fontWeight: 500 }}
              >
                IMERSÃO
              </p>
              <div className="relative inline-block">
                <h1
                  className="gold-text leading-[0.95] mt-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(4.5rem, 17vw, 11rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  RUPTURA
                </h1>
                <span className="hero-flare" />
              </div>
            </div>

            <h2
              className="reveal mt-8 text-[color:var(--bone)] max-w-xl"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(1.35rem, 3vw, 1.85rem)",
                lineHeight: 1.25,
              }}
            >
              O fim dos pactos inconscientes que travam a sua prosperidade, a
              sua paz e a sua liberdade.
            </h2>

            <p className="reveal mt-6 text-[color:var(--ash)] max-w-xl text-[0.98rem]">
              Dois dias presenciais para quebrar as correntes invisíveis que
              mantêm você presa aos mesmos ciclos de medo, falta e ansiedade —
              e abrir caminho para a vida próspera que Deus já preparou para
              você.
            </p>

            <div className="reveal mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border border-[color:var(--gold)]/40 px-4 py-3 text-[0.72rem] tracking-[0.18em] uppercase">
              <span className="gold-text font-semibold">1 e 2 de Agosto de 2026</span>
              <span className="text-[color:var(--ash)]">·</span>
              <span className="text-[color:var(--bone)]/80">Sáb e Dom</span>
              <span className="text-[color:var(--ash)]">·</span>
              <span className="text-[color:var(--bone)]/80">São Paulo</span>
              <span className="text-[color:var(--ash)]">·</span>
              <span className="gold-text font-semibold">Vagas Limitadas</span>
            </div>

            <div className="reveal mt-8">
              <CTA>Quero romper →</CTA>
              <p className="mt-4 text-xs text-[color:var(--ash)]">
                Não é mais um evento de motivação. É um ambiente de decisão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <EventTicker />

      {/* ── COUNTDOWN ── */}
      <section className="relative py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
          <p className="eyebrow mb-10">A decisão tem prazo</p>

          <div className="inline-flex flex-wrap items-stretch justify-center gap-1.5 sm:gap-0">
            {[
              { v: d, l: "Dias" },
              { v: h, l: "Horas" },
              { v: m, l: "Min" },
              { v: s, l: "Seg" },
            ].map((x, i) => (
              <div key={x.l} className="flex items-stretch">
                <div
                  className="flex flex-col items-center justify-center w-[74px] sm:w-[112px] py-5 sm:py-8"
                  style={{
                    background: "rgba(246,208,138,0.05)",
                    border: "1px solid rgba(224,160,64,0.22)",
                  }}
                >
                  <span
                    className="gold-text tabular-nums"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(2.5rem, 8vw, 4.8rem)",
                      lineHeight: 1,
                    }}
                  >
                    {String(x.v).padStart(2, "0")}
                  </span>
                  <span className="mt-2 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.25em] text-[color:var(--ash)]">
                    {x.l}
                  </span>
                </div>
                {i < 3 && (
                  <div className="hidden sm:flex items-center justify-center w-8">
                    <span
                      className="gold-text"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "3rem",
                        lineHeight: 1,
                        opacity: 0.45,
                      }}
                    >
                      :
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-[0.78rem] text-[color:var(--ash)] tracking-[0.18em] uppercase">
            1 de agosto de 2026 · São Paulo
          </p>
          <div className="mt-8">
            <CTA>Garantir minha vaga agora →</CTA>
          </div>
        </div>
      </section>

      {/* ── A DOR ── */}
      <Section eyebrow="O cansaço" title="Existe um momento em que a mulher se cansa.">
        <p>
          Cansa de trabalhar muito e o dinheiro nunca sobrar. Cansa de fazer
          as contas e sentir que, se gastar com uma coisa, vai faltar para a
          outra. Cansa de orar, se esforçar, prometer que agora vai ser
          diferente — e perceber que os mesmos padrões continuam se repetindo.
        </p>
        <p>
          Cansa de viver no medo. Na ansiedade que aperta o peito sem hora
          marcada. Na procrastinação que adia o que mais importa. Na
          insegurança que faz duvidar de si mesma. Na sensação de falta que
          contamina tudo.
        </p>
        <p>
          Você quer prosperar, mas sempre aparece uma trava. Você quer viver
          leve, mas carrega pesos que nem sabe explicar.
        </p>
        <p>
          E o mais cruel é isto:{" "}
          <span className="gold-text font-semibold">não é falta de esforço.</span>{" "}
          Você já se esforçou. Já tentou. Já chorou pedindo a Deus uma virada.{" "}
          <span className="gold-text font-semibold">Então por que não muda?</span>
        </p>
      </Section>

      {/* ── A CAUSA ── */}
      <Section
        eyebrow="O que ninguém te mostrou"
        title="A sua maior prisão não está no que você vê."
      >
        <p>
          Existem pactos inconscientes formados a partir de dores, traumas,
          perdas e crenças antigas. Você não os fez de forma consciente — mas,
          em algum momento, a sua alma aprendeu a sobreviver sendo fiel à dor.
          Fiel ao medo. Fiel à escassez. Fiel a uma versão de você que nasceu
          para te proteger, mas que hoje impede você de receber.
        </p>
        <p>
          É por isso que a prosperidade não chega. Que a paz não fica. Que a
          oportunidade passa ao lado e não para. Esses pactos criam correntes
          invisíveis — padrões que se repetem nas suas finanças, nas suas
          decisões e na forma como você recebe (ou não recebe) o que Deus tem
          para você.
        </p>
        <p>
          Você não está quebrada. Você está presa a acordos que nunca assinou
          conscientemente.
        </p>

        <div className="reveal mt-14 mb-2 text-center">
          <p
            className="gold-text mx-auto max-w-3xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
              lineHeight: 1.2,
              fontStyle: "italic",
            }}
          >
            "E ninguém quebra uma corrente que não consegue enxergar."
          </p>
        </div>
      </Section>

      {/* ── O MECANISMO ── */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="reveal text-center max-w-2xl mx-auto mb-14">
            <Eyebrow>Entenda o que te prende</Eyebrow>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Pactos Inconscientes",
                d: "Alianças internas formadas na dor, no trauma ou na escassez. Fazem você continuar fiel a padrões que te ferem, mesmo sem perceber.",
              },
              {
                t: "Correntes Invisíveis",
                d: "Os efeitos práticos: bloqueios financeiros, autossabotagem, medo, ansiedade, procrastinação e a sensação de estar sempre no mesmo lugar.",
              },
              {
                t: "Ruptura",
                d: "O momento em que você identifica a raiz, quebra o pacto e deixa de repetir os ciclos antigos, para acessar uma nova identidade.",
              },
            ].map((c, i) => (
              <article
                key={c.t}
                className="reveal relative bg-[color:var(--ink-warm)]/60 border border-[color:var(--gold)]/30 p-7 sm:p-8 transition-all duration-300 hover:border-[color:var(--gold)]/60 hover:bg-[color:var(--ink-warm)]/90"
              >
                <span
                  className="absolute top-5 right-6 text-xs font-mono tracking-widest gold-text"
                  aria-hidden
                >
                  0{i + 1}
                </span>
                <h3
                  className="gold-text"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem" }}
                >
                  {c.t}
                </h3>
                <hr className="gold-rule my-4" />
                <p className="text-[color:var(--bone)]/85 text-[0.95rem]">{c.d}</p>
              </article>
            ))}
          </div>

          <div className="reveal mt-14 max-w-3xl mx-auto">
            <Verse>"O jugo será despedaçado por causa da unção." — Isaías 10:27</Verse>
          </div>
        </div>
      </section>

      {/* ── O DEPOIS ── */}
      <Section
        eyebrow="O que começa depois da ruptura"
        title="Existe um tipo de vida que só começa depois que você rompe."
      >
        <p>
          Imagine acordar e não ser mais governada pelo medo. O dinheiro
          deixando de ser um campo de guerra. Fazer as contas sem aquele
          aperto. Poder cuidar de quem você ama, viajar, respirar — sem a
          conta do mês decidindo o tamanho da sua paz.
        </p>
        <p>
          Imagine a sua fé deixando de ser esforço e passando a ser direção.
          Olhar no espelho e reconhecer alguém livre e próspera em todas as
          áreas.
        </p>
        <p>
          Isso não é fantasia. É o que acontece quando uma corrente se rompe
          pela raiz — e não pela superfície.
        </p>
        <div className="reveal mt-10">
          <Verse>
            "Se o Filho vos libertar, verdadeiramente sereis livres." — João 8:36
          </Verse>
        </div>
      </Section>

      {/* ── JORNADA — 2 DIAS ── */}
      <section className="relative py-20 sm:py-28 flare-bg">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="reveal text-center mb-14">
            <Eyebrow>Dois dias. Duas etapas. Uma ruptura.</Eyebrow>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                day: "Dia 1",
                title: "Revelação e Confronto",
                body: "O dia em que o invisível se torna visível. Você vai enxergar os pactos que fez sem saber, mapear as correntes que se repetem e encontrar a raiz — não os sintomas.",
                verse: ""Conhecereis a verdade, e a verdade vos libertará." — João 8:32",
              },
              {
                day: "Dia 2",
                title: "Quebra e Nova Identidade",
                body: "O dia da ruptura. Você quebra o pacto na raiz e dá o primeiro passo para fora do ciclo — para nascer na identidade próspera que estava presa do outro lado da corrente.",
                verse: ""Se alguém está em Cristo, nova criatura é." — 2 Coríntios 5:17",
              },
            ].map((d) => (
              <article
                key={d.day}
                className="reveal relative border border-[color:var(--gold)]/30 bg-[color:var(--ink-warm)]/60 p-8 sm:p-10 transition-all duration-300 hover:border-[color:var(--gold)]/55"
              >
                <p className="eyebrow">{d.day}</p>
                <h3
                  className="mt-3 text-[color:var(--bone)]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)",
                  }}
                >
                  {d.title}
                </h3>
                <hr className="gold-rule my-5" />
                <p className="text-[color:var(--bone)]/85">{d.body}</p>
                <p className="mt-6 italic text-[color:var(--gold-light)] text-sm">{d.verse}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── RAPHA TARSO ── */}
      <section className="relative py-24 sm:py-32 border-t border-[color:var(--gold)]/15">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-center">
            {/* Foto */}
            <div className="reveal relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden">
                <img
                  src="/rapha.jpg"
                  alt="Rapha Tarso"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.85) 100%), radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.55) 100%)",
                  }}
                />
                <div className="absolute inset-0 ring-1 ring-[color:var(--gold)]/30" />
              </div>
              {/* Linha dourada decorativa */}
              <div
                className="absolute -bottom-4 left-0 right-0 mx-auto max-w-md h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(224,160,64,0.55), transparent)",
                }}
              />
            </div>

            {/* Bio */}
            <div className="reveal order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/logo-ruptura.png"
                  alt="Imersão Ruptura"
                  loading="lazy"
                  className="h-12 w-auto opacity-95"
                />
              </div>

              <Eyebrow>Quem conduz a jornada</Eyebrow>
              <h2
                className="gold-text mt-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                Rapha Tarso
              </h2>
              <hr className="gold-rule my-6" />
              <p className="text-[color:var(--bone)]/85">
                Terapeuta, mentor e comunicador cristão. Há anos conduz pessoas a
                romper os bloqueios que travam o desenvolvimento integral —
                espírito, alma e corpo — a partir de uma tese simples e
                implacável:{" "}
                <span className="gold-text font-semibold">
                  ninguém trava por falta de vontade. Trava por falta de
                  alinhamento interno.
                </span>{" "}
                Quando há convergência, nasce o extraordinário.
              </p>

              <div className="mt-10 border-l-2 border-[color:var(--gold)]/40 pl-5">
                <p className="eyebrow">Valéria Tarso</p>
                <p className="mt-2 text-[color:var(--bone)]/80 text-[0.95rem]">
                  Conduz os atendimentos terapêuticos do ecossistema, sustentando
                  o cuidado profundo que transforma revelação em ruptura real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARA QUEM É ── */}
      <section className="relative py-20 sm:py-28 border-t border-[color:var(--gold)]/15">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="reveal text-center mb-14">
            <Eyebrow>Veja se faz sentido para você</Eyebrow>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="reveal border border-[color:var(--gold)]/30 p-8 bg-[color:var(--ink-warm)]/50">
              <h3
                className="gold-text mb-6"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem" }}
              >
                É para você se…
              </h3>
              <ul className="space-y-4 text-[color:var(--bone)]/85 text-[0.95rem]">
                {[
                  "Você trabalha muito e a prosperidade nunca chega — e não entende por quê.",
                  "Você vive repetindo os mesmos ciclos de medo, ansiedade e falta.",
                  "Você já tentou de tudo e mesmo assim volta ao mesmo lugar.",
                  "Você carrega feridas que ainda governam as suas decisões e o seu bolso.",
                  "Você está cansada de sobreviver e decidida a prosperar em tudo — no emocional, no financeiro e no espiritual.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckIcon />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal border border-[color:var(--ash)]/20 p-8">
              <h3
                className="text-[color:var(--ash)] mb-6"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.6rem" }}
              >
                Não é para você se…
              </h3>
              <ul className="space-y-4 text-[color:var(--ash)] text-[0.95rem]">
                {[
                  "Você só procura mais uma palestra bonita para se sentir bem por dois dias.",
                  "Você quer mudar sem se confrontar.",
                  "Você prefere a segurança da prisão conhecida ao risco da liberdade.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <XIcon />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── O QUE VOCÊ RECEBE + INGRESSOS ── */}
      <section
        id="checkout"
        className="relative py-24 sm:py-32 border-t border-[color:var(--gold)]/15 flare-bg scroll-mt-10"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-14">
            <Eyebrow>Dois dias que podem encerrar ciclos de décadas</Eyebrow>
            <h2
              className="mt-5 text-[color:var(--bone)]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 3rem)",
              }}
            >
              O que você recebe
            </h2>
          </div>

          <ul className="reveal grid gap-4 md:grid-cols-2 max-w-4xl mx-auto mb-20">
            {[
              "Imersão presencial de 2 dias — a jornada completa de revelação, confronto e ruptura.",
              "Condução terapêutica e espiritual ao vivo, na sala, com Rapha e Valéria Tarso.",
              "Método de identificação dos pactos inconscientes — você sai sabendo enxergar a raiz.",
              "Ambiente de decisão coletiva — a força de romper cercada de pessoas vivendo o mesmo movimento.",
              "[Bônus 1]",
              "[Bônus 2]",
            ].map((t) => (
              <li
                key={t}
                className="flex gap-3 border border-[color:var(--gold)]/20 bg-[color:var(--ink-warm)]/40 px-5 py-4 transition-colors hover:border-[color:var(--gold)]/40"
              >
                <CheckIcon />
                <span className="text-[color:var(--bone)]/90 text-[0.95rem]">{t}</span>
              </li>
            ))}
          </ul>

          {/* Indicador de lote */}
          <div className="reveal text-center mb-10">
            <div
              className="inline-flex items-center gap-3 border border-[color:var(--gold)]/40 px-6 py-3"
              style={{ background: "rgba(224,160,64,0.07)" }}
            >
              <span
                className="block h-2 w-2 rounded-full"
                style={{ background: "#E0A040", boxShadow: "0 0 8px #E0A040" }}
              />
              <p className="text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-[color:var(--gold-light)]">
                Lote 1 — Preço especial · Vagas limitadas
              </p>
            </div>
          </div>

          {/* Cards de ingresso */}
          <div className="grid gap-6 md:grid-cols-3">
            {(
              [
                {
                  name: "Individual",
                  desc: "Sua vaga na imersão de 2 dias.",
                  original: "R$ 1.597",
                  price: "R$ 797",
                  installment: "ou em até 12x",
                  cta: "Garantir minha vaga",
                  featured: false,
                },
                {
                  name: "Dupla",
                  desc: "Sua vaga + 1 convidada.",
                  original: "R$ 1.997",
                  price: "R$ 997",
                  installment: "ou em até 12x",
                  cta: "Garantir minha vaga",
                  featured: true,
                  badge: "Mais escolhido",
                },
                {
                  name: "VIP",
                  desc: "Vaga + assento à frente + [bônus VIP].",
                  original: "R$ 2.597",
                  price: "R$ 1.297",
                  installment: "ou em até 12x",
                  cta: "Quero o VIP",
                  featured: false,
                },
              ] as Array<{
                name: string;
                desc: string;
                original: string;
                price: string;
                installment: string;
                cta: string;
                featured: boolean;
                badge?: string;
              }>
            ).map((p) => (
              <article
                key={p.name}
                className={`reveal relative bg-[color:var(--ink-warm)]/70 p-8 flex flex-col transition-all duration-300 ${
                  p.featured
                    ? "border-2 border-[color:var(--gold)] featured-pulse"
                    : "border border-[color:var(--gold)]/25 hover:border-[color:var(--gold)]/50"
                }`}
              >
                {p.featured && p.badge && (
                  <span
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 text-[0.65rem] tracking-[0.25em] uppercase font-bold whitespace-nowrap"
                    style={{
                      background: "linear-gradient(135deg, #F6D08A, #E0A040)",
                      color: "#0A0A0A",
                    }}
                  >
                    {p.badge}
                  </span>
                )}

                <p className="eyebrow">{p.name}</p>
                <p className="mt-3 text-[color:var(--bone)]/80 text-sm min-h-[3rem]">{p.desc}</p>
                <hr className="gold-rule my-5" />

                <div>
                  <p className="text-[color:var(--ash)]/70 text-sm line-through mb-1 tracking-wide">
                    {p.original}
                  </p>
                  <p
                    className="gold-text"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "2.6rem",
                      lineHeight: 1,
                    }}
                  >
                    {p.price}
                  </p>
                  <p className="mt-2 text-[0.7rem] text-[color:var(--ash)] tracking-[0.1em]">
                    {p.installment}
                  </p>
                </div>

                <div className="mt-auto pt-8">
                  <CTA className="w-full">{p.cta}</CTA>
                </div>
              </article>
            ))}
          </div>

          <div className="reveal mt-16 max-w-3xl mx-auto text-center">
            <p
              className="text-[color:var(--bone)]"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 2.3vw, 1.45rem)",
                lineHeight: 1.5,
              }}
            >
              A pergunta não é{" "}
              <span className="gold-text">"vale a pena gastar isso agora?".</span>{" "}
              É: quanto já te custou continuar presa nos mesmos ciclos? Dois dias
              podem encerrar o que vinha cobrando o seu preço há décadas — em
              dinheiro, em paz e em tempo de vida.
            </p>
          </div>
        </div>
      </section>

      {/* ── GARANTIA ── */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div
            className="reveal relative border border-[color:var(--gold)]/40 p-10 sm:p-14 text-center bg-[color:var(--ink-warm)]/40"
          >
            {/* Cantos dourados decorativos */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[color:var(--gold)]/60" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[color:var(--gold)]/60" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[color:var(--gold)]/60" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[color:var(--gold)]/60" />

            <div
              className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-[color:var(--gold)]"
              style={{
                boxShadow:
                  "0 0 30px rgba(224,160,64,0.4), inset 0 0 20px rgba(224,160,64,0.05)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#gg)"
                strokeWidth="2"
                className="h-8 w-8"
              >
                <defs>
                  <linearGradient id="gg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F6D08A" />
                    <stop offset="100%" stopColor="#C07A22" />
                  </linearGradient>
                </defs>
                <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
              </svg>
            </div>
            <h3
              className="gold-text"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              }}
            >
              O risco não é seu. É nosso.
            </h3>
            <p className="mt-5 text-[color:var(--bone)]/85">
              Compareça aos dois dias, viva o processo de ponta a ponta, e se
              ainda assim sentir que não recebeu o que prometemos, fale com a
              nossa equipe em até [X dias]. A única coisa que pedimos é que você
              apareça inteira. A ruptura faz a parte dela.
            </p>
          </div>
        </div>
      </section>

      {/* ── CHAMADO À DECISÃO ── */}
      <section className="relative py-24 sm:py-36 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(224,160,64,0.18), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <h2
            className="reveal"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 7vw, 4.2rem)",
              lineHeight: 1.05,
            }}
          >
            <span className="gold-text">Talvez este seja o momento.</span>
          </h2>
          <div className="reveal mt-8 space-y-5 text-[color:var(--bone)]/85 text-[1.02rem]">
            <p>
              Talvez este seja o momento em que você pare de repetir a mesma
              história. Em que deixe de ser fiel à dor. Em que a sua nova
              identidade — próspera, livre, em paz — comece a nascer.
            </p>
            <p>
              Em Atos 16, Paulo e Silas estavam acorrentados. E foi ali, no lugar
              mais improvável, que veio o abalo — e as correntes de todos se
              soltaram, e as portas se abriram.
            </p>
            <p className="gold-text font-semibold">
              A sua corrente também tem hora para se romper. E talvez a hora seja
              agora.
            </p>
          </div>
          <div className="reveal mt-10 max-w-xl mx-auto">
            <Verse>
              "Transformai-vos pela renovação da vossa mente." — Romanos 12:2
            </Verse>
          </div>
          <div className="reveal mt-10 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border border-[color:var(--gold)]/40 px-4 py-3 text-[0.7rem] tracking-[0.2em] uppercase">
            <span className="gold-text font-semibold">1 e 2 de Agosto de 2026</span>
            <span className="text-[color:var(--ash)]">·</span>
            <span>Sáb e Dom</span>
            <span className="text-[color:var(--ash)]">·</span>
            <span>São Paulo</span>
          </div>
          <div className="reveal mt-8">
            <CTA className="text-base px-8 py-5">Eu decido romper →</CTA>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-20 sm:py-28 border-t border-[color:var(--gold)]/15">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="reveal text-center mb-14">
            <Eyebrow>Perguntas honestas</Eyebrow>
            <h2
              className="mt-5"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
              }}
            >
              FAQ
            </h2>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "E se eu já tentei de tudo e nada funcionou?",
                a: "É exatamente para você. O que não funcionou antes mexia nos sintomas. A Ruptura vai na raiz. Você não falhou — só nunca tinha enxergado o que te prendia.",
              },
              {
                q: "Acho que já passou da minha hora / é tarde demais.",
                a: "Uma das correntes mais comuns e mais mentirosas. Não existe prazo de validade para uma ruptura. O que parece "tarde demais" costuma ser o medo disfarçado de lógica.",
              },
              {
                q: "Preciso ser cristã para participar?",
                a: "A imersão tem fundamento cristão e isso atravessa tudo. Você não precisa chegar com nada pronto. Precisa chegar disposta a olhar para dentro.",
              },
              {
                q: "E se eu me emocionar ou me expor demais?",
                a: "A sala é um ambiente seguro e conduzido. Confronto não é exposição — é cuidado. Você é guiada, não empurrada.",
              },
              {
                q: "O investimento cabe no meu momento?",
                a: "Há parcelamento. Mas a conta verdadeira é outra: continuar no mesmo ciclo também tem um preço — e ele vem sendo descontado de você há anos.",
              },
              {
                q: "Logística: horários, o que levar, alimentação, estacionamento.",
                a: "[Detalhes de logística serão enviados após a inscrição: horários completos, sugestões do que levar, opções de alimentação e estacionamento no local.]",
              },
            ].map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative border-t border-[color:var(--gold)]/25 py-16 pb-28 sm:pb-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <img
              src="/logo-ruptura.png"
              alt="Imersão Ruptura"
              className="h-16 w-auto opacity-95"
              loading="lazy"
            />
          </div>

          <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[color:var(--ash)]">
            1 e 2 de Agosto de 2026 · São Paulo
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <CTA>Quero viver a Imersão Ruptura →</CTA>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#25D366]/40 text-[#25D366] text-[0.72rem] tracking-[0.15em] uppercase font-semibold px-6 py-4 transition-all duration-300 hover:border-[#25D366]/70 hover:bg-[#25D366]/5"
            >
              <WhatsAppIcon />
              Fale pelo WhatsApp
            </a>
          </div>

          <hr className="gold-rule my-10" />
          <p
            className="mx-auto max-w-2xl text-[color:var(--bone)]/75 italic"
            style={{ fontFamily: "var(--font-display)" }}
          >
            "A ruptura começa quando você quebra os pactos inconscientes que fez
            com aquilo que um dia te feriu."
          </p>
          <p className="mt-8 text-xs text-[color:var(--ash)]">
            © 2026 Rapha Tarso · Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* ── MOBILE STICKY CTA ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden p-3 backdrop-blur-md"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.85), rgba(10,10,10,0.98))",
          borderTop: "1px solid rgba(224,160,64,0.4)",
        }}
      >
        <a href={CHECKOUT} className="btn-gold w-full">
          Quero romper →
        </a>
      </div>
    </div>
  );
}

/* ---------- Seção de texto reutilizável ---------- */
function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="reveal">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            className="mt-5 text-[color:var(--bone)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.9rem, 5vw, 3rem)",
              lineHeight: 1.15,
            }}
          >
            {title}
          </h2>
          <hr className="gold-rule mt-6 mb-8" />
        </div>
        <div className="reveal space-y-5 text-[color:var(--bone)]/85 text-[1.02rem]">
          {children}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ item ---------- */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="reveal border border-[color:var(--gold)]/25 bg-[color:var(--ink-warm)]/40 transition-colors hover:border-[color:var(--gold)]/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
        aria-expanded={open}
      >
        <span
          className="text-[color:var(--bone)] text-[0.98rem]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          {q}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="url(#fg)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F6D08A" />
              <stop offset="100%" stopColor="#C07A22" />
            </linearGradient>
          </defs>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        ref={ref}
        style={{
          maxHeight: open ? (ref.current?.scrollHeight ?? 500) + "px" : "0px",
        }}
        className="overflow-hidden transition-[max-height] duration-500 ease-out"
      >
        <div className="px-5 sm:px-6 pb-5 text-[color:var(--bone)]/80 text-[0.95rem]">{a}</div>
      </div>
    </div>
  );
}
