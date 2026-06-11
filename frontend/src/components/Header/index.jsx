export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-xl">
            📋
          </div>

          <span className="ml-3 text-2xl font-bold">
            Gerenciador de Tarefas
          </span>
        </div>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a href="#" className="mr-5 hover:text-yellow-400 transition">
            Início
          </a>

          <a href="#" className="mr-5 hover:text-yellow-400 transition">
            Tarefas
          </a>

          <a href="#" className="mr-5 hover:text-yellow-400 transition">
            Concluídas
          </a>

          <a href="#" className="mr-5 hover:text-yellow-400 transition">
            Sobre
          </a>
        </nav>

        <button className="inline-flex items-center bg-yellow-500 text-black font-semibold border-0 py-2 px-4 rounded hover:bg-yellow-400 transition mt-4 md:mt-0">
          Nova Tarefa
        </button>

      </div>
    </header>
  );
}