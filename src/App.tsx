import { BrowserRouter, Routes, Route } from "react-router-dom"; // Removi o Navigate e empty state logic
import { Container } from "./components/base/Container";
import { Text } from "./components/base/Text";
import { useProjectStore } from "./hooks/useProjectStore";
import { ProjectCounter } from "./pages/ProjectCounter";
import { CloudBackground } from "./components/templates/CloudBackground";

import welcomeImg from "./assets/images/3.png";
import { Sidebar } from "./components/templates/Sidebar";

function App() {
  const { projects, addProject, updateCount, resetCount, deleteProject } =
    useProjectStore();

  return (
    <BrowserRouter>
      <Container.Flex className="min-h-screen w-full bg-pink-50 font-exo2">
        <Sidebar.Root
          projects={projects}
          onAddProject={addProject}
          onDeleteProject={deleteProject}
        />

        {/* Área principal */}
        <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden md:ml-72">
          <main className="flex flex-1 flex-col">
            <Routes>
              {/* ROTA DA HOME: Agora sempre mostra a WelcomeScreen */}
              <Route path="/" element={<WelcomeScreen />} />

              <Route
                path="/project/:id"
                element={
                  <ProjectCounter
                    projects={projects}
                    updateCount={updateCount}
                    resetCount={resetCount}
                  />
                }
              />
            </Routes>
          </main>

          {/* Rodapé */}
          <footer className="z-20 w-full py-6 text-center md:-mt-28">
            <span className="font-medium tracking-widest text-pink-300 opacity-80 transition-opacity hover:opacity-100">
              made by zplinio
            </span>
          </footer>
        </div>
      </Container.Flex>
    </BrowserRouter>
  );
}

// Renomeei de EmptyState para WelcomeScreen e ajustei o texto
function WelcomeScreen() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center p-8 text-center text-pink-400">
      <CloudBackground />

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

        {/* Seta indicativa animada */}
        <div className="mt-10 flex animate-bounce items-center gap-2 rounded-full px-4 py-2 font-bold text-pink-500">
          <span>← Menu de Projetos</span>
        </div>
      </div>
    </div>
  );
}

export default App;
