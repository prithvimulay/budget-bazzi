import axios from 'axios';
import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    //const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await axios.get(url);
    return response.data;  // axios stores the response data in `data` property
  }

  function addNewTransaction(ev) {
    ev.preventDefault();
    //const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];
    
    axios.post(url, {
      price,
      name: name.substring(price.length + 1),
      description,
      datetime
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setName('');
      setDatetime('');
      setDescription('');
      console.log('result', response.data);
    }).catch(error => {
      console.error('Error adding new transaction', error);
    });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }
  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <div>
      <main>
        <h1>₹{balance}<span></span></h1>
        <form onSubmit={addNewTransaction}>
          <div className="basic">
            <input type="text" 
                   value={name}
                   onChange={ev => setName(ev.target.value)}
                   placeholder={'+200 new samsung tv'} />
            <input value={datetime}
                   onChange={ev => setDatetime(ev.target.value)}
                   type="datetime-local" />
          </div>
          <div className="description">
            <input type="text" 
                   value={description}
                   onChange={ev => setDescription(ev.target.value)} 
                   placeholder={'description'} />
          </div>
          <button type="submit">Add new Txn</button>
        </form>
        <div className="transactions">
          {transactions.length > 0 && transactions.map(transaction => (
            <div className="transaction" key={transaction.id}>
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div className={"price " + (transaction.price < 0 ? 'red' : 'green')}>{transaction.price}</div>
                <div className="datetime">{transaction.datetime}</div>       
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
