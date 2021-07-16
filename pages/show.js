import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ImageGallery from "react-image-gallery";
import { AlurakutMenu } from "../src/lib/AlurakutCommons";
import { tokenRead } from "../src/services/datocms";

export default function Show() {
  const router = useRouter();
  const [listImages, setListImages] = useState([]);
  const { pid } = router.query;

  useEffect(() => {
    getComic(pid);
  }, [pid]);

  async function getComic(pid) {
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
              id: {
                eq: ${pid}
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
      const { images } = data.allComics[0];

      setListImages(
        images.map((item) => {
          return {
            original: item.url,
            thumbnail: item.url,
          };
        })
      );
    } catch (error) {
      console.log(error);
      alert("Não foi possível resgatar os dados do datocms");
    }
  }

  return (
    <>
      <AlurakutMenu githubUser={"rodinei"} />
      <div style={{ width: "100%", minHeight: "100vh" }}>
        <ImageGallery items={listImages} />
      </div>
    </>
  );
}
