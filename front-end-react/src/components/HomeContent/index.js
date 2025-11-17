import styles from "@/components/HomeContent/HomeContent.module.css";
import Loading from "../Loading";
import axios from "axios";
import { useState, useEffect } from "react";
// O hook useEffect é executado toda vez que o componente é re-renderizado.

const HomeContent = () => {
  //Criando um estado para a lista de jogos
  const [games, setGames] = useState([]);

  //Criando o bloco do useEffect
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:4000/games");
        // console.log(response.data.games);
        // Atualizando o estado com os games recebidos da API
        setGames(response.data.games);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGames();
  }, [games]); // dependência do useEffect (oq ele fica observando e toda vez que tiver alteração ele refaz o código dentro dele)

  // Função de deletar
  const deleteGame = async (gameId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/games/${gameId}`
      );
      if (response.status === 204) {
        alert("Jogo deletado com sucesso!");
        // Atualizando o estado para remover o jogo deletado da lista, enquanto game for diferente do gameId deletado.
        setGames(games.filter((game) => game._id !== gameId));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={styles.homeContent}>
        {/* CARD LISTA DE JOGOS */}
        <div className={styles.listGamesCard}>
          {/* TITLE */}
          <div className={styles.title}>
            <h2>Lista de jogos</h2>
          </div>
          {/* <Loading /> */}
          <div className={styles.games} id={styles.games}>
            {games.map((game) => (
              <ul key={game._id} className={styles.listGames}>
                <div className={styles.gameImg}>
                  <img src="images/game_cd_cover.png" alt="Jogo em estoque" />
                </div>
                <div className={styles.gameInfo}>
                  <h3>{game.title}</h3>
                  <li>Plataforma: {game.description.platform}</li>
                  <li>Gênero: {game.description.genre}</li>
                  <li>Classificação: {game.description.rating}</li>
                  <li>Ano: {game.year}</li>
                  <li>
                    Preço:{" "}
                    {game.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </li>
                  {/* Botão para deletar jogo */}
                  <button className={styles.btnDel} onClick={() => {
                    const confirmed = window.confirm("Deseja mesmo excluir o jogo? ");
                    if (confirmed) {
                      deleteGame(game._id);
                    }
                  }}>Excluir</button>
                </div>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeContent;
