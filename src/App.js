import logo from './logo.svg';
import './App.css';

function ItemRow({ item }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.price}</td>
    </tr>
  );
}

function ItemTable({ items }) {
  const rows = [];

  items.forEach((item) => {
    rows.push(
      <ItemRow item={item} key={item.name} />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

const ITEMS = [
  {name: "Cheerios", price: "5$"},
  {name: "Apple", price: "1$"},
  {name: "Milk", price: "4$"}
];

function App() {
  return (
    <ItemTable items={ITEMS}/>
  )
}

export default App;
