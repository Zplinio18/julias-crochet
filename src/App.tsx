import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "./components/base/Container";
import { useProjectStore } from "./hooks/useProjectStore";
import { ProjectCounter } from "./pages/ProjectCounter";
import { CloudBackground } from "./components/templates/CloudBackground";

import welcomeImg from "./assets/images/3.png"; // Verifique se o caminho está correto
import { Sidebar } from "./components/templates/Sidebar";
import { Text } from "./components/base/Text";

function App() {
  const { projects, addProject, updateCount, resetCount, deleteProject } =
    useProjectStore();

  return (
    <BrowserRouter>
      <Container.Flex className="w-full bg-pink-50 font-exo2 md:min-h-screen">
        <Sidebar.Root
          projects={projects}
          onAddProject={addProject}
          onDeleteProject={deleteProject}
        />

        {/* Área principal Wrapper */}
        <div className="relative flex flex-1 flex-col overflow-hidden md:ml-72 md:min-h-screen">
          {/* ✅ MOVE O BACKGROUND PARA CÁ */}
          {/* Isso garante que ele cubra 100% da altura desse container, fundo do footer incluso */}
          <CloudBackground />

          {/* Adicione 'relative z-10' para o conteúdo ficar ACIMA das nuvens */}
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
                  />
                }
              />
            </Routes>
          </main>

          {/* Rodapé também precisa de z-10 para ficar clicável e visível sobre as nuvens */}
          <footer className="relative z-10 w-full py-6 text-center md:-mt-28">
            <span className="font-medium tracking-widest text-pink-300 opacity-80 transition-opacity hover:opacity-100">
              made by zplinio
            </span>
          </footer>
        </div>
      </Container.Flex>
    </BrowserRouter>
  );
}

// 2. Limpeza no WelcomeScreen:
// Removemos o CloudBackground daqui, pois ele já está no App (global)
function WelcomeScreen() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-pink-400">
      {/* CloudBackground removido daqui */}

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
