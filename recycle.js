`class RecycleBin extends React.Component {



    render (){

        <div>
              <h1>Recycle Bin</h1>
              <h2>Task Count: {this.state.tasks.length}</h2>
              <div className="row"><div className="col"><h3>Task Name</h3></div><div className="col"><h3>Action and Time Remaining</h3></div></div>
              <TaskList tasks={this.props.tasks} times={this.props.times} hand={this.handler} />

        </div>
    }

}`

class RecycleList extends React.Component {

    render(){
        //console.log("hell")
        var tasks=this.props.tasks
        var times=this.props.times
        var taskArr=[]
        for(var i=0;i<tasks.length;i++){
            taskArr.push([tasks[i],times[i]])
        }
        //console.log(this.props.times)
        var listItems = taskArr.map((tas,i) =>
            <li key={i}><RecycleTask task={tas} id={i} time={times[i]} del={this.props.del} rest={this.props.rest}/></li>
            
            );
        
        //console.log(tasks)
        
        return (<div><h1>Recycle Bin</h1>
            <h2>Task Count: {this.props.tasks.length}</h2>
            <div className="row"><div className="col"><h3>Task Name</h3></div><div className="col"><h3>Action</h3></div></div><div>{listItems}</div></div>)
    }
  }

  class RecycleTask extends React.Component {

    constructor(props){
        super(props)
        this.delete = this.delete.bind(this)

    }

    render(){
        //console.log(this.props.task)
        return (
        <div className="row">
            <div className="col"><p>{this.props.task[0]}</p></div>
            <div className="col"><button onClick={this.delete}> Permanently Delete Task</button></div>
            <div className="col"><button onClick={this.restore}>Restore Task</button></div>
            
        </div>
        )

    }

    delete=()=>{
           //console.log(this.props.id)
           //this.props.hand(this.props.id) 
           this.props.del(this.props.id)
    }

    restore=()=>{
        //console.log(this.props.id)
        //this.props.restore(this.props.id) 
        this.props.rest(this.props.id)
 }




  }
