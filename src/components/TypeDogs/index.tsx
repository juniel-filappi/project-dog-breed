import styles from "./TypeDogs.module.css";

interface TypeDogsProps {
  typeDog: string;
  setTypeDog: (typeDog: string) => void;
}

export default function TypeDogs({ typeDog, setTypeDog }: TypeDogsProps) {
  const typesDogs = ["chihuahua", "husky", "pug", "labrador"];
  return (
    <ul className={styles.types}>
      {typesDogs.map((type) => (
        <li key={type}>
          <button
            className={typeDog === type ? styles.active : undefined}
            onClick={() => setTypeDog(type)}
          >
            {type}
          </button>
        </li>
      ))}
    </ul>
  );
}
