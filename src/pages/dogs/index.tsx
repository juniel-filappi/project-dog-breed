import { useEffect, useState } from "react";
import { list } from "../../services/breed";
import { handleError } from "../../utils/error";
import styles from "./Dogs.module.css";
import Table from "../../components/Table";
import TypeDogs from "../../components/TypeDogs";

export default function Dogs() {
  const [dogs, setDogs] = useState<string[]>([]);
  const [typeDog, setTypeDog] = useState<string>("chihuahua");
  const [loading, setLoading] = useState(false);

  const fetchDogs = async (type: string) => {
    try {
      setLoading(true);
      const dataDogs = await list(type);
      setDogs(dataDogs.list);
    } catch (error) {
      handleError(error, "Erro ao listar cachorros");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs(typeDog);
  }, [typeDog]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de cachorros</h1>
      <TypeDogs typeDog={typeDog} setTypeDog={setTypeDog}/>
      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : (
        <Table data={dogs} rowsPerPage={10} />
      )}
    </div>
  );
}
