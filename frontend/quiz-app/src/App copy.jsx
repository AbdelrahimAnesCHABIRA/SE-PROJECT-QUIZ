import {BrowserRouter, Routes, Route} from "react-router-dom"
import DisplayLevels from './pages/selectLevelPage';
import ModulesPage from './pages/modulesPage';
import ChaptersPage from './pages/chaptersPage';
import QuizPage from './pages/quizPage';
import QuestionsSelectionPage from './pages/selectQuestions';
import SummaryPage from "./pages/summaryPage";
import ModuleQuizzesPage from "./pages/moduleQuizzesPage";
import SignUp from "./pages/signUpPage";
import SignIn from "./pages/signInPage";
import ChooseChildPage from "./pages/chooseChildPage";
import SessionTest from "./pages/checkSession";
import ProtectedRoute from "./pages/protectedRoute";
import { Sidebar } from './components/Sidebar/Sidebar';
import QuizizzAI from "./pages/QuizizzAI";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path ='/' element= {<DisplayLevels />} />
        <Route path="/modules/:studyLevel" element={<ModulesPage />} />
        <Route path="/chapters/:module_id" element={<ChaptersPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/select-questions" element={<QuestionsSelectionPage />} />
        <Route path="/summary-page" element={<SummaryPage />} />
        <Route path="/module-quizzes/:module_id" element={<ModuleQuizzesPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chooseChild" element={<ChooseChildPage />} />
        <Route path="/test" element={<ProtectedRoute><SessionTest /></ProtectedRoute>} />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 mr-16 md:mr-64 p-5 bg-gray-50 min-h-screen">
            <Route path="/quizizz-ai" element={<QuizizzAI />} />
          </main>
        </div>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
