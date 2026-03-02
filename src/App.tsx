import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "./components/base/Container";
import { useProjectStore } from "./hooks/useProjectStore";
import { ProjectCounter } from "./pages/ProjectCounter";
import { CloudBackground } from "./components/templates/CloudBackground";

import welcomeImg from "./assets/images/3.png";
import { Sidebar } from "./components/templates/Sidebar";
import { Text } from "./components/base/Text";
import { Dialog } from "./components/templates/Dialog";

function App() {
  const {
    projects,
    addProject,
    updateCount,
    resetCount,
    deleteProject,
    editProject,
    updateProjectTime,
    updateNotes,
    isLoading,
    isSyncing,
  } = useProjectStore();

  return (
    <BrowserRouter>
      {isLoading && <Dialog.Loading />}
      <Container.Flex className="w-full bg-pink-50 font-exo2 md:min-h-screen">
        <Sidebar.Root
          projects={projects}
          onAddProject={addProject}
          onDeleteProject={deleteProject}
          onEditProject={(id, name, emoji, hasTimer, notes) => editProject(id, name, emoji, hasTimer, notes)}
        />

        <div className="relative flex flex-1 flex-col overflow-hidden md:ml-72 md:min-h-screen">
          <CloudBackground />
          <main className="relative z-10 flex flex-1 flex-col">
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route
                path="/project/:id"
                element={
                  <ProjectCounter
                    projects={projects}
                    updateCount={updateCount}
                    resetCount={resetCount}
                    updateProjectTime={updateProjectTime}
                    updateNotes={updateNotes}
                  />
                }
              />
            </Routes>
          </main>

          <footer className="relative z-10 w-full py-6 text-center">
            <span className="font-medium tracking-widest text-pink-300 opacity-80 transition-opacity hover:opacity-100">
              made by zplinio
            </span>
          </footer>

          {isSyncing && (
            <div className="animate-in fade-in slide-in-from-right-4 fixed bottom-6 right-6 z-[100] duration-500">
              <div className="flex items-center gap-2 rounded-full border border-pink-100 bg-white/60 px-4 py-2 shadow-lg backdrop-blur-md">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500"></span>
                </div>
                <span className="text-[11px] font-bold tracking-tight text-pink-600">
                  SINCRONIZANDO
                </span>
              </div>
            </div>
          )}
        </div>
      </Container.Flex>
    </BrowserRouter>
  );
}

function WelcomeScreen() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-pink-400">
      <div className="animate-in fade-in zoom-in z-10 flex flex-col items-center duration-500">
        <img
          src={welcomeImg}
          alt="Gatinha tricotando"
          className="mb-6 h-72 w-72 object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
        />

        <Text.Title className="mb-4 rounded-2xl px-6 py-2 font-dyna text-5xl text-pink-600 backdrop-blur-sm">
          Bem-vinda, Julia!
        </Text.Title>

        <Text.Defaut className="max-w-lg rounded-2xl p-4 text-xl font-medium leading-relaxed text-pink-500 backdrop-blur-sm">
          Maia ta ansiosa pra ver o resultado! <br />
          Selecione um projeto ao lado ou crie um novo para continuar seu
          crochet.
        </Text.Defaut>

        <div className="mt-10 flex animate-bounce items-center gap-2 rounded-full px-4 py-2 font-bold text-pink-500">
          <span>← Menu de Projetos</span>
        </div>
      </div>
    </div>
  );
}

export default App;
