import React, { useContext } from 'react'
import {GlobalContext} from '../context/GlobalState';

function Balance() {

    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount)
    var x = amounts.reduce((acc, item) => (acc += item), 0);

    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers !== '')
        lastThree = ',' + lastThree;
    var total = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return (
        <div>
            <h4>Your Balance:</h4>
            <h1 id="balance">₹ {total}</h1>
        </div>
    )
}

export default Balance
