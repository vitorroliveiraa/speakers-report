import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import CustomList from "./components/customList/customList.tsx";
import ProfileForm from "./components/form/form.tsx";
import { Input } from "./components/ui/input.tsx";
import { Search as SearchIcon } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "./components/ui/button.tsx";
import axios from "axios";

function App() {
  // Estado para controlar se o campo de pesquisa está visível
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState();

  // Função para abrir o input de pesquisa
  const handleSearchClick = () => {
    setIsSearchActive(true); // Mostra o input
  };

  // Função para fechar o input de pesquisa
  const handleCloseSearch = () => {
    setIsSearchActive(false); // Esconde o input
    setSearchTerm(""); // Limpa o campo de pesquisa
  };

  // Função para capturar o valor digitado no input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  function fetchMembers() {
    axios
      .get("http://localhost:3333/speakers")
      .then((res) => setList(res.data));
  }
  useEffect(() => {
    fetchMembers();
  }, []);

  const handleNewMemberAdded = () => {
    // Atualiza a lista após a inserção de um novo membro
    fetchMembers();
  };

  return (
    <body className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 sm:py-4 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <ProfileForm onMemberAdded={handleNewMemberAdded} />
          <section>
            <div className="h-12 mt-12 mb-4 flex justify-between items-center transition-all duration-500">
              <div className="content-center">
                {!isSearchActive && (
                  <label className="text-lg max-sm:font-medium ml-4 text-slate-700">
                    Baixa recorrência:
                  </label>
                )}
              </div>

              {/* Se a pesquisa não estiver ativa, exibe o ícone de pesquisa */}
              {!isSearchActive && (
                <div className="transition-opacity duration-500 ease-in-out opacity-100">
                  <Button
                    variant="secondary"
                    className="bg-transparent hover:bg-slate-100"
                    onClick={handleSearchClick}
                  >
                    <SearchIcon className="h-6 w-6 text-slate-700" />
                  </Button>
                </div>
              )}
              {/* Se a pesquisa estiver ativa, exibe o input com o botão de fechar ao lado */}
              {isSearchActive && (
                <div className="flex items-center w-full transition-all duration-500 ease-in-out delay-1000">
                  <div className="flex-grow">
                    <Input
                      type="text"
                      placeholder="Pesquise um nome específico..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full transition-all duration-500 max-sm:h-12 text-sm max-sm:text-base border-2"
                    />
                  </div>
                  <div className="ml-2">
                    <Button
                      variant="outline"
                      className="hover:bg-gray-50 transition-all duration-500 max-sm:h-12 border-2"
                      onClick={handleCloseSearch}
                    >
                      <X className="h-6 w-6 text-slate-700" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Exibição da lista filtrada (CustomList) */}
            <CustomList data={list} />
          </section>
        </div>
      </main>
    </body>
  );
}

export default App;
