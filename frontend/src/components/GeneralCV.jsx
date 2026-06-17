import { Envelope, Phone, MapPin } from "@phosphor-icons/react";

export default function GeneralCV({ data }) {
    const hasName = Boolean(data?.name);
    const hasContact = Boolean(data?.email || data?.number || data?.location);

    return (
        <div className="resume-header">
            <h1 className={`resume-name ${hasName ? "" : "is-placeholder"}`}>
                {hasName ? data.name : "Your Name"}
            </h1>

            {hasContact ? (
                <div className="resume-contact">
                    {data.email && (
                        <span className="resume-contact-item">
                            <Envelope size={15} weight="bold" />
                            {data.email}
                        </span>
                    )}
                    {data.number && (
                        <span className="resume-contact-item">
                            <Phone size={15} weight="bold" />
                            {data.number}
                        </span>
                    )}
                    {data.location && (
                        <span className="resume-contact-item">
                            <MapPin size={15} weight="bold" />
                            {data.location}
                        </span>
                    )}
                </div>
            ) : (
                <p className="resume-hint">Add your contact details on the left, they'll show up here.</p>
            )}
        </div>
    )
}
