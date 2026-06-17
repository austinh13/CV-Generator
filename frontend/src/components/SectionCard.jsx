import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

// eslint-disable-next-line no-unused-vars -- Icon is rendered as a JSX tag below; the base no-unused-vars rule can't trace that without eslint-plugin-react
export default function SectionCard({ icon: Icon, title, subtitle, meta, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`section-card ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="section-card__header"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="section-card__icon">
          <Icon size={20} weight="bold" />
        </span>
        <span className="section-card__heading">
          <span className="section-card__title">{title}</span>
          {subtitle && <span className="section-card__subtitle">{subtitle}</span>}
        </span>
        {meta}
        <CaretDown size={16} weight="bold" className="section-card__chevron" />
      </button>
      <div className="section-card__body-wrap">
        <div className="section-card__body">
          <div className="section-card__body-inner">{children}</div>
        </div>
      </div>
    </div>
  );
}
