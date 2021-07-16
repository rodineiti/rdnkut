import React from "react";
import { ProfileRelationsBoxWrapper } from "../../components/ProfileRelationsBoxWrapper";

export default function Communities({ title, data = [] }) {
  const dataLimit = data.slice(0, 6);
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({data.length})
      </h2>
      <ul>
        {dataLimit.map((item) => (
          <li key={String(item.id)}>
            <a href={`${item.link || "/"}`}>
              <img src={`${item.imageUrl}`} alt={item.title} />
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}
