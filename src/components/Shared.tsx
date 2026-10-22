import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  ArrowUpRight,
  Compass,
  Users,
  Factory,
  Network,
  Scale,
  Landmark,
  Shield,
  KeyRound,
  Archive,
} from "lucide-react";
import type { ReactNode } from "react";
import { sources, type Ideology } from "../domain/model";
export function SourceLinks({ ids }: { ids: string[] }) {
  return (
    <span className="source-links">
      {ids.map((id) => {
        const s = sources.find((s) => s.id === id);
        return s ? (
          <a
            key={id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${s.author} · ${s.title}`}
          >
            {id}
            <ArrowUpRight size={12} />
          </a>
        ) : null;
      })}
    </span>
  );
}
export function Symbol({ item }: { item: Ideology }) {
  if (item.icon === "comm")
    return (
      <span
        className="historic-symbol"
        aria-label="Foice e martelo, símbolo histórico contextualizado"
      >
        ☭
      </span>
    );
  if (item.icon === "fasces")
    return (
      <svg
        aria-label="Fasces, ilustração documental de um feixe de varas"
        role="img"
        viewBox="0 0 32 32"
        width="26"
        height="26"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 3v26M14 3v26M18 3v26M22 3v26M8 9h16M8 23h16M22 7c10 1 10 10 0 12" />
        </g>
      </svg>
    );
  const icons: Record<string, typeof Compass> = {
    users: Users,
    factory: Factory,
    network: Network,
    scale: Scale,
    landmark: Landmark,
    shield: Shield,
    key: KeyRound,
    archive: Archive,
  };
  const Icon = icons[item.icon] ?? Compass;
  return <Icon size={24} aria-hidden />;
}
export function IdeologyBody({ item }: { item: Ideology }) {
  return (
    <>
      <div className="concept-symbol">
        <Symbol item={item} />
        <span>
          {item.icon === "archive"
            ? "Ícone editorial não oficial"
            : item.icon === "comm" || item.icon === "fasces"
              ? "Símbolo histórico, uso documental"
              : "Pictograma didático, não oficial"}
        </span>
      </div>
      <p className="lead">{item.definition}</p>
      <h3>Diferenças e aprofundamento</h3>
      <ul>
        {item.variants.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
      <p>{item.limitation}</p>
      {item.family === "historical-right" && (
        <p className="notice">
          Contexto histórico de violência e supressão de direitos. Estas
          correntes não são versões “mais liberais” da economia.
        </p>
      )}
      <h3>Fontes do conceito</h3>
      <SourceLinks ids={item.sourceIds} />
      <p className="muted">
        Revisto em 22/10/2026. A fonte apoia conceitos, não valida este
        questionário.
      </p>
    </>
  );
}
export function ConceptDialog({
  item,
  onClose,
}: {
  item: Ideology | null;
  onClose: () => void;
}) {
  return (
    <Dialog.Root
      open={!!item}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="drawer">
          <Dialog.Title>{item?.name}</Dialog.Title>
          <Dialog.Description>
            Definição, variações e fontes para leitura.
          </Dialog.Description>
          <Dialog.Close
            className="icon-button close"
            aria-label="Fechar conceito"
          >
            <X size={20} />
          </Dialog.Close>
          {item && <IdeologyBody item={item} />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function Confirm({
  trigger,
  title,
  children,
  onConfirm,
}: {
  trigger: string;
  title: string;
  children: ReactNode;
  onConfirm: () => void;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="secondary">{trigger}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="confirm panel">
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{children}</Dialog.Description>
          <div className="actions">
            <Dialog.Close asChild>
              <button className="secondary">Cancelar</button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button onClick={onConfirm}>Confirmar</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
