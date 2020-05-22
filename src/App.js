import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Lucas",
      url: "https://github.com/lucasnapomucena",
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
    // TODO
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(() => {
      setRepositories(repositories.filter((repo) => repo.id !== id));
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}{" "}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
