import React, { Component } from "react";
    import Modal from "./components/modal";
    import axios from "axios";

    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          viewCompleted: false,
          activeItem: {
            title: "",
            description: "",
            completed: false
          },
          petitionList: []
        };
      }
      componentDidMount() {
        this.refreshList();
      }
      refreshList = () => {
        axios
          .get("/api/petitions/")
          .then(res => this.setState({ petitionList: res.data }))
          .catch(err => console.log(err));
      };
      displayCompleted = status => {
        if (status) {
          return this.setState({ viewCompleted: true });
        }
        return this.setState({ viewCompleted: false });
      };
      menuBar = () => {
        return (
          <div id="main-menu" class="top-bar-nav">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Petitions</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Search</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">About</a>
                </li>
                <li class="nav-item menu-auth">
                    <a class="nav-link" href="#">Log In</a>
                </li>
            </ul>
        </div>
        )
      }
      renderTabList = () => {
        return (
          <div className="my-5 tab-list">
            <span
              onClick={() => this.displayCompleted(false)}
              className={this.state.viewCompleted ? "" : "active"}
            >
              Incomplete
            </span>
            <span
              onClick={() => this.displayCompleted(true)}
              className={this.state.viewCompleted ? "active" : ""}
            >
              complete
            </span>
          </div>
        );
      };
      renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.petitionList.filter(
          item => item.completed === viewCompleted
        );
        return newItems.map(item => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              className={`petition-title mr-2 ${
                this.state.viewCompleted ? "completed-petition" : ""
              }`}
              title={item.description}
            >
              {item.title}
            </span>
            <span>
              <button
                onClick={() => this.editItem(item)}
                className="btn btn-secondary mr-2"
              >
                {" "}
                Edit{" "}
              </button>
              <button
                onClick={() => this.handleDelete(item)}
                className="btn btn-danger"
              >
                Delete{" "}
              </button>
            </span>
          </li>
        ));
      };
      toggle = () => {
        this.setState({ modal: !this.state.modal });
      };
      handleSubmit = item => {
        this.toggle();
        if (item.id) {
          axios
            .put(`/api/petitions/${item.id}/`, item)
            .then(res => this.refreshList());
          return;
        }
        axios
          .post("/api/petitions/", item)
          .then(res => this.refreshList());
      };
      handleDelete = item => {
        axios
          .delete(`/api/petitions/${item.id}`)
          .then(res => this.refreshList());
      };
      createItem = () => {
        const item = { title: "", description: "", completed: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
      editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
      render() {
        return (
          <main className="content">
          {this.menuBar()}
            <h1 className="text-white text-uppercase text-center my-4">Quick Petitions</h1>
            <div className="row ">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  <div className="">
                    <button onClick={this.createItem} className="btn btn-primary">
                      Add Petition
                    </button>
                  </div>
                  {this.renderTabList()}
                  <ul className="list-group list-group-flush">
                    {this.renderItems()}
                  </ul>
                </div>
              </div>
            </div>
            {this.state.modal ? (
              <Modal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
            ) : null}
          </main>
        );
      }
    }
    export default App;