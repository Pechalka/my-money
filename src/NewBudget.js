import React from 'react';

class NewBudget extends React.Component {
  state = {
    budget: {}
  }

  constructor(props) {
    super(props);

    this.state = {
      budget: this.props.defaultBudget || {}
    }
  }

  startBudget = () => {
    const { budget } = this.state;
    this.props.startBudget(budget);
  }

  updateBudgetCategory = (e, category) => {
    const value = e.target.value;
    const budget = { ...this.state.budget, [category]: +value };
    this.setState({
      budget
    })
  }
  allCategoriesAreFilled = () => {
    const { categories } = this.props;
    const { budget } = this.state;
    let ok = true;

    for(var i =0; i < categories.length; i++) {
      const category = categories[i];
      if (!budget[category]) {
        ok = false;
      }
    }
    return ok;
  }

  render() {
    const { categories } = this.props;
    const { budget } = this.state;

    let total = 0;
    const categoriesRows = categories.map(c => {
      let defaultValue = ''
      if (budget[c]) {
        total += budget[c]; 
        defaultValue = budget[c];
      }
      return (
        <tr key={c}>
          <td>{c}</td>
          <td>
            <input defaultValue={defaultValue} onChange={(e) => this.updateBudgetCategory(e, c) } />
          </td>
        </tr>
      )
    })

    return (
      <div>
        <div className="add-spending">
          <button disabled={!this.allCategoriesAreFilled()} onClick={this.startBudget}>начать переуд</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Категория</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categoriesRows}
            <tr>
              <td>Итого:</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default NewBudget;