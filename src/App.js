import axios from 'axios';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Set the base URL for your backend
  const baseURL = 'http://localhost:4000/api/transaction';

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data || []); // Ensure it's an array
      } catch (error) {
        console.error('Failed to fetch transactions', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTransactions();
  }, []);

  async function getTransactions() {
    try {
      const response = await axios.get(`${baseURL}/get`);
      return response.data; // axios stores the response data in `data` property
    } catch (error) {
      console.error('Error fetching transactions', error);
      return []; // Return an empty array on error
    }
  }

  async function addNewTransaction(ev) {
    ev.preventDefault();
    if (!name || !datetime || !description) {
      alert("Please fill in all fields."); // Basic validation
      return;
    }

    const price = parseFloat(name.split(' ')[0]); // Ensure price is a number

    if (isNaN(price)) {
      alert("Invalid price format.");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/create`, {
        price,
        name: name.substring(price.toString().length + 1),
        description,
        datetime,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      setTransactions([...transactions, response.data]); // Add the new transaction to the current state
      setName('');
      setDatetime('');
      setDescription('');
      console.log('Transaction added', response.data);
    } catch (error) {
      console.error('Error adding new transaction', error);
    }
  }

  let balance = transactions.reduce((acc, transaction) => acc + transaction.price, 0).toFixed(2);
  
  return (
    <div>
      <main>
        <h1>₹{balance}<span></span></h1>
        {loading ? (
          <p>Loading transactions...</p> // Loading message
        ) : (
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
        )}
        <div className="transactions">
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <div className="transaction" key={transaction._id}>
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div className={"price " + (transaction.price < 0 ? 'red' : 'green')}>
                    {transaction.price.toFixed(2)} {/* Ensure price is formatted */}
                  </div>
                  <div className="datetime">{new Date(transaction.datetime).toLocaleString()}</div>       
                </div>
              </div>
            ))
          ) : (
            !loading && <p>No transactions available.</p> // Message when no transactions exist
          )}
        </div>
      </main>
    </div>
  );
}

export default App;