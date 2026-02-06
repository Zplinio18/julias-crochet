import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plus, Trash2, Menu, X } from "lucide-react";

// Import da imagem vazia
import emptySidebarImg from "../../../assets/images/2.png";
import type { Project } from "../../../hooks/useProjectStore";
import { Container } from "../../base/Container";
import { Text } from "../../base/Text";
import { Dialog } from "../Dialog";

interface SidebarProps {
  projects: Project[];
  // Atualizei aqui: Agora esperamos que a função retorne uma string (o ID do projeto)
  onAddProject: (name: string, emoji: string) => string; 
  onDeleteProject: (id: string) => void;
}

export function SidebarRoot({ projects, onAddProject, onDeleteProject }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; name: string } | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleCreateSubmit = (name: string, emoji: string) => {
    // 1. Cria o projeto e captura o ID retornado
    const newProjectId = onAddProject(name, emoji);
    
    // 2. Fecha a sidebar (no mobile)
    setIsSidebarOpen(false);
    
    // 3. Redireciona imediatamente para a página do novo projeto
    navigate(`/project/${newProjectId}`);
  };

  const requestDelete = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    e.preventDefault();
    setProjectToDelete({ id: project.id, name: project.name });
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      onDeleteProject(projectToDelete.id);
      if (location.pathname === `/project/${projectToDelete.id}`) {
        navigate("/");
      }
      setProjectToDelete(null);
    }
  };

  return (
    <>
      {/* Botão Mobile */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md text-pink-500 md:hidden"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Container.Flex 
        className={`fixed inset-y-0 left-0 z-40 w-72 flex-col bg-white border-r border-pink-100 transform transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <Text.Title className="text-3xl text-pink-500 mb-8 text-center font-dyna">
             Júlia's Crochet
          </Text.Title>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                onClick={() => setIsSidebarOpen(false)}
                className={`group relative flex items-center justify-between p-3 rounded-xl transition-all border border-transparent ${
                  location.pathname === `/project/${project.id}`
                    ? "bg-pink-100 text-pink-600 font-bold border-pink-200"
                    : "hover:bg-pink-50 text-gray-600 hover:border-pink-100"
                }`}
              >
                <span className="truncate flex gap-3 items-center">
                  <span className="text-xl">{project.emoji}</span>
                  <span className="truncate">{project.name}</span>
                </span>
                
                <button 
                  onClick={(e) => requestDelete(e, project)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                  title="Apagar projeto"
                >
                  <Trash2 size={18} />
                </button>
              </Link>
            ))}
            
            {projects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 opacity-70">
                <img 
                  src={emptySidebarImg} 
                  alt="Sem projetos" 
                  className="w-32 h-32 object-contain mb-2 opacity-80" 
                />
                <Text.Defaut className="text-sm text-gray-400 text-center px-4">
                  Ainda não tens projetos...<br/>A gatinha está à espera!
                </Text.Defaut>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 flex items-center justify-center gap-2 w-full p-4 bg-pink-500 text-white rounded-2xl font-bold hover:bg-pink-600 transition-colors shadow-lg shadow-pink-200 active:scale-95"
          >
            <Plus size={20} /> Novo Projeto
          </button>
        </div>
      </Container.Flex>

      <Dialog.CreateProject 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSubmit={handleCreateSubmit} 
      />

      <Dialog.DeleteProject
        isOpen={!!projectToDelete}
        projectName={projectToDelete?.name || ""}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}