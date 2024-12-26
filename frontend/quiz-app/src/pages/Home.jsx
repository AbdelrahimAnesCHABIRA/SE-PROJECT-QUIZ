import { useEffect, useState } from 'react';

const Home = () => {
  // State to hold the modules data
  const [modules, setModules] = useState(null);


  // Fetch the modules data from the backend when the component mounts
  useEffect(() => {
    const fetchModules = async () => {
        const response = await fetch('/api/Modules');  
        const json = await response.json();
        if(response.ok){
          setModules(json);
        }
    };

    fetchModules();
  }, []);  // Empty dependency array to run once when the component mounts

  // Render the data or an error message
  return (
    <div className="App">
      <h1>Modules List</h1>
      {modules &&
  modules.map((module, index) => (
    <p key={module._id || index}>
      {index} {module.moduleName}
    </p>
  ))
}
    </div>
  );
};

export default Home;
