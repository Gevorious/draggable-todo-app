import { Task } from '@components/TaskBoard/types';
import useAxios from 'axios-hooks';
import Content from './_partials/Content';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const [{ data }, getData] = useAxios<Task[]>('/tasks');
  const [filteredData, setFilteredData] = useState<Task[]>(data || []);
  const { state } = useLocation();

  useEffect(() => {
    if (state?.refetch) {
      getData();
    }
  }, [state]);

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
