import React from "react";
import List from "./components/List/List";
import listSvg from './assets/img/list.svg'

function App() {
  return (
    <div className="todo">
        <div className="todo__sidebar">
            <img src="" alt=""/>
            <List items={[
                {

                    icon: <img src={listSvg} alt=""/>,
                    name: 'Все задачи',
                    active: true
                }
            ]}/>
            <List items={[
                {
                    color: "green",
                    name: 'Покупки'
                },
                {
                    color: "blue",
                    name: 'Фронтенд'
                },
                {
                    color: "pink",
                    name: 'Фильмы и сериалы'
                }
            ]}/>
        </div>
        <div className="todo__tasks">
            фронтенд
        </div>
    </div>
  );
}

export default App;
