class App extends React.Component {
    constructor(props){

        super(props)

        this.state={
            tasks: ["hello","just"],
            input: ""
        }

        this.handler = this.handler.bind(this)
    }

    render() {
      return (
          <div>
              <h1>To do List</h1>
              <h2>Task Count: {this.state.tasks.length}</h2>
              <div className="row"><div className="col"><h3>Task Name</h3></div><div className="col"><h3>Action</h3></div></div>
              <TaskList tasks={this.state.tasks} hand={this.handler}/>

              <div>
                  <input onChange={this.handleChange} value={this.state.input} />
                  <button onClick={this.addTask}>Add Task</button>
              </div>
            
          </div>
      );
    }

    handleChange=(event) =>{
        this.setState({
            input:event.target.value
        })
    }

    addTask=() => {
        this.setState({

            tasks:[...this.state.tasks, this.state.input],
            input:""
        })
    }

    handler(id){
        
        //console.log("par:"+id)
        var newtasks=[...this.state.tasks]
        newtasks.splice(id,1)
        this.setState({

            tasks:newtasks
        })
    }
  }

  

  class TaskList extends React.Component {

    render(){

        var tasks=this.props.tasks

        var listItems = tasks.map((tas,i) =>
            <li key={i}><Task task={tas} id={i} hand={this.props.hand} /></li>
            
            );
        var combList=``

        for(var i=0;i<listItems.length;i++){
            combList=combList+listItems[i]
        }
        return (<div>{listItems}</div>)
    }
  }

  class Task extends React.Component {

    render(){
        //console.log("hello")
        return (
        <div className="row">
            <div className="col"><p>{this.props.task}</p></div>
            <div className="col"><button onClick={this.delete}>Delete Task</button></div>
        </div>
        )

    }

    delete=()=>{
           //console.log(this.props.id)
           this.props.hand(this.props.id) 
    }
  }
  ReactDOM.render(<App/>,document.querySelector("#list"))