import type { CapabilityIconName } from '@/lib/capability-icons';

/** Single-element icon via CSS mask — no Lucide svg/path subtree. */
export function CapabilityIcon({ name }: { name: CapabilityIconName }) {
  return (
    <span
      className={`capability-icon capability-card__icon capability-icon--${name}`}
      aria-hidden="true"
    />
  );
}
