import { Task } from '@components/TaskBoard/types';
import useAxios from 'axios-hooks';
import Content from './_partials/Content';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const [{ data }, getData] = useAxios<Task[]>('/tasks');
  const [filteredData, setFilteredData] = useState<Task[]>(data || []);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.refetch) {
      getData();
    }
  }, [location.state]);

  useEffect(() => {
    if (data?.length) setFilteredData(data);
  }, [data]);

  return (
    <div className="app">
      <h1>My Task Board</h1>
      {data && (
        <Content
          data={filteredData}
          refetch={getData}
          setFiltered={setFilteredData}
        />
      )}
    </div>
  );
};

export default HomePage;
