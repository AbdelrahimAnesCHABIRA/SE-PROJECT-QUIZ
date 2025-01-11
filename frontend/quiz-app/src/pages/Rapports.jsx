import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Listbox } from '@headlessui/react';

function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [modules, setModules] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch statistics
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ChildStats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    // Fetch modules
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Modules');
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchStats();
    fetchModules();
  }, []);

  useEffect(() => {
    // Fetch chapters when module is selected
    const fetchChapters = async () => {
      if (selectedModule) {
        try {
          const response = await axios.get(`http://localhost:5000/api/Chapters?module_id=${selectedModule._id}`);
          setChapters(response.data);
        } catch (error) {
          console.error('Error fetching chapters:', error);
        }
      } else {
        setChapters([]);
      }
    };

    fetchChapters();
  }, [selectedModule]);

  if (!stats) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>
  );

  const moduleData = Object.entries(stats.moduleScores).map(([name, data]) => ({
    name,
    score: data.averageScore
  }));

  const filteredQuestions = Object.entries(stats.questionStats)
    .filter(([id, data]) => {
      if (!searchQuery) return true;
      // You'll need to fetch question text from your backend
      return id.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Performance Statistics</h1>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Global Score: {stats.globalScore.toFixed(2)} | 
              Average Score: {stats.globalAverageScore.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Module Filter */}
          <div>
            <Listbox value={selectedModule} onChange={setSelectedModule}>
              <div className="relative">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
                  <span className="block truncate">
                    {selectedModule?.moduleName || 'Select Module'}
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {modules.map((module) => (
                    <Listbox.Option
                      key={module._id}
                      value={module}
                      className={({ active }) =>
                        `${active ? 'text-white bg-primary-600' : 'text-gray-900'}
                        cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                    >
                      {module.moduleName}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {/* Chapter Filter */}
          <div>
            <Listbox value={selectedChapter} onChange={setSelectedChapter}>
              <div className="relative">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
                  <span className="block truncate">
                    {selectedChapter?.chapterName || 'Select Chapter'}
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {chapters.map((chapter) => (
                    <Listbox.Option
                      key={chapter._id}
                      value={chapter}
                      className={({ active }) =>
                        `${active ? 'text-white bg-primary-600' : 'text-gray-900'}
                        cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                    >
                      {chapter.chapterName}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg shadow-md border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Module Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Question Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Question Statistics</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Question text
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Attempts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Average Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuestions.map(([id, data]) => (
                  <tr key={id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.questionText}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.totalScore.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.totalAttempts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(data.totalScore / data.totalAttempts).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;