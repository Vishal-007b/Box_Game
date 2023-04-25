import React, { useEffect, useState } from 'react'
import Cards from './Cards.json'

const BoxGame = () => {

    const [prev, setPrev] = useState(null);
    const [newCards,setNewCards] = useState(JSON.parse(JSON.stringify(Cards)));

    useEffect(()=>{

        for(let i = 0; i < newCards.length; i++){
                newCards[i] = {...newCards[i], open:false};
        }
        
        setNewCards(generateRandom(newCards)); 

    },[])


    const swapp = (idx, len, arr) => {
        // console.log("idx",idx,"  ",'len',len);  
        let temp = arr[len];
        arr[len] = arr[idx];
        arr[idx] = temp;
    }

    const generateRandom = (arr) =>{

        let newArr = [...arr,...arr];
        console.log(newArr);
        let len = newArr.length - 1;

        while(len > 1){
            let idx = Math.floor(Math.random() * (len));
            if(idx >= 0 && idx <= len && len > 0){

                swapp(idx, len,  newArr);
            }
            len--;
        }

        return newArr;
    }

    


  const toggleView = (i)=>{

    newCards[i] = {...newCards[i], open:true};

    if(prev != null){
        if(newCards[prev].name === newCards[i].name){

            newCards[i] = {...newCards[i], open:true};
            newCards[prev] = {...newCards[prev], open:true};
            
            setPrev(null);
    
        }else{
    
            newCards[i] = {...newCards[i], open:true};
            setTimeout(()=>{
                newCards[i] = {...newCards[i], open:false};
                newCards[prev] = {...newCards[prev], open:false};
                setNewCards([...newCards]);
            },400)
            setPrev(null);
        }
    } else{
        setPrev(i);
        newCards[i] = {...newCards[i], open:true};
    }
  }

  const updatedBoxes = ()=>{
    let updatedCards = newCards.map((item,i)=>{
        let viewImg = item.open ? 'block' : 'none';
            return (
                <div 
                    key={i}
                    className={item.open ? 'box' : 'hidden-box'} 
                    onClick={()=>{
                        item.open ? console.log('open') : toggleView(i)                        
                    }}
                >
                <img style={{height:"80px", width:'80px' , display:`${viewImg}`}} src={item.img} alt={item.name}/>
              </div> 
            )
        
    })

    return updatedCards;
    
  }

  return (
    <div className='boxgame'>
        {updatedBoxes()}
    </div>
  )
}

export default BoxGame
