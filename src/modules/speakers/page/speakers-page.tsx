import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import ProfileForm from "../../../components/form/form";
import React from "react";
import { Button } from "../../../components/ui/button";
import { SearchIcon, X } from "lucide-react";
import { Input } from "../../../components/ui/input";
import CustomList from "../../../components/customList/customList";

const SpeakersPage = ()=>{
    const URL_API = import.meta.env.VITE_URL_API;
    
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [list, setList] = useState([]);
    const [listSuggestions, setListSuggestions] = useState([]);
  
    const handleSearchClick = () => {
      setIsSearchActive(true);
    };
  
    const handleCloseSearch = () => {
      setIsSearchActive(false);
    };
  
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value;
      if (search !== "") {
        const filteredSuggestions = list?.filter((item: { name: string }) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
  
        setListSuggestions(filteredSuggestions);
      } else {
        setListSuggestions(list);
      }
    };
  
    function fetchMembers() {
      axios.get(`${URL_API}/speakers`).then((res) => {
        setListSuggestions(res.data);
        setList(res.data);
      });
    }
    useEffect(() => {
      fetchMembers();
    }, []);
  
    const handleNewMemberAdded = () => {
      fetchMembers();
    };
    return(
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
                {isSearchActive && (
                  <div className="flex items-center w-full">
                    <div className="flex-grow">
                      <Input
                        type="text"
                        placeholder="Pesquise um nome específico..."
                        onChange={handleSearchChange}
                        className="focus-visible:ring-transparent w-full max-sm:h-12 text-sm max-sm:text-base border-2"
                      />
                    </div>
                    <div className="ml-2">
                      <Button
                        variant="outline"
                        className="hover:bg-gray-50 max-sm:h-12 border-2"
                        onClick={handleCloseSearch}
                      >
                        <X className="h-6 w-6 text-slate-700" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
  
              <CustomList data={listSuggestions} />
            </section>
          </div>
        </main>
      </body>
    )
}

export default SpeakersPage