import Screen from "./Screen";
import React  from "react";
import Todos from "./Todos";

function App() {
    const [todoScreen,setTodoScreen] = React.useState(false)
    const [view,setView] = React.useState(false)
    const [todoItems,setTodoItems] = React.useState(()=>{
        return  JSON.parse(localStorage.getItem("mytodo") || [])
    })
    const [currentTodo,setCurrentTodo] =React.useState('')
    const [showModel,setShowModel] =React.useState(false)
    const [addTools,setAddTools] = React.useState(false)
    const [currentIndex ,setCurrentIndex]= React.useState(0)


    //for setting getting the current input of the tdo item being listed
    function  handleChange(event){
        const {value} =event.target
        setCurrentTodo(value)
    }
    // a dding items to the tdo list
    function  handleTodo(){
        setTodoItems(prevItems=>{
            return [...prevItems,{title:currentTodo,isCompleted:false,tools:[]}]
        })
        setCurrentTodo("")
    }

    localStorage.setItem('mytodo',JSON.stringify(todoItems))

    //for the completed tdo tools used
    function handleComplete(event) {
        const {value} = event.target
        setCurrentTodo(value)
    }
    function show(i){
        setShowModel(true)
        setCurrentIndex(i)
    }

    function  addTodoTools(){
        setTodoItems(prevState => {
            return  prevState.map((items,index)=>{
                if(index === currentIndex){
                    let tool= items.tools
                    return {...items,isCompleted:true, tools:[...tool,currentTodo]}
                }else{
                    return  items
                }
            })
        })

        setCurrentTodo("")
    }

    console.log(todoItems)
    function  handleDelete(){
        setTodoItems(prevState=>{
           return  prevState.filter((items)=>{
                return items !== prevState[currentIndex]
            })
        })
    }
    function  close(){
        setShowModel(false)
    }
    function proceed(){
        setAddTools(true)
    }


    const carStyles= {
        card:   `w-52 h-36 mx-auto md:mx-3 my-12 flex justify-center items-center shadow-cyan-500/50 shadow-2xl hover:bg-white
                 transition-colors ease-out delay-75`,
        cardText:`text-purple-700 text-2xl font-bold`
    }

  return (
        <div className="flex min-h-screen flex-col justify-center items-center bg-blue-950 md:flex-row relative ">
           <div
               onClick={()=>setTodoScreen(true)}
               className={`${carStyles.card} ${todoScreen || view? 'hidden': "visible"}`}>
                <h3 className={carStyles.cardText}>Create a Tdo</h3>
           </div>

            <div
                onClick={()=>setView(true)}
                className={`${carStyles.card} ${todoScreen || view? 'hidden': "visible"}`}>
                <h3 className={carStyles.cardText}>View Tdo</h3>
            </div>

            {todoScreen && <Screen handlechange={handleChange} current={currentTodo} handletodo={handleTodo}/>}
            {view ? <Todos
                setshow={show}
                opencomplete={handleComplete}
                close={close}
                add={addTools}
                proceed={proceed}
                items={todoItems}
                show={showModel}
                current={currentTodo}
                addtodotools={addTodoTools}
                delete={handleDelete}
            /> : todoItems.length && todoScreen?
                                <div
                                    onClick={()=>{
                                        setTodoScreen(false)
                                        setView(true)
                                    }}
                                    className={`bg-fuchsia-400 w-[40%] h-12 fixed top-0 right-0 flex  items-center justify-center  text-slate-50 font-bold text-xl `}
                                >
                                    Check tdo's
                                </div>: null
            }
      </div>
  )
}

export default App;
