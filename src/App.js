import './App.css';
import {useEffect, useState} from 'react'

function App() {

  let [data, setData]= useState([]);
  let [search, setSearch]=useState('');

  useEffect(()=>{
    fetch('https://emoji-api.com/emojis?access_key=80905b2df14b76c7f0d233b2a06042f65d13f7b5')
    .then(res=>res.json())
    .then(res=>setData(res))
  },[])
 
  let handlSearch=(e)=>{
    setSearch(e.target.value)
  }

  let handleSumit=()=>{
    if(search !== ''){
      fetch(`https://emoji-api.com/emojis?search=${search}&access_key=80905b2df14b76c7f0d233b2a06042f65d13f7b5`)
    .then(res=>res.json())
    .then(res=>{
      // console.log(res.message);
      if(res.message==='No results found')
        setData([]);
      else  setData(res)
    })
    }
  }

  return (
    <div className="App">
      <div className="menu">
        <div className="menu_text">

        <h1>Emoji Search</h1>
        <p>Simple Emoji search with React</p>
        <div>
          <input type="text" placeholder='Search' value={search} onChange={(e)=>handlSearch(e)} />
          <button className='search' onClick={()=> handleSumit()}>Search</button>
        </div>
        </div>
      </div>
      <div className='mainContainer'>
      <div className="container">
        {
        data.map((e,i)=>
        <div className="card" key={e.slug}>
          <p className='emo'>{e.character}</p>
          <p className="name">{e.unicodeName.substring(5)}</p>
        </div>
        )}
      </div>
      </div>
      
    </div>
  );
}

export default App;
