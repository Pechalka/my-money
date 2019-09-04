import React from 'react';

class Categories extends React.Component {
  addcategory = () => {
    this.props.addCategory(this.refs.categoryName.value);
    this.refs.categoryName.value = '';     
  }

  removeCategory = (category) => {
    this.props.removeCategory(category);
  }

  render() {
    const { categories } = this.props;
    const categoriesRows = categories.map(c => (
      <tr key={c}>
        <td>{c}</td>
        <td><button onClick={() => this.removeCategory(c)}>remove</button></td>
      </tr>
    ))

    return (
      <div>
        <div className="add-spending">
          <input ref='categoryName' />
          <button onClick={this.addcategory}>добавить категорию</button>
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
          </tbody>
        </table>
      </div>
    );
  }
}

export default Categories;