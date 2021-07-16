import React from "react";
import { useRouter } from "next/router";
import { useUser } from "../src/hooks/useUser";

export default function LoginScreen() {
  const router = useRouter();
  const { user, loginWithGithub } = useUser();

  async function onLogin() {
    if (!user) {
      await loginWithGithub();
    }

    router.push("/");
  }

  return (
    <main
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="/9e0d9382ce216e6087c85154337dee26.png" />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <div className="box">
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <button type="button" onClick={onLogin}>
              <img src={"/394187_github_icon.png"} alt="github" />
              Login com Github
            </button>
          </div>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 .com.br - <a href="/">Sobre o Rdnkut.br</a> -{" "}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{" "}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
