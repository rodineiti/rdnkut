import React from "react";
import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";
import { Box } from "../../components/Home";

export default function ProfileSidebar({ user }) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${user}.png`}
        alt="Photo Profile"
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <a className="boxLink" href={`https://github.com/${user}`}>
        @{user}
      </a>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}
