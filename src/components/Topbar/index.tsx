import React from "react";
import { useFetchSession } from "@/hooks/useSession";
import { signIn, signOut } from "next-auth/react";
import Button from "@/components/common/Button";
import styles from "./Topbar.module.scss";
const Topbar = () => {
  let { session } = useFetchSession();
  return (
    <div className={styles.authBtn}>
      {session ? (
        <img
          onClick={() => signOut()}
          className={styles.userImage}
          src={session?.user.image as string}
        />
      ) : (
        <Button
          onClick={() => signIn()}
          btnClass="btn-primary"
          tittle="Sign up"
        />
      )}
    </div>
  );
};

export default Topbar;
