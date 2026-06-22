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
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

/* ---------- Small components ---------- */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

function GoldRule({ className = "" }: { className?: string }) {
  return <div className={`gold-rule ${className}`} />;
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

/* ---------- Page ---------- */
function Index() {
  useReveal();
  const { d, h, m, s } = useCountdown(EVENT_DATE);

  return (
    <div className="relative min-h-screen bg-[color:var(--ink)] text-[color:var(--bone)] overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center pt-16 pb-24 sm:pt-24">
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/4.jpg"
            alt=""
            aria-hidden
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover object-[60%_30%] opacity-70 lg:opacity-90 lg:object-[75%_30%]"
          />
          {/* Vignette / fuse to black */}
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
            <p className="reveal eyebrow">
              Para a mulher de fé que já tentou de tudo
            </p>

            <div className="reveal mt-8 sm:mt-10">
              <p
                className="text-[color:var(--bone)]/80 font-[var(--font-label)]"
                style={{
                  letterSpacing: "0.4em",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                }}
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
              <span className="gold-text font-semibold">
                1 e 2 de Agosto de 2026
              </span>
              <span className="text-[color:var(--ash)]">·</span>
              <span className="text-[color:var(--bone)]/80">Sáb e Dom</span>
              <span className="text-[color:var(--ash)]">·</span>
              <span className="text-[color:var(--bone)]/80">[Cidade/Local]</span>
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

      {/* COUNTDOWN */}
      <section className="relative border-y border-[color:var(--gold)]/20 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
          <p className="eyebrow">A decisão tem prazo</p>
          <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-8">
            {[
              { v: d, l: "Dias" },
              { v: h, l: "Horas" },
              { v: m, l: "Min" },
              { v: s, l: "Seg" },
            ].map((x) => (
              <div key={x.l} className="flex flex-col items-center">
                <span
                  className="gold-text tabular-nums"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(2.25rem, 8vw, 4.5rem)",
                    lineHeight: 1,
                  }}
                >
                  {String(x.v).padStart(2, "0")}
                </span>
                <span className="mt-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-[color:var(--ash)]">
                  {x.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A DOR */}
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

      {/* A CAUSA */}
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
            “E ninguém quebra uma corrente que não consegue enxergar.”
          </p>
        </div>
      </Section>

      {/* O MECANISMO */}
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
                className="reveal relative bg-[color:var(--ink-warm)]/60 border border-[color:var(--gold)]/30 p-7 sm:p-8"
              >
                <span
                  className="absolute top-5 right-6 text-xs font-mono tracking-widest gold-text"
                  aria-hidden
                >
                  0{i + 1}
                </span>
                <h3
                  className="gold-text"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                  }}
                >
                  {c.t}
                </h3>
                <hr className="gold-rule my-4" />
                <p className="text-[color:var(--bone)]/85 text-[0.95rem]">
                  {c.d}
                </p>
              </article>
            ))}
          </div>

          <div className="reveal mt-14 max-w-3xl mx-auto">
            <Verse>
              “O jugo será despedaçado por causa da unção.” — Isaías 10:27
            </Verse>
          </div>
        </div>
      </section>

      {/* O DEPOIS */}
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
            “Se o Filho vos libertar, verdadeiramente sereis livres.” — João
            8:36
          </Verse>
        </div>
      </Section>

      {/* JORNADA — 2 DIAS */}
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
                verse: "“Conhecereis a verdade, e a verdade vos libertará.” — João 8:32",
              },
              {
                day: "Dia 2",
                title: "Quebra e Nova Identidade",
                body: "O dia da ruptura. Você quebra o pacto na raiz e dá o primeiro passo para fora do ciclo — para nascer na identidade próspera que estava presa do outro lado da corrente.",
                verse: "“Se alguém está em Cristo, nova criatura é.” — 2 Coríntios 5:17",
              },
            ].map((d) => (
              <article
                key={d.day}
                className="reveal relative border border-[color:var(--gold)]/30 bg-[color:var(--ink-warm)]/60 p-8 sm:p-10"
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
                <p className="mt-6 italic text-[color:var(--gold-light)] text-sm">
                  {d.verse}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RAPHA TARSO */}
      <section className="relative py-24 sm:py-32 border-t border-[color:var(--gold)]/15">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-center">
            <div className="reveal relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden">
                <img
                  src="/4.jpg"
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
            </div>

            <div className="reveal order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/ID-Visual-Principal.png"
                  alt="Método VEX"
                  loading="lazy"
                  className="h-10 w-auto opacity-90"
                />
                <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[color:var(--ash)]">
                  Método VEX
                </span>
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
                Terapeuta, mentor e comunicador cristão. Criador do Método VEX
                (Vida Extraordinária) e do Clube Diamante. Há anos conduz
                pessoas a romper os bloqueios que travam o desenvolvimento
                integral — espírito, alma e corpo — a partir de uma tese
                simples e implacável:{" "}
                <span className="gold-text font-semibold">
                  ninguém trava por falta de vontade. Trava por falta de
                  alinhamento interno.
                </span>{" "}
                Quando há convergência, nasce o extraordinário.
              </p>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  "+ de X pessoas impactadas",
                  "X anos conduzindo transformações",
                  "Criador do Método VEX",
                  "[marco / credencial]",
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 border border-[color:var(--gold)]/20 px-4 py-3"
                  >
                    <CheckIcon />
                    <span className="text-[color:var(--bone)]/85">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-l-2 border-[color:var(--gold)]/40 pl-5">
                <p className="eyebrow">Valéria Tarso</p>
                <p className="mt-2 text-[color:var(--bone)]/80 text-[0.95rem]">
                  Conduz os atendimentos terapêuticos do ecossistema,
                  sustentando o cuidado profundo que transforma revelação em
                  ruptura real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="relative py-20 sm:py-28 border-t border-[color:var(--gold)]/15">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="reveal text-center mb-14">
            <Eyebrow>Veja se faz sentido para você</Eyebrow>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="reveal border border-[color:var(--gold)]/30 p-8 bg-[color:var(--ink-warm)]/50">
              <h3
                className="gold-text mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.6rem",
                }}
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
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1.6rem",
                }}
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

      {/* O QUE VOCÊ RECEBE + INGRESSOS */}
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
                className="flex gap-3 border border-[color:var(--gold)]/20 bg-[color:var(--ink-warm)]/40 px-5 py-4"
              >
                <CheckIcon />
                <span className="text-[color:var(--bone)]/90 text-[0.95rem]">
                  {t}
                </span>
              </li>
            ))}
          </ul>

          {/* Pricing cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Individual",
                desc: "Sua vaga na imersão de 2 dias.",
                price: "R$ 797",
                cta: "Garantir minha vaga",
                featured: false,
              },
              {
                name: "Dupla",
                desc: "Sua vaga + 1 convidada.",
                price: "R$ 997",
                cta: "Garantir minha vaga",
                featured: true,
                badge: "Mais escolhido",
              },
              {
                name: "VIP",
                desc: "Vaga + assento à frente + [bônus VIP].",
                price: "R$ [valor]",
                cta: "Quero o VIP",
                featured: false,
              },
            ].map((p) => (
              <article
                key={p.name}
                className={`reveal relative bg-[color:var(--ink-warm)]/70 p-8 flex flex-col ${
                  p.featured
                    ? "border-2 border-[color:var(--gold)] shadow-[0_0_60px_-10px_rgba(224,160,64,0.5)]"
                    : "border border-[color:var(--gold)]/25"
                }`}
              >
                {p.featured && p.badge && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[0.65rem] tracking-[0.25em] uppercase font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, #F6D08A, #E0A040)",
                      color: "#0A0A0A",
                    }}
                  >
                    {p.badge}
                  </span>
                )}
                <p className="eyebrow">{p.name}</p>
                <p className="mt-3 text-[color:var(--bone)]/80 text-sm min-h-[3rem]">
                  {p.desc}
                </p>
                <hr className="gold-rule my-6" />
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
                <div className="mt-8">
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
              <span className="gold-text">
                “vale a pena gastar isso agora?”.
              </span>{" "}
              É: quanto já te custou continuar presa nos mesmos ciclos? Dois
              dias podem encerrar o que vinha cobrando o seu preço há décadas
              — em dinheiro, em paz e em tempo de vida.
            </p>
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="reveal relative border border-[color:var(--gold)]/40 p-10 sm:p-14 text-center bg-[color:var(--ink-warm)]/40">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-[color:var(--gold)] shadow-[0_0_30px_rgba(224,160,64,0.4)]">
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
              nossa equipe em até [X dias]. A única coisa que pedimos é que
              você apareça inteira. A ruptura faz a parte dela.
            </p>
          </div>
        </div>
      </section>

      {/* CHAMADO À DECISÃO */}
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
              Em Atos 16, Paulo e Silas estavam acorrentados. E foi ali, no
              lugar mais improvável, que veio o abalo — e as correntes de
              todos se soltaram, e as portas se abriram.
            </p>
            <p className="gold-text font-semibold">
              A sua corrente também tem hora para se romper. E talvez a hora
              seja agora.
            </p>
          </div>
          <div className="reveal mt-10 max-w-xl mx-auto">
            <Verse>
              “Transformai-vos pela renovação da vossa mente.” — Romanos 12:2
            </Verse>
          </div>
          <div className="reveal mt-10 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border border-[color:var(--gold)]/40 px-4 py-3 text-[0.7rem] tracking-[0.2em] uppercase">
            <span className="gold-text font-semibold">
              1 e 2 de Agosto de 2026
            </span>
            <span className="text-[color:var(--ash)]">·</span>
            <span>Sáb e Dom</span>
            <span className="text-[color:var(--ash)]">·</span>
            <span>[Cidade/Local]</span>
          </div>
          <div className="reveal mt-8">
            <CTA className="text-base px-8 py-5">Eu decido romper →</CTA>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
                a: "Uma das correntes mais comuns e mais mentirosas. Não existe prazo de validade para uma ruptura. O que parece “tarde demais” costuma ser o medo disfarçado de lógica.",
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
                a: "Há [parcelamento]. Mas a conta verdadeira é outra: continuar no mesmo ciclo também tem um preço — e ele vem sendo descontado de você há anos.",
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

      {/* FOOTER */}
      <footer className="relative border-t border-[color:var(--gold)]/25 py-16 pb-28 sm:pb-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src="/ID-Visual-Branco.png"
              alt=""
              className="h-8 w-auto opacity-80"
              loading="lazy"
            />
            <p
              className="gold-text"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.5rem",
                letterSpacing: "0.04em",
              }}
            >
              Imersão Ruptura
            </p>
          </div>
          <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[color:var(--ash)]">
            1 e 2 de Agosto de 2026 · [Cidade/Local]
          </p>
          <div className="mt-8">
            <CTA>Quero viver a Imersão Ruptura →</CTA>
          </div>
          <hr className="gold-rule my-10" />
          <p
            className="mx-auto max-w-2xl text-[color:var(--bone)]/75 italic"
            style={{ fontFamily: "var(--font-display)" }}
          >
            “A ruptura começa quando você quebra os pactos inconscientes que
            fez com aquilo que um dia te feriu.”
          </p>
          <p className="mt-8 text-xs text-[color:var(--ash)]">
            © 2026 Rapha Tarso · Método VEX · Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden p-3 backdrop-blur-md"
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

/* ---------- Reusable text Section ---------- */
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
    <div className="reveal border border-[color:var(--gold)]/25 bg-[color:var(--ink-warm)]/40">
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
          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
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
        <div className="px-5 sm:px-6 pb-5 text-[color:var(--bone)]/80 text-[0.95rem]">
          {a}
        </div>
      </div>
    </div>
  );
}
