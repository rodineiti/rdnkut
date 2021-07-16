import React, { useState, useRef, useEffect } from "react";
import nookies from "nookies";
import { MainGrid, Box } from "../src/components/Home";
import ProfileSidebar from "../src/components/ProfileSidebar";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import ProfileRelations from "../src/components/ProfileRelations";
import Communities from "../src/components/Communities";
import Posts from "../src/components/Posts";
import { tokenRead } from "../src/services/datocms";

export default function Home(props) {
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const user = JSON.parse(props.currentUser);
  const [communities, setCommunities] = useState([]);
  const [posts, setPosts] = useState([]);
  const [community, setCommunity] = useState(true);
  const formRef = useRef();
  const inputRef = useRef();
  const inputRefTitle = useRef();
  const inputRefImage = useRef();
  const inputRefLink = useRef();

  useEffect(() => {
    getAllCommunities();
    getAllFeeds();
    getFollowers();
    getFollowings();
  }, []);

  async function getFollowers() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${user.username}/followers`
      );
      const json = await response.json();
      setFollowers(json);
    } catch (error) {
      alert("Não foi possível resgatar os dados");
    }
  }

  async function getFollowings() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${user.username}/following`
      );
      const json = await response.json();
      setFollowings(json);
    } catch (error) {
      alert("Não foi possível resgatar os dados");
    }
  }

  async function getAllCommunities() {
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
              allCommunities(filter: {
                username: {
                  eq: ${user.username}
                }
              }) {
                id
                title
                link
                imageUrl
                username
              } 
            }`,
        }),
      });
      const { data } = await response.json();

      setCommunities(data.allCommunities);
    } catch (error) {
      alert("Não foi possível resgatar as comunidades do datocms");
    }
  }

  async function getAllFeeds() {
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
            allFeeds(filter: {
              username: {
                eq: ${user.username}
              }
            }) {
                id
                title
                username
              } 
            }`,
        }),
      });
      const { data } = await response.json();

      setPosts(data.allFeeds);
    } catch (error) {
      alert("Não foi possível resgatar os feeds do datocms");
    }
  }

  async function createRecord(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);

      if (!formData.get("title") || formData.get("title").length === 0) {
        alert("Informe o nome da sua comunidade");
        inputRefTitle.current.focus();
        return;
      }

      if (
        !formData.get("image_url") ||
        formData.get("image_url").length === 0
      ) {
        alert("Informe o link da image da sua comunidade");
        inputRefImage.current.focus();
        return;
      }

      const form = {
        title: formData.get("title"),
        image_url: formData.get("image_url"),
        link: formData.get("link") || "",
        username: user.username,
      };

      const response = await fetch("/api/communities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const record = await response.json();

      formRef.current.reset();

      setCommunities([record.data, ...communities]);
    } catch (error) {
      alert("Não foi possível criar comunidade no datocms");
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);

      if (!formData.get("title") || formData.get("title").length === 0) {
        alert("Diga o que está pensando");
        inputRef.current.focus();
        return;
      }

      const form = {
        username: user.username,
        title: formData.get("title"),
      };

      const response = await fetch("/api/feeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const post = await response.json();

      formRef.current.reset();

      setPosts([post.data, ...posts]);
    } catch (error) {
      alert("Não foi possível criar postagem no datocms");
    }
  }

  return (
    <>
      <AlurakutMenu githubUser={user.username} />
      <MainGrid>
        <div
          className="profileArea"
          style={{
            gridArea: "profileArea",
          }}
        >
          <ProfileSidebar user={user.username} />
        </div>

        <div
          className="welcomeArea"
          style={{
            gridArea: "welcomeArea",
          }}
        >
          <Box>
            <h1 className="title">Bem vindo(a) minha rede social</h1>

            <OrkutNostalgicIconSet
              recados={1}
              fotos={8}
              fas={10}
              mensagens={2}
            />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <button
              type="button"
              style={{
                backgroundColor: "#6AB9A9",
                marginRight: "1rem",
                opacity: community ? 1 : 0.5,
              }}
              onClick={() => setCommunity(true)}
            >
              Criar comunidade
            </button>
            <button
              type="button"
              style={{
                backgroundColor: "#6AB9A9",
                opacity: community ? 0.5 : 1,
              }}
              onClick={() => setCommunity(false)}
            >
              Publicar um texto
            </button>
          </Box>

          {community ? (
            <Box>
              <form ref={formRef} onSubmit={createRecord}>
                <div>
                  <input
                    ref={inputRefTitle}
                    type="text"
                    name="title"
                    placeholder="Qual vai ser o nome da sua comunidade?"
                    aria-placeholder="Qual vai ser o nome da sua comunidade?"
                  />
                </div>
                <div>
                  <input
                    ref={inputRefImage}
                    type="text"
                    name="image_url"
                    placeholder="Qual o link da imagem da sua comunidade?"
                    aria-placeholder="Qual o link da imagem da sua comunidade?"
                  />
                </div>
                <div>
                  <input
                    ref={inputRefLink}
                    type="text"
                    name="link"
                    placeholder="Qual o link da sua comunidade?"
                    aria-placeholder="Qual o link da sua comunidade?"
                  />
                </div>
                <button type="submit" style={{ backgroundColor: "#6AB9A9" }}>
                  Criar comunidade
                </button>
              </form>
            </Box>
          ) : (
            <>
              <Box>
                <form ref={formRef} onSubmit={onSubmit}>
                  <div>
                    <input
                      ref={inputRef}
                      type="text"
                      name="title"
                      placeholder="Diga o que está pensando"
                      aria-placeholder="Diga o que está pensando"
                    />
                  </div>
                  <button type="submit" style={{ backgroundColor: "#6AB9A9" }}>
                    Publicar texto
                  </button>
                </form>
              </Box>

              <Posts data={posts} />
            </>
          )}
        </div>
        <div
          className="profileRelationsArea"
          style={{
            gridArea: "profileRelationsArea",
          }}
        >
          <Communities title={"Comunidades"} data={communities} />
          <ProfileRelations title={"Meus Seguidores"} data={followers} />
          <ProfileRelations title={"Estou seguindo"} data={followings} />
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
