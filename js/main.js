import saveComponent from "./components/SaveComponent.js";

const savedArticles = [];
const searchSection = document.getElementById("searchSection");
const saveSection = document.getElementById("saveSection");
const saveComponent = new saveComponent(
  saveSection,
  savedArticles,
  fireBaseRef
);
