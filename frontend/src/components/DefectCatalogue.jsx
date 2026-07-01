import { useEffect, useState } from "react";
import { fetchDefectCatalogue } from "../services/api";

export default function DefectCatalogue() {
  const [catalogue, setCatalogue] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchDefectCatalogue().then(setCatalogue).catch(() => {});
  }, []);

  if (catalogue.length === 0) return null;

  return (
    <div className="catalogue">
      <button className="catalogue__toggle" onClick={() => setOpen((o) => !o)}>
        {open ? "Hide" : "View"} Defect Catalogue ({catalogue.length} categories)
      </button>
      {open && (
        <ul className="catalogue__list">
          {catalogue.map((d) => (
            <li key={d.id}>
              <strong>{d.name}</strong> — {d.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
