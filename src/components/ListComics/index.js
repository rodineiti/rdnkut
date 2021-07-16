import React from "react";
import Link from "next/link";
import { ProfileRelationsBoxWrapper } from "../../components/ProfileRelationsBoxWrapper";

export default function ListComics({
  title = "Minha Galeria de Fotos",
  data = [],
}) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({data.length})
      </h2>
      <ul>
        {data.map((item) => (
          <li key={String(item.id)}>
            <Link href={`/show?pid=${item.id}`}>
              <a>
                <img src={`${item.cover.url}`} alt={item.title} />
                <span>{item.title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}
