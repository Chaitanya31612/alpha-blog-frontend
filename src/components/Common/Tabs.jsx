import { Link } from "react-router-dom";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div>
      {tabs.map((tab, index) => (
        <a
          key={index}
          onClick={() => setActiveTab(index)}
          style={{ cursor: "pointer" }}
          className={
            activeTab === index ? "fw-bold pb-2 border-bottom border-dark" : 0
          }
        >
          {tab.name}
          <small className="text-muted fw-light rounded-circle"></small>
        </a>
      ))}
    </div>
  );
};

export default Tabs;
