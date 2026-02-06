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

export function SidebarRoot({
  projects,
  onAddProject,
  onDeleteProject,
}: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

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
        className="fixed left-4 top-4 z-50 rounded-full bg-white p-2 text-pink-500 shadow-md md:hidden"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Container.Flex
        className={`fixed inset-y-0 left-0 z-40 w-72 transform flex-col border-r border-pink-100 bg-white transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <Text.Title className="mb-8 text-center font-dyna text-3xl text-pink-500">
            Julia's Crochet
          </Text.Title>

          <div className="custom-scrollbar flex-1 space-y-2 overflow-y-auto pr-2">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                onClick={() => setIsSidebarOpen(false)}
                className={`group relative flex items-center justify-between rounded-xl border border-transparent p-3 transition-all ${
                  location.pathname === `/project/${project.id}`
                    ? "border-pink-200 bg-pink-100 font-bold text-pink-600"
                    : "text-gray-600 hover:border-pink-100 hover:bg-pink-50"
                }`}
              >
                <span className="flex items-center gap-3 truncate">
                  <span className="text-xl">{project.emoji}</span>
                  <span className="truncate">{project.name}</span>
                </span>

                <button
                  onClick={(e) => requestDelete(e, project)}
                  className="rounded-lg p-2 text-gray-400 opacity-100 transition-all hover:bg-red-50 hover:text-red-500 focus:opacity-100 md:opacity-0 md:group-hover:opacity-100"
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
                  className="mb-2 h-32 w-32 object-contain opacity-80"
                />
                <Text.Defaut className="px-4 text-center text-sm text-gray-400">
                  Ainda não tem um projeto...
                  <br />A Maia ta esperando
                </Text.Defaut>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-500 p-4 font-bold text-white shadow-lg shadow-pink-200 transition-colors hover:bg-pink-600 active:scale-95"
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
