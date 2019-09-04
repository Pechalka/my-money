import React from 'react';
import './App.css';

import NewBudget from './NewBudget';
import Categories from './Categories';

class SpendingList extends React.Component {
  state = {
    mode: 'list'
  }

  changeMode = (mode) => {
    this.setState({ mode });
  }

  addSpending = () => {
    const newItem = {
      date: '04.09',
      sum: +this.refs.sum.value,
      category: this.refs.category.value,
      id: new Date().getTime()
    }

    this.props.addSpending(newItem);
  }
    
  removeSpending = (s) => {
    this.props.removeSpending(s);
  }

  render() {
    const { categories, budget, spendingList } = this.props;

    const categoriesOptions = categories.map(x => (
      <option key={x} value={x}>{x}</option>
    ))
    
    let total = 0;
    let totalReal = 0;

    const rows = budget ? categories.map(c => {
      total += budget[c];
      const real = spendingList.filter(s => s.category === c).map(x => x.sum).reduce((a, b) => a + b, 0);
      totalReal += real;
      return (
        <tr key={c}>
          <td>{c}</td>
          <td>{real} / {budget[c]}</td>
        </tr>
      ) 
    }) : [];



    const spendingListRows = spendingList.map(s => (
        <tr key={s.id}>
          <td>{s.date}</td>
          <td>{s.sum}</td>
          <td>{s.category}</td>
          <td><button onClick={() => this.removeSpending(s)}>remove</button></td>
        </tr>
    ))

    const { mode } = this.state;

    return (
      <div>
        <div className="add-spending">
          <input ref='sum' />
          <select ref='category'>
            {categoriesOptions}
          </select>
          <button onClick={this.addSpending}>добавить трату</button>
        </div>

        <div className="tabs">
          <button onClick={(e) => this.changeMode('categories')}>По категориям</button>
          <button onClick={(e) => this.changeMode('list')}>Список</button>
        </div>

        {mode === 'categories' && <table className="table">
          <thead>
            <tr>
            <th>Категория</th>
            <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {rows}
            <tr ket="result">
              <td>Итого</td>
              <td>{totalReal} / {total}</td>
            </tr>
          </tbody>
        </table>}
        


        {mode === 'list' && <table className="table">
          <thead>
            <tr>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Категория</th>
            <th></th>
            </tr>
          </thead>
          <tbody>
            {spendingListRows}
          </tbody>
        </table>}
        
        <div className='footer'>
          <button onClick={this.props.closeBudget}>закончить переуд</button>
        </div>    
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    mode: 'categories-list',
    spendingList: [],
    budget : null,
    oldBudget: null,
    categories: []
  }

  componentDidMount() {
    var stateStr = localStorage.getItem('app-state');
    if (stateStr) {
      this.setState(JSON.parse(stateStr))
    }
  }

  addSpending = (newItem) => {
    this.setState({
      spendingList : this.state.spendingList.concat(newItem)
    })
  }

  removeSpending = (s) => {
    const spendingList = this.state.spendingList.filter(sp => sp.id !== s.id);
    this.setState({
      spendingList
    })
  }
  componentDidUpdate(prevProps, prevState) {
    var json = JSON.stringify(this.state);
    localStorage.setItem('app-state', json);
  }

  changeMode = (e, mode) => {
    e.preventDefault();
    this.setState({ mode })
  }

  addcategory = (newCategory) => {
    this.setState({
      categories: this.state.categories.concat(newCategory)
    })  
  }

  removeCategory = (category) => {
    const categories = this.state.categories.filter(c => c !== category);
    this.setState({
      categories
    })
  }

  startBudget = (budget) => {
    this.setState({
      budget,
      mode: 'categories'
    })
  }

  closeBudget = () => {
    this.setState({
      budget: null,
      oldBudget: this.state.budget,
      mode: 'new-budget'
    })
  }

  render() {
    const { spendingList, mode, budget, categories } = this.state;

    const totalReal = 10;

    const canEditCategoies = totalReal === 0 && !budget;
    const canStartBudget = categories.length > 0 && !budget;
    const canShowSpendingList = categories.length > 0 && !!budget;

    return (
      <div className="app">
        
        <div className="tabs">
          <button disabled={!canShowSpendingList} onClick={(e) => this.changeMode(e, 'categories')}>Траты</button>
          <button disabled={!canEditCategoies} onClick={(e) => this.changeMode(e, 'categories-list') }>Категории</button>
          <button disabled={!canStartBudget} onClick={(e) => this.changeMode(e, 'new-budget')}>Новый бюджет</button>
        </div>

        {(mode === 'categories' || mode === 'list') && (
          <SpendingList 
            spendingList={spendingList} 
            budget={budget} 
            categories={categories}
            removeSpending={this.removeSpending}
            addSpending={this.addSpending}
            closeBudget={this.closeBudget}
          />
        )}
        
        {mode === 'categories-list' && (
          <Categories addCategory={this.addcategory} removeCategory={this.removeCategory} categories={categories} />
        )}
        {mode === 'new-budget' && <NewBudget defaultBudget={this.state.oldBudget} categories={categories} startBudget={this.startBudget} />}
      </div>
    );
  }
}


export default App;
