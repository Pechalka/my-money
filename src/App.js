import React from 'react';
import './App.css';
import { connect } from 'react-redux';

import NewBudget from './NewBudget';
import Categories from './Categories';
import SpendingList from './SpendingList';

const { 
  selectCanEditCategoies,
  selectCanStartBudget,
  selectCanShowSpendingList,
  ...actions 
} = require('./reduxModule');

class App extends React.Component {

  render() {
    const { 
      page, 
      canEditCategoies,
      canStartBudget,
      canShowSpendingList
    } = this.props;

    return (
      <div className="app">
        
        <div className="tabs">
          <button disabled={!canShowSpendingList} onClick={(e) => this.props.changePage('spending-list/categories')}>Траты</button>
          <button disabled={!canEditCategoies} onClick={(e) => this.props.changePage('categories-list') }>Категории</button>
          <button disabled={!canStartBudget} onClick={(e) => this.props.changePage('new-budget')}>Новый бюджет</button>
        </div>

        {(page.startsWith('spending-list') ) && (
          <SpendingList />
        )}
        
        {page === 'categories-list' && (
          <Categories />
        )}
        {page === 'new-budget' && (
          <NewBudget />
        )}
      </div>
    );
  }
}


export default connect(
  state => ({ 
    page: state.page, 
    budget: state.budget,
    spendingList: state.spendingList,
    categories: state.categories,
    canEditCategoies: selectCanEditCategoies(state),
    canStartBudget: selectCanStartBudget(state),
    canShowSpendingList: selectCanShowSpendingList(state)
  }),
  actions
)(App);
