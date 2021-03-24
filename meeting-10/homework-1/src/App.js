import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      inputValue:"",
      todos:[],
      visible:{id:-1},
      updatedValue:"",
      error:""
    }
  }

  componentDidMount(){
    const myTodos=JSON.parse(localStorage.getItem("todos")) || [];
    this.setState({todos:myTodos})
  }

  handleInput=(event)=>{
    this.setState({inputValue:event.target.value})
  }

  handleUpdateInput=(event)=>{
    this.setState({updatedValue:event.target.value})
  }

  async handleAdd(todo){
    if(todo === ""){
       return this.setState({error:"Please Enter Value"})  
    }else if((this.state.todos.filter(x => x.name.toLowerCase() === todo.toLowerCase())).length > 0 && this.state.todos.length > 0){
     return (this.setState({error:"You already have todo"}),this.setState({inputValue:""}))
    }
    let obj = {
      name:todo,
      isDone:false,
      check:false
    }
    await this.setState({todos:[...this.state.todos,obj]})
    localStorage.setItem("todos",JSON.stringify(this.state.todos))
    this.setState({inputValue:""})
    this.setState({error:""})
  }

  async handleRemove(index){
    let arr = this.state.todos;
    arr.splice(index,1);
    await this.setState({todos:arr})
    localStorage.setItem("todos",JSON.stringify(this.state.todos))
    this.setState({visible:{id:-1}})
    this.setState({error:""})
  }

  handleVisible=(index)=>{
    this.setState({visible:{id:index}})
  }

  handleUpdateTodo=(index)=>{
    if(this.state.updatedValue === ""){
      return this.setState({error:"please enter todo"})
    }
    if(this.state.todos.filter(todo=>todo.name ===this.state.updatedValue).length > 0){
      return this.setState({error:"you already have this task"})
    }
    this.state.todos[index].name = this.state.updatedValue;
    this.setState({error:""})
    localStorage.setItem("todos",JSON.stringify(this.state.todos))
    this.setState({updatedValue:""})
    this.setState({visible:{id:-1}})
    this.setState({error:""})
  }

  handleMoveUp=(index)=>{
    if(index===0){
      return this.setState({error:"you can't move up 1st todo"})
    }else {
      let temp = this.state.todos[index]
      let arr = this.state.todos;
      arr[index]=arr[index-1];
      arr[index-1]=temp;
      this.setState({todos:arr})
      localStorage.setItem("todos",JSON.stringify(this.state.todos))
      this.setState({error:""})
      this.setState({visible:{id:-1}})
    }
  }
  handleMoveDown=(index)=>{
    if(index===this.state.todos.length-1){
      return this.setState({error:"you cant move down last todo"})
    }
      let temp = this.state.todos[index]
      let arr=this.state.todos;
      arr[index] = arr[index+1]
      arr[index+1]=temp;
      this.setState({todos:arr})
      localStorage.setItem("todos",JSON.stringify(this.state.todos))
      this.setState({error:""})
      this.setState({visible:{id:-1}})
  }

    handleIsDone(index){
    this.state.todos[index].isDone = !this.state.todos[index].isDone;
    let arr  = this.state.todos;
    this.setState({todos:arr})
    localStorage.setItem("todos",JSON.stringify(this.state.todos))
  }

  handleCheck=(todo)=>{
    todo.check=!todo.check;
    this.setState({todos:this.state.todos})
    localStorage.setItem("todos",JSON.stringify(this.state.todos))
  }

   async handleResetTasks(){
    if(this.state.todos.length===0){
      return this.setState({error:"you dont have tasks"})
    }
    await this.setState({todos:[]})
    localStorage.setItem("todos",JSON.stringify(this.state.todos))
    this.setState({visible:{id:-1}})
    this.setState({error:""})
  }

  async handleResedChecked(){
    let arr=this.state.todos;
    
    if((arr.filter(item=>item.check===true).length ===0)){
      return this.setState({error:"you dont have checked tasks"})
    }
    arr = arr.filter(todo => todo.check === false)
    await this.setState({todos:arr})
    localStorage.setItem("todos",JSON.stringify(this.state.todos))
    this.setState({error:""})
  }

  async handleResetDone(){
    let arr=this.state.todos;
    if((arr.filter(item=>item.isDone===true).length===0)){
      return this.setState({error:"you dont have done tasks"})
    }
    arr = arr.filter(todo => todo.isDone === false)
    await this.setState({todos:arr})
    localStorage.setItem("todos",JSON.stringify(this.state.todos))
    this.setState({error:""})
  }

  render(){
    return <div className="app">
      
        <div className="container">
          <div className="content">
                <h1>ToDo List</h1>
                <div className="display-error">
                  <p>{this.state.error}</p>
                </div>
                <div className="todos-input">      
                  <input className="input" placeholder="add todos" value={this.state.inputValue} onChange={this.handleInput}/>
                  <button className="add-button" onClick={()=>this.handleAdd(this.state.inputValue)}>+</button>
                  
            </div>
                <div className="todos-list">
              <ul>
                {this.state.todos.map((todo,index) => 
                  <li key={index}>
                    <div className="list">
                      <div className="list-content">
                      <input  className="checkbox" type="checkbox" checked ={todo.check} onChange={()=>this.handleCheck(todo)}/>
                      <button className={todo.isDone ? "isdone" : "notdone"} onClick={()=>this.handleIsDone(index)}>Done</button>
                      <span>{todo.name}</span>
                        </div>
                      <div className="list-action">
                          <button className="list-action-btn" onClick={()=>this.handleMoveUp(index)}>up</button>
                          <button className="list-action-btn" onClick={()=>this.handleMoveDown(index)}>down</button>
                          <button className="list-action-btn" onClick={(e)=>this.handleRemove(index)}>remove</button>
                          <button className="list-action-btn" onClick={(e)=>this.handleVisible(index)}>edit</button>
                        </div>

                        {this.state.visible.id===index ? <div className="update">
                        <input className="input" placeholder="update todo" value={this.state.updatedValue} onChange={this.handleUpdateInput}/>
                        <button className="list-action-btn update-btn" onClick={(e) => this.handleUpdateTodo(index)}>update</button>
                      </div>
                      :
                      null}
                    </div>
                    
                  </li>
                  )}
              
                </ul>
              
             </div>
            </div>
                 
          <div className="reset-buttons">
            <button className="reset-btn" onClick={()=>this.handleResetTasks()}>delete all tasks</button>
            <button className="reset-btn" onClick={()=>this.handleResedChecked()}>delete all checked</button>
            <button className="reset-btn" onClick={()=>this.handleResetDone()}>delete all done</button>
            </div>
        </div>
        
      </div>
    
  }
}

export default App;
