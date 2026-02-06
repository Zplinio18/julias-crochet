import { BrowserRouter, Routes, Route } from "react-router-dom"; // Removi o Navigate e empty state logic
import { Container } from "./components/base/Container";
import { Text } from "./components/base/Text";
import { useProjectStore } from "./hooks/useProjectStore";
import { ProjectCounter } from "./pages/ProjectCounter";
import { CloudBackground } from "./components/templates/CloudBackground";

import welcomeImg from "./assets/images/3.png";
import { Sidebar } from "./components/templates/Sidebar";

function App() {
  const { projects, addProject, updateCount, resetCount, deleteProject } = useProjectStore();

  return (
    <BrowserRouter>
      <Container.Flex className="w-full min-h-screen bg-pink-50 font-exo2">
        <Sidebar.Root 
          projects={projects} 
          onAddProject={addProject} 
          onDeleteProject={deleteProject}
        />

        {/* Área principal */}
        <div className="flex-1 md:ml-72 min-h-screen flex flex-col relative overflow-hidden">
          
          <main className="flex-1 flex flex-col">
            <Routes>
              {/* ROTA DA HOME: Agora sempre mostra a WelcomeScreen */}
              <Route 
                path="/" 
                element={<WelcomeScreen />} 
              />
              
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
          <footer className="w-full py-6 text-center z-20  -mt-28">
            <span className="text-pink-300 font-medium tracking-widest opacity-80 hover:opacity-100 transition-opacity">
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
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-pink-400 relative">
      
      <CloudBackground />
      
      <div className="z-10 flex flex-col items-center animate-in fade-in zoom-in duration-500">
        <img 
          src={welcomeImg} 
          alt="Gatinha tricotando" 
          className="w-72 h-72 object-contain mb-6 drop-shadow-xl hover:scale-105 transition-transform duration-500"
        />
        
        <Text.Title className="text-5xl mb-4 text-pink-600 px-6 py-2 rounded-2xl backdrop-blur-sm font-dyna">
          Bem-vinda, Julia!
        </Text.Title>
        
        <Text.Defaut className="text-xl max-w-lg text-pink-500 font-medium p-4 rounded-2xl backdrop-blur-sm leading-relaxed">
          Maia ta ansiosa pra ver o resultado! <br/>
          Selecione um projeto ao lado ou crie um novo para continuar seu crochet.
        </Text.Defaut>
        
        {/* Seta indicativa animada */}
        <div className="mt-10 flex items-center gap-2 text-pink-500 font-bold  px-4 py-2 rounded-full animate-bounce">
          <span>← Menu de Projetos</span>
        </div>
      </div>
    </div>
  );
}

export default App;