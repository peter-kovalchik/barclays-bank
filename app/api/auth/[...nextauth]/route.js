import { client } from "@/utils/sanityClient";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, request) {
        const { email, password } = credentials;

        const authUser = await client.fetch(
          `*[_type == "user" && email == $email && password == $password]`,
          {
            email,
            password,
          },
        );

        // const authResponse = await fetch("/api/auth/signin", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(credentials),
        // })

        if (!authUser?.length) {
          return null;
        }

        cookies().set("currentUser", JSON.stringify(authUser[0]));

        console.log("Auth user is", authUser);

        return authUser[0];
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
