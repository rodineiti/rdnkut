import styled from "styled-components";

export const MainGrid = styled.main`
  width: 100%;
  grid-gap: 0.625rem;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 31.25rem;

  .profileArea {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }

  @media (min-width: 860px) {
    max-width: 69.375rem;
    display: grid;
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 10rem 1fr 19.5rem;
  }
`;

export const Box = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #2e7bb4;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ecf2fa;
  }
  input {
    width: 100%;
    background-color: #f4f4f4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #ffffff;
    border-radius: 10000px;
    background-color: #6f92bb;
  }
`;

export const Card = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 48px;
    width: 48px;
    border-radius: 24px;
  }

  div {
    margin-left: 10px;

    span {
      font-size: 15px;
    }

    i {
      font-size: 11px;
      font-weight: bold;
    }

    P {
      margin-top: 10px;
    }
  }
`;
