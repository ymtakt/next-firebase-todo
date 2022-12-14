import { useState, useEffect } from "react";
import { atom, useRecoilValue, useRecoilState } from "recoil"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { app } from "../firebase"

type UserState = User | null;

export const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [setUser]);

  return user;
};

export const useUser = (): UserState => {
  return useRecoilValue(userState);
};


export const todoListState = atom({
  key: "todoList",
  default: [],
});


//todoTitle
export const todoTitleState = atom({
  key: "todoTitle",
  default: ""
});

//todoContent
export const todoContentState = atom({
  key: "todoContent",
  default: ""
});