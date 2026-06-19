function toHref(value, kind) {
    if (!value) return "";
    if (value.startsWith("http://") || value.startsWith("https://")) return value;
    if (kind === "email") return `mailto:${value}`;
    return `https://${value.replace(/^\/+/, "")}`;
}

export default function GeneralCV({ data }) {
    const hasName = Boolean(data?.name);

    const contactItems = [
        data?.number ? { label: data.number } : null,
        data?.email ? { label: data.email, href: toHref(data.email, "email") } : null,
        data?.location ? { label: data.location } : null,
        data?.linkedin ? { label: data.linkedin.replace(/^https?:\/\//, ""), href: toHref(data.linkedin) } : null,
        data?.github ? { label: data.github.replace(/^https?:\/\//, ""), href: toHref(data.github) } : null,
    ].filter(Boolean);

    return (
        <div className="resume-header">
            <h1 className={`resume-name ${hasName ? "" : "is-placeholder"}`}>
                {hasName ? data.name : "Your Name"}
            </h1>

            {contactItems.length > 0 ? (
                <p className="resume-contact">
                    {contactItems.map((item, i) => (
                        <span key={i}>
                            {i > 0 && <span className="resume-contact-sep">|</span>}
                            {item.href ? (
                                <a href={item.href} target="_blank" rel="noreferrer">{item.label}</a>
                            ) : (
                                item.label
                            )}
                        </span>
                    ))}
                </p>
            ) : (
                <p className="resume-hint">Add your contact details on the left.</p>
            )}
        </div>
    )
}
