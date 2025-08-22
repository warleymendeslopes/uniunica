'use client';
import {useEffect, useMemo, useState} from 'react';

type Props = {
  /** horário final absoluto (qualquer coisa que o `new Date()` aceite) */
  endsAt?: string | number | Date;
  /** ou, se preferir, apenas uma duração em ms (ex.: 24h) */
  durationMs?: number;
  onFinish?: () => void;
  className?: string;
};

export default function CountdownTimer({
  endsAt,
  durationMs,
  onFinish,
  className,
}: Props) {
  // calcula o alvo apenas uma vez
  const targetTs = useMemo(() => {
    if (endsAt) return new Date(endsAt).getTime();
    const dur = durationMs ?? 24 * 60 * 60 * 1000; // default: 24h
    return Date.now() + dur;
  }, [endsAt, durationMs]);

  const [msLeft, setMsLeft] = useState(() => Math.max(0, targetTs - Date.now()));

  useEffect(() => {
    const tick = () => {
      const next = Math.max(0, targetTs - Date.now());
      setMsLeft(next);
      if (next === 0 && onFinish) onFinish();
    };
    tick(); // atualiza imediatamente
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetTs, onFinish]);

  const pad = (n: number) => n.toString().padStart(2, '0');
  const days = Math.floor(msLeft / 86_400_000);
  const hours = Math.floor((msLeft % 86_400_000) / 3_600_000);
  const minutes = Math.floor((msLeft % 3_600_000) / 60_000);
  const seconds = Math.floor((msLeft % 60_000) / 1000);

  return (
    <span className={className}>
      {pad(days)}d {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
    </span>
  );
}
