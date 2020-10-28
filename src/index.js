import React, { useEffect, useState } from "react";
// https://jhildenbiddle.github.io/css-vars-ponyfill/#/?id=usage
import cssVars from "css-vars-ponyfill";
import axios from "axios";
import ReactDOM from "react-dom";
import { useTabState, Tab, TabList, TabPanel, Button } from "reakit";
import styles from "./index.module.css";

const theme1 = "https://run.mocky.io/v3/9546b875-4759-4d78-89f8-552ce90dc43f";
const theme2 = "https://run.mocky.io/v3/92530fd4-1734-4477-8996-41d9653f7194";
function App() {
  const [theme, setTheme] = useState(null);
  const getTheme = (url) => {
    axios
      .get(url)
      .then((data) => setTheme(data.data))
      .catch((err) => {
        console.log(err);
        return null;
      });
  };
  const clearTheme = () => {
    //eslint-disable-next-line  no-undef
    root.style.cssText = ""; //need different way to do this
  };
  //pageload
  useEffect(() => {
    cssVars({
      // Options...
      /*set onlyLegacy to false to see the transformed css in browsers that 
      support css variables.*/
      watch: true,
      onlyLegacy: false,
      silent: false,
      updateDOM: true,
      shadowDOM: true,
      preserveVars: true
    });
    console.log("getting theme");
    getTheme(theme1);
  }, []);
  //dealwith theme change
  useEffect(() => {
    console.log("change theme");
    //loop through the theme object.
    if (theme !== null) {
      let styles = {};
      Object.keys(theme).map(function (key, index) {
        // root.style.setProperty(`--${key}`, theme[key]);
        styles[`--${key}`] = theme[key];
        return null;
      });

      cssVars({
        onlyLegacy: false,
        variables: styles,
        updateDOM: true
      });
    }
  }, [theme]);
  const tab = useTabState({ orientation: "horizontal" });
  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
        <TabList {...tab} aria-label="My tabs" className={styles.tabList}>
          <Tab {...tab} className={styles.tabPill}>
            About
          </Tab>
          <Tab {...tab} className={styles.tabPill}>
            Useful Links
          </Tab>
          <Tab {...tab} className={styles.tabPill}>
            Change the theme
          </Tab>
        </TabList>
        <TabPanel className={styles.tabContent} {...tab}>
          <p>
            This is a demo of how a react app could potentially be themed at
            runtime using CSS variables.{" "}
          </p>

          <p>
            A mock api is returning a styles object containing the variable
            settings for the theme. These styles are applied to the root element
            using javascript.{" "}
          </p>
        </TabPanel>
        <TabPanel className={styles.tabContent} {...tab}>
          <a href="https://www.freecodecamp.org/news/everything-you-need-to-know-about-css-variables-c74d922ea855/">
            Everything you need to know about CSS Variables
          </a>
          <br />
          <a href="https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/">
            Adding a CSS Modules Stylesheet{" "}
          </a>
        </TabPanel>
        <TabPanel className={styles.tabContent} {...tab}>
          <Button className={styles.btn} onClick={() => getTheme(theme2)}>
            Switch to Autumn Theme
          </Button>
          <br />
          <Button className={styles.btn} onClick={() => getTheme(theme1)}>
            Switch to 80s Theme
          </Button>
          <br />
          <Button className={styles.btn} onClick={() => clearTheme()}>
            Remove Themes
          </Button>
        </TabPanel>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
