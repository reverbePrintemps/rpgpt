import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { Auth } from "firebase/auth";
import { AppUser } from "../types";

export const useUserData = (auth: Auth) => {
  const [userDocument] = useDocument(
    doc(firestore, `users/${auth.currentUser?.uid}`)
  );
  const userDocumentData = userDocument?.data() as AppUser;

  return {
    ...userDocumentData,
    createdAt: userDocumentData?.createdAt?.toMillis(),
    uid: userDocument?.id,
  };
};
