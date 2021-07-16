import React, { useState, useRef, useEffect } from "react";
import { AlurakutMenu } from "../src/lib/AlurakutCommons";
import { MainGrid } from "../src/components/Home";
import ListComics from "../src/components/ListComics";
import { tokenRead } from "../src/services/datocms";

export default function Galleries() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    getAllComics();
  }, []);

  async function getAllComics() {
    try {
      const response = await fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${tokenRead}`,
        },
        body: JSON.stringify({
          query: `query { 
            allComics {
              id
              title
              cover {
                id
                url
              }
              images {
                id
                url
              }
            }
          }`,
        }),
      });
      const { data } = await response.json();

      setComics(data.allComics);
    } catch (error) {
      console.log(error);
      alert("Não foi possível resgatar os dados do datocms");
    }
  }

  return (
    <>
      <AlurakutMenu githubUser={"rodinei"} />
      <MainGrid>
        <div
          className="welcomeArea"
          style={{
            gridArea: "welcomeArea",
          }}
        >
          <ListComics data={comics} />
        </div>
      </MainGrid>
    </>
  );
}
