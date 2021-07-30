class App extends React.Component {
    constructor(props){

        super(props)

        this.state={
            tasks: [],
            times: [],
            input: "",
            button:"Add Task",
            updateid:0,
            input_time:"00:00"
        }

        this.handler = this.handler.bind(this)
        this.updateHandler=this.updateHandler.bind(this)
        this.updateTime=this.updateTime.bind(this)
        
    }

    componentDidMount() {  

        var prev=localStorage.getItem("todolist")
        console.log("mount")

        if(prev!=null){

            this.setState(JSON.parse(prev))
        }

        else{

            
        }
    }

    componentDidUpdate(){

        localStorage.setItem("todolist",JSON.stringify(this.state))
    }

    render() {
      return (
          <div>
              <h1>To do List</h1>
              <h2>Task Count: {this.state.tasks.length}</h2>
              <div className="row"><div className="col"><h3>Task Name</h3></div><div className="col"><h3>Action and Time Remaining</h3></div></div>
              <TaskList tasks={this.state.tasks} times={this.state.times} hand={this.handler} update={this.updateHandler} upTimes={this.updateTime}/>

              <div>
                  <input onChange={this.handleChange} value={this.state.input} />
                  <button onClick={this.addTask}>{this.state.button} and Time</button>
                  <input type="number" value={this.state.input_time} onChange={this.handleChangeTime}></input>
              </div>
            
          </div>
      );
    }

    handleChange=(event) =>{
        this.setState({
            input:event.target.value
        })
    }

    handleChangeTime=(event) =>{
        this.setState({
            input_time:event.target.value
        })
    }

    addTask=() => {
        var butState=this.state.button
        if(butState==="Add Task"){
            this.setState({

                tasks:[...this.state.tasks, this.state.input],
                times:[...this.state.times,this.state.input_time],
                input:"",
                input_time:""
            })
        }
        else{

            var currtasks =[...this.state.tasks]
            currtasks[this.state.updateid]=this.state.input
            var currtimes=[...this.state.times]
            currtimes[this.state.updateid]=this.state.input_time
            this.setState({
                tasks: currtasks,
                times: currtimes,
                input:"",
                input_time:"",
                button:"Add Task"
            })
        }
    }

    handler(id){
        
        //console.log("par:"+id)
        var newtasks=[...this.state.tasks]
        newtasks.splice(id,1)
        var newtimes=[...this.state.times]
        newtimes.splice(id,1)
        console.log(newtimes)
        this.setState({

            tasks:newtasks,
            times:newtimes,
            button: "Add Task",
            input: ""
            
        })


    }

    updateHandler(id){

        var currTask=this.state.tasks[id]
        var currTime=this.state.times[id]

        this.setState({
            input: currTask,
            input_time: currTime,
            button: "Update Task",
            updateid: id
            
        })


    }

    updateTime(id,time){
        var currTime=[...this.state.times]
        currTime[id]=time

        this.setState({

            times:currTime
        })

    }
  }

  

  class TaskList extends React.Component {

    render(){

        var tasks=this.props.tasks
        var times=this.props.times
        var taskArr=[]
        for(var i=0;i<tasks.length;i++){
            taskArr.push([tasks[i],times[i]])
        }
        //console.log(this.props.times)
        var listItems = taskArr.map((tas,i) =>
            <li key={i}><Task task={tas} id={i} time={times[i]} hand={this.props.hand} update={this.props.update} upTimes={this.props.upTimes} /></li>
            
            );
        var combList=``

        for(var i=0;i<listItems.length;i++){
            combList=combList+listItems[i]
        }
        return (<div>{listItems}</div>)
    }
  }

  class Task extends React.Component {

    constructor(props){
        super(props)
        this.delete = this.delete.bind(this)

    }

    render(){
        //console.log(this.props.task)
        return (
        <div className="row">
            <div className="col"><p>{this.props.task[0]}</p></div>
            <div className="col"><button onClick={this.delete}>Delete Task</button></div>
            <div className="col"><button onClick={this.update}>Update Task</button></div>
            <div className="col"><Clock id={this.props.id} upTimes={this.props.upTimes} task={this.props.task[0]} time={this.props.time} del={this.props.hand}/></div>
        </div>
        )

    }

    delete=()=>{
           //console.log(this.props.id)
           this.props.hand(this.props.id) 
    }

    update=()=>{
        //console.log(this.props.id)
        this.props.update(this.props.id) 
 }


  }


  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {time: this.props.time};
      this.upCheck=this.props.time
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }

    componentDidUpdate(){
        
        if(this.state.time===0){

            this.timeOver()

            
            
            
        }

    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
        if(this.props.time!=this.upCheck){
            
            this.upCheck=this.props.time
            this.setState({
                time:this.props.time
            })

        
        }
        var curr=this.state.time
        if(curr>=0){
            this.setState({
                time: curr-1
                
            });
        
        }

        var up=this.props.upTimes

        up(this.props.id,this.state.time)
        

    }

    timeOver() {

        
        
        if (confirm("Task: "+this.props.task+"\nTIme Over\nPress OK to delete")) {
          this.props.del(this.props.id)
        } else {

            this.setState({
                time: "Over"
                
            });
          
        }
    }
  
    render() {
      return (
        <div>
        
          <h2>{this.state.time}</h2>
          
        </div>
      );
    }
  }
  
  ReactDOM.render(<App/>,document.querySelector("#list"))