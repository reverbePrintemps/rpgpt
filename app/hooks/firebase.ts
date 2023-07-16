import { useDocument } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase/config";
import { auth } from "../firebase/config";
import { doc } from "firebase/firestore";
import { AppUser } from "../types";

export const useUserData = () => {
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
