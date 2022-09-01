import { useEffect, useState } from "react";
import "./App.css";
import { defaultData } from "./defaults";

function App() {
  const [data, setData] = useState(defaultData);

  /**
   * @param {typeof data} arr
   * @returns {typeof data} sorted array by audience_size desc
   */
  const sortData = (arr) => {
    return arr.sort((a, b) => {
      if (a.source_items.audience_size < b.source_items.audience_size) return 1;
      if (a.source_items.audience_size > b.source_items.audience_size)
        return -1;
      return 0;
    });
  };

  const fetchData = async () => {
    try {
      const response = await (
        await fetch(
          "https://ac.aws.citizennet.com/assets/qspreviews/qs_interview_data.json"
        )
      ).json();
      setData(sortData(response?.data || []));
      console.info(response);
    } catch (error) {
      console.error(error.message);
      setData(sortData(defaultData));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.info(data);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {data.map((item) => (
            <img
              key={item.social_media_pages.id}
              src={item.social_media_pages.picture}
              alt="pic"
            />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
