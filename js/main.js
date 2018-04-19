/**
 * Application that query the VTM nieuws API. It has the ability to save newsarticles for later use.
 * It uses a Google firebase database to save these articles
 * @author David Verhulst
 * @requires module:firebase
 */

/**
 * @license
 * Copyright (c) 2018 Meraki Academy
 */

import SaveComponent from "./components/SaveComponent.js";
import SearchComponent from "./components/SearchComponent.js";
import * as firebase from "firebase";

var savedArticles = [];

var config = {
  apiKey: "AIzaSyArVEG_eppVPiMSFoG4APql9zYm6IYQczQ",
  authDomain: "squarebuilder-2dd65.firebaseapp.com",
  databaseURL: "https://squarebuilder-2dd65.firebaseio.com",
  projectId: "squarebuilder-2dd65",
  storageBucket: "squarebuilder-2dd65.appspot.com",
  messagingSenderId: "14989606875"
};
firebase.initializeApp(config);

const saveSection = document.getElementById("saveSection");
const searchSection = document.getElementById("searchSection");

const saveComponent = new SaveComponent(saveSection, savedArticles, firebase);
const searchComponent = new SearchComponent(
  searchSection,
  savedArticles,
  firebase,
  saveComponent
);
