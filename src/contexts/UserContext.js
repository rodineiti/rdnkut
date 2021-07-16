import { createContext, useState } from "react";
import nookies from "nookies";
import { firebase, auth } from "../services/firebase";

export const UserContext = createContext({});

export function UserContextProvider(props) {
  const [user, setUser] = useState();

  async function loginWithGithub() {
    try {
      const result = await auth.signInWithPopup(
        new firebase.auth.GithubAuthProvider()
      );
      if (result.additionalUserInfo) {
        const { id, login, avatar_url } = result.additionalUserInfo.profile;

        if (!login || !avatar_url) {
          throw new Error("Missing information from Github Account");
        }

        const user = {
          id,
          username: login,
          avatar_url,
        };

        setUser(user);
        nookies.set(null, "CURRENT_USER", JSON.stringify(user), {
          path: "/",
          maxAge: 86400 * 7,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, loginWithGithub }}>
      {props.children}
    </UserContext.Provider>
  );
}
