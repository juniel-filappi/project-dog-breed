import { useFormik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { register } from "../services/user";
import styles from "../styles/Home.module.css";
import { handleError } from "../utils/error";
import { setCookie, destroyCookie } from "nookies";
import { useState } from "react";

const Home: NextPage = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors: { email?: string } = {};
      if (!values.email) {
        errors.email = "O campo email é obrigatório";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Endereço de email inválido";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const dataUser = await register(values.email);
        setCookie(undefined, "user", JSON.stringify(dataUser), {
          maxAge: 7 * 24 * 60 * 60, // 30 days
          path: "/",
        });
        setCookie(undefined, "token", dataUser.user.token, {
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: "/",
        });

        push("/dogs");
      } catch (error) {
        handleError(error, "Erro ao registrar usuário");
        destroyCookie(undefined, "user", { path: "/" });
        destroyCookie(undefined, "token", { path: "/" });
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Dog Breed Challange</title>
        <meta name="description" content="This is Q9 Tecnologia challange" />
        <link rel="icon" href="/icon.jpeg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem vindo ao desafio de <span>Dog Breed</span>
        </h1>

        <p className={styles.description}>
          Começe digitando o seu email no campo abaixo e clique em
          &quot;Enviar&quot;.
        </p>

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email ? (
              <div className={styles.error}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className={styles.boxButton}>
            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </main>

      <footer className={styles.footer}>
        <span>Powered by </span>
        <a href="https://github.com/juninho-dev"> Juniel Filappi</a>
      </footer>
    </div>
  );
};

export default Home;
