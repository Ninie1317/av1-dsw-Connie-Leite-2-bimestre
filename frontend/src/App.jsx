import { useEffect, useState } from "react";
import Header from "./components/Header";
import api from "./services/api";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      const response = await api.get("/tarefas");
      setTarefas(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Lista de Tarefas
        </h1>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="space-y-4">
            {tarefas.map((tarefa) => (
              <div
                key={tarefa.id}
                className="border rounded-lg p-4 shadow"
              >
                <h2 className="text-xl font-semibold">
                  {tarefa.title}
                </h2>

                <p className="text-gray-600">
                  {tarefa.description}
                </p>

                <p className="mt-2">
                  Status:{" "}
                  {tarefa.completed
                    ? "✅ Concluída"
                    : "⏳ Pendente"}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}