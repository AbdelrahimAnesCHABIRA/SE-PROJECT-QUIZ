import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import Archive from "./pages/Archive";
import SeeAll from "./pages/SeeAll";
import Hebergements from "./pages/Hebergements";
import Explorer from "./pages/Explorer";
import Rapports from "./pages/Rapports";
import Classes from "./pages/Classes";
import CreatePage from "./pages/createPage";
import SessionTester from "./pages/testChildSession";
import { Footer } from "./components/Layout/Footer";
import ProfilePage from "./pages/profilePage";

import i18n from './i18n/i18n';


import StatisticsPage from "./pages/Rapports";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DisplayLevels />} />
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
          <Route path="/testChild" element={<SessionTester />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/quizizz-ai"
            element={
              <div className="flex">
                <Sidebar />
                <main className="flex-1 mr-16 md:mr-64 p-5 bg-gray-50 min-h-screen">
                  <QuizizzAI />
                </main>
              </div>
            }
          />
          <Route
            path="/archive"
            element={
              <div className="flex">
                <Sidebar />
                <main className="flex-1 mr-16 md:mr-64 p-5 bg-gray-50 min-h-screen">
                  <Archive />
                </main>
              </div>
            }
          />
          <Route
            path="/create"
            element={
              <div className="flex">
                <Sidebar />
                <main className="flex-1 mr-16 md:mr-64 p-5 bg-gray-50 min-h-screen">
                  <CreatePage />
                </main>
              </div>
            }
          />
          <Route
            path="/see-all"
            element={
              <div className="flex">
                <Sidebar />
                <main className="flex-1 mr-16 md:mr-64 p-5 bg-gray-50 min-h-screen">
                  <SeeAll />
                </main>
              </div>
            }
          />
          <Route
            path="/hebergements"
            element={
              <div className="flex">
                <Sidebar />
                <main className="flex-1 mr-16 md:mr-64 p-5 bg-gray-50 min-h-screen">
                  <Hebergements />
                </main>
              </div>
            }
          />
          <Route
            path="/explorer"
            element={
              <div className="flex">
                <Sidebar />
                <main className="flex-1 mr-16 md:mr-64 p-5 bg-gray-50 min-h-screen">
                  <Explorer />
                </main>
              </div>
            }
          />
          <Route
            path="/rapports"
            element={
              <div className="flex">
                <Sidebar />
                <main className="flex-1 mr-16 md:mr-64 p-5 bg-gray-50 min-h-screen">
                  <StatisticsPage />
                </main>
              </div>
            }
          />
          <Route
            path="/classes"
            element={
              <div className="flex">
                <Sidebar />
                <main className="flex-1 mr-16 md:mr-64 p-5 bg-gray-50 min-h-screen">
                  <Classes />
                </main>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
