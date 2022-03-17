import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import Burger from "./Burger";
import sampleBurgers from "../sample-burgers";
import base from "../base";
import SignIn from "./Auth/SignIn";

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object,
  };

  state = {
    burgers: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;

    const localStorageRef = localStorage.getItem(params.restaurantid);

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.restaurantid}/burgers`, {
      context: this,
      state: "burgers",
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.restaurantid, JSON.stringify(this.state.order));
  }

  addBurger = (burger) => {
    console.log("addBurger ", burger);
    // 1. Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    // 2. Добавить новый бургер в объект burgers
    burgers[`${Date.now()}`] = burger;
    // 3. Записать наш новый объект burgers в объект setState
    this.setState({ burgers });
  };

  updatedBurger = (key, updatedBurger) => {
    // 1. Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    // 2. Обновляем нужный бургер
    burgers[key] = updatedBurger;
    // 3. Записать наш новый объект burgers в объект state
    this.setState({ burgers });
  };

  deleteBurger = (key) => {
    // 1. Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    // 2. Добавить удаляем бургер
    burgers[key] = null;
    // 3. Записать наш новый объект burgers в объект state
    this.setState({ burgers });
  };
  deleteFromOrder = (key) => {
    // 1. Делаем копию объекта state
    const order = { ...this.state.order };
    // 2. удаляем бургер
    delete order[key];
    // 3. Записать наш новый объект order в объект state
    this.setState({ order });
  };
  loadSampleBurgers = () => {
    this.setState({ burgers: sampleBurgers });
  };
  addToOrder = (key) => {
    // 1. делаем копию объекта state
    const order = { ...this.state.order };
    // 2. Добавить ключ к заказу со значением 1 либо обновить текущее значение
    order[key] = order[key] + 1 || 1;
    // 3 Записать обновленное значение в объект state
    this.setState({ order });
  };
  render() {
    return (
      <SignIn>
        <div className="burger-paradise">
          <div className="menu">
            <Header title="Very hot burger" amount={10} hot={true} />
            <ul className="burgers">
              {Object.keys(this.state.burgers).map((key) => {
                return (
                  <Burger
                    key={key}
                    index={key}
                    addToOrder={this.addToOrder}
                    details={this.state.burgers[key]}
                  />
                );
              })}
            </ul>
          </div>
          <Order
            deleteFromOrder={this.deleteFromOrder}
            burgers={this.state.burgers}
            order={this.state.order}
          />
          <MenuAdmin
            addBurger={this.addBurger}
            loadSampleBurgers={this.loadSampleBurgers}
            burgers={this.state.burgers}
            updatedBurger={this.updatedBurger}
            deleteBurger={this.deleteBurger}
          />
        </div>
      </SignIn>
    );
  }
}

export default App;
