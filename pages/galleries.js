import React, { useState, useEffect } from "react";
import nookies from "nookies";
import { AlurakutMenu } from "../src/lib/AlurakutCommons";
import { MainGrid } from "../src/components/Home";
import ListComics from "../src/components/ListComics";
import { tokenRead } from "../src/services/datocms";

export default function Galleries(props) {
  const user = JSON.parse(props.currentUser);
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
            allComics(filter: {
              username: {
                eq: ${user.username}
              }
            }) {
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const currentUser = cookies.CURRENT_USER;

  if (!currentUser) {
    nookies.destroy("CURRENT_USER");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentUser,
    }, // will be passed to the page component as props
  };
}
