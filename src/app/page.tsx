"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GameArea from "../components/GameArea/GameArea";

const Page = () => {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      if (!tg.isExpanded) {
        tg.expand();
      }

      tg.BackButton.hide();
      if (tg.themeParams.bg_color) {
        document.body.style.backgroundColor = tg.themeParams.bg_color;
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <div className="app">
        <div className="container">
          <Header />
          <main className="main">
            <GameArea />
          </main>
          <Footer />
        </div>
      </div>
    </Provider>
  );
};

export default Page;
