import React from "react";
import { ProfileRelationsBoxWrapper } from "../../components/ProfileRelationsBoxWrapper";

export default function ProfileRelations({ title, data = [] }) {
  const dataLimit = data.slice(0, 6);
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({data.length})
      </h2>
      <ul>
        {dataLimit.map((item) => (
          <li key={String(item.id)}>
            <a href={`https://github.com/${item.login}`} target={"_blank"}>
              <img
                src={`https://github.com/${item.login}.png`}
                alt={item.login}
              />
              <span>{item.login}</span>
            </a>
          </li>
        ))}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}
