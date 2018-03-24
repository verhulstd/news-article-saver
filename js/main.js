import SaveComponent from "./components/SaveComponent.js";
import SearchComponent from "./components/SearchComponent.js";

const savedArticles = [];
const saveSection = document.getElementById("saveSection");
const searchSection = document.getElementById("searchSection");
const saveComponent = new SaveComponent(saveSection, savedArticles);
const searchComponent = new SearchComponent(
  searchSection,
  savedArticles,
  saveComponent
);
