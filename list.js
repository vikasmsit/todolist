class App extends React.Component {
    constructor(props){
        
        super(props);

        this.state={
            tasks: [],
            times: [],
            input: "",
            button:"Add Task",
            updateid:0,
            input_time:"00:00",
            rec_tasks:[],
            rec_times:[],
            
        }

        this.handler = this.handler.bind(this)
        this.updateHandler=this.updateHandler.bind(this)
        this.updateTime=this.updateTime.bind(this)
        this.permDel=this.permDel.bind(this)
        this.restore=this.restore.bind(this)
        this.tiOver=this.tiOver.bind(this)
        
        
    }


    componentDidMount() {  

        //var prev=localStorage.getItem("todolist")
        //console.log("mount")

        //if(prev!=null){

          //this.setState(JSON.parse(prev))
            //console.log(prev)
        //}
        if(this.cache!==undefined){
            this.setState(
                this.cache
            )

            ReactDOM.render(<RecycleList tasks={this.state.rec_tasks} times={this.state.rec_times} del={this.permDel} rest={this.restore}/>,document.querySelector("#recycle"))
            console.log("cache Entry")


        }
        else{
        fetch("tasks.json")
        .then(response => response.text())
        .then((response) => {
            this.setState(JSON.parse(response))
            this.cache=JSON.parse(response)
        })
        .catch(err => console.log(err))

        console.log("hello")
        ReactDOM.render(<RecycleList tasks={this.state.rec_tasks} times={this.state.rec_times} del={this.permDel} rest={this.restore}/>,document.querySelector("#recycle"))
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
              <TaskList tasks={this.state.tasks} times={this.state.times} hand={this.handler} update={this.updateHandler} upTimes={this.updateTime} tiOver={this.tiOver}/>

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
            },()=>{ReactDOM.render(<App/>,document.querySelector("#list"))})
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
            },()=>{ReactDOM.render(<App/>,document.querySelector("#list"))})
        }
    }

    handler(id){
        
        //console.log("par:"+id)
        var newtasks=[...this.state.tasks]
        var deltask=newtasks[id]
        console.log(deltask)
        newtasks.splice(id,1)
        var newtimes=[...this.state.times]
        var deltime=newtimes[id]
        newtimes.splice(id,1)
        console.log(newtimes)
        this.setState(
            
            {

            tasks:newtasks,
            times:newtimes,
            button: "Add Task",
            input: "",
            rec_tasks:[...this.state.rec_tasks,deltask],
            rec_times:[...this.state.rec_times,deltime]
            
        },()=>{ReactDOM.render(<RecycleList tasks={this.state.rec_tasks} times={this.state.rec_times} del={this.permDel} rest={this.restore}/>,document.querySelector("#recycle"))},()=>{ReactDOM.render(<App/>,document.querySelector("#list"))})
        
        //ReactDOM.render(<RecycleList tasks={this.state.rec_tasks} times={this.state.rec_times}/>,document.querySelector("#recycle"))

    }

    updateHandler(id){

        var currTask=this.state.tasks[id]
        var currTime=this.state.times[id]

        this.setState({
            input: currTask,
            input_time: currTime,
            button: "Update Task",
            updateid: id
            
        },()=>{ReactDOM.render(<App/>,document.querySelector("#list"))})


    }

    updateTime(id,time){
        var currTime=[...this.state.times]
        currTime[id]=time

        this.setState({

            times:currTime
        },()=>{ReactDOM.render(<App/>,document.querySelector("#list"))})

    }

    tiOver(id) {

        
        var temptimes=[...this.state.times]
        temptimes[id]="over"
        
        if (confirm("Task: "+this.props.task+"\nTIme Over\nPress OK to delete")) {
            
          this.handler(id)
        } else {

            this.setState({
                times:temptimes
                
            },()=>{ReactDOM.render(<App/>,document.querySelector("#list"))});
            
          
        }
    }

    permDel(id){
        var newtasks=[...this.state.rec_tasks]
        
        //console.log(deltask)
        newtasks.splice(id,1)
        var newtimes=[...this.state.rec_times]
        //var deltime=newtimes[id]
        newtimes.splice(id,1)

        this.setState({
            rec_tasks:newtasks,
            rec_times:newtimes
        },()=>{ReactDOM.render(<RecycleList tasks={this.state.rec_tasks} times={this.state.rec_times} del={this.permDel} rest={this.restore}/>,document.querySelector("#recycle"))})

    }

    restore(id){

        var newtasks=[...this.state.rec_tasks]
        var task=newtasks[id]
        
        //console.log(deltask)
        newtasks.splice(id,1)
        var newtimes=[...this.state.rec_times]
        //var deltime=newtimes[id]
        var time=newtimes[id]
        newtimes.splice(id,1)

        this.setState({
            rec_tasks:newtasks,
            rec_times:newtimes,
            tasks:[...this.state.tasks,task],
            times:[...this.state.times,time]
        },()=>{ReactDOM.render(<RecycleList tasks={this.state.rec_tasks} times={this.state.rec_times} del={this.permDel} rest={this.restore}/>,document.querySelector("#recycle"))})


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
            <li key={i}><Task task={tas} id={i} time={times[i]} hand={this.props.hand} tiOver={this.props.tiOver} update={this.props.update} upTimes={this.props.upTimes} /></li>
            
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
            <div className="col"><Clock id={this.props.id} upTimes={this.props.upTimes} tiOver={this.props.tiOver} task={this.props.task[0]} time={this.props.time} del={this.props.hand}/></div>
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
        
        //if(this.state.time===0){

            //this.timeOver()
            //this.props.del(this.props.id)
            
            //console.log(this.props.time)
            
            
        //}
        //console.log("helup")

        
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
        if(this.props.time!=this.upCheck){
            
            this.upCheck=this.props.time
            //console.log("hello")
            this.setState({
                time:this.props.time
            })

        
        }
        
        if(this.state.time===0){

            //this.timeOver()
            this.setState({

                time:"over"
            })
        
            
            var timeOv=this.props.tiOver
            timeOv((this.props.id))
            //clearInterval(this.timerID);
            //this.props.del(this.props.id)
            
            //console.log(this.props.time)
            
            
        }

        if(this.props.time!=this.upCheck){
            
            this.upCheck=this.props.time
            console.log("hello")
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
            this.setState({
                time: "Over"
                
            });
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