import { useState } from 'react'

import axios from 'axios';

async function display()
{
  const response = await axios.post('http://localhost:3000/hello?message=2',{
    hello : "nikhil"
  });
  const ans = response.data;
  console.log(ans);
}

function App() {

  return (
   <div>
    <button onClick={Display}>click me kutte</button>
    <Display />
    </div>
  )
}

export default App
