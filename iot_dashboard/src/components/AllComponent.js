import React, { useState } from "react"
import MainBoard from "./MainBoard";
import MainHistoric from "./MainHistoric";
import MainStatistic from "./MainStatistic";

export default function AllComponent() {
  const tab = [<MainBoard />, <MainHistoric />, <MainStatistic />]
  const [state, setState] = useState(tab[0])



  function change(item) {
    setState(prev => prev = item)
  }

  return (
    <div className="milieu">
      <div className="sidebar--main">
        <div className="sidebar--button">
          <button
            id="board"
            className="button1"
            onClick={() => {
              change(tab[0])
              // console.log("btn board clicked")
            }}
          >Board
          </button>
          <button
            id="historique"
            className="button2"
            onClick={() => {
              change(tab[1])
              // console.log("btn historique clicked")
            }}

          >Historic</button>
          <button className="button3" onClick={() => {
            change(tab[2])
            // console.log("btn Statistic clicked")
          }}>Statistic</button>

        </div>

      </div>


      {/*<Sidebar  />*/}
      {state}
      {/*mainP*/}
    </div>
  );
}