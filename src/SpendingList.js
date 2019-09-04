import React from 'react';
import { connect } from 'react-redux';
import * as actions from './reduxModule';

//todo: use moment :)
function formatDate(timeStamp) {
  const date = new Date(timeStamp);
  const d = date.getDate();
  const M = date.getMonth() + 1; 
  const dd = (d < 10 ? '0' : '') + d;
  const MM = (M < 10 ? '0' : '') + M;
  return `${dd}.${MM}`
}

class SpendingList extends React.Component {
  addSpending = () => {
    const newItem = {
      date: new Date().getTime(),
      sum: +this.refs.sum.value,
      category: this.refs.category.value,
      id: new Date().getTime()
    }

    this.props.addSpending(newItem);

    this.refs.sum.value = '';
  }
    
  removeSpending = (s) => {
    this.props.removeSpending(s);
  }

  render() {
    const { categories, budget, spendingList, page } = this.props;

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
          <td>{formatDate(s.date)}</td>
          <td>{s.sum}</td>
          <td>{s.category}</td>
          <td><button onClick={() => this.removeSpending(s)}>remove</button></td>
        </tr>
    ))


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
          <button onClick={(e) => this.props.changePage('spending-list/categories')}>По категориям</button>
          <button onClick={(e) => this.props.changePage('spending-list/list')}>Список</button>
        </div>

        {page === 'spending-list/categories' && <table className="table">
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
        


        {page === 'spending-list/list' && <table className="table">
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

export default connect(
  state => ({ 
    page: state.page, 
    budget: state.budget,
    spendingList: state.spendingList,
    categories: state.categories
  }),
  actions
)(SpendingList);